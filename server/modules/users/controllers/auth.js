const passport = require('passport');
const router = require('express').Router();
const AuthService = require('../services/auth');
const authHandler = require('../../../middleware/auth-handler');
const HttpError = require('../../../libs/http-error');

router.post('/authenticate', authHandler.publicRoute, (req, res, next) => {
	passport.authenticate('local', { session: false },(error, user, info) => {
		if (error) return next(new HttpError(error.status, error.message));
		if (!user) return next(new HttpError(info.status, info.message));
		
		req.logIn(user, (error) => {
			if (error) return next(new HttpError(error.status, error.message));
			
			return res.json(user);
		})
	})(req, res, next);
});

router.post('/register/invite', authHandler.privateRoute, (req, res, next) => {
	AuthService.registerRequest(req.body)
		.then(data => res.json(data))
		.catch(error => next(new HttpError(error.status, error.message)));
});

router.post('/register/complete', authHandler.publicRoute, (req, res, next) => {
	AuthService.registerComplete(req.body)
		.then(data => res.json(data))
		.catch(error => next(new HttpError(error.status, error.message)));
});

router.post('/password/restore/invite', authHandler.publicRoute, (req, res, next) => {
	AuthService.passwordRestoreRequest(req.body.email)
		.then(response => res.json({ message: response }))
		.catch(error => next(new HttpError(error.status, error.message)));
});

router.post('/password/restore/complete', authHandler.publicRoute, (req, res, next) => {
	AuthService.passwordRestoreComplete(req.body)
		.then(response => res.json({ message: response }))
		.catch(error => next(new HttpError(error.status, error.message)));
});

router.post('/check/token/:type', authHandler.publicRoute, (req, res, next) => {
	AuthService.verifyToken(req.params.type, req.body.token)
		.then(response => req.params.type === 'service' ? res.json({ user: AuthService.publicUser(response)}) : res.json(response))
		.catch(error => next(new HttpError(error.status, error.message)));
});

router.post('/logout', authHandler.privateRoute, (req, res, next) => {
	AuthService.verifyToken('access', req.headers.authorization)
		.then(response => AuthService.signOutRequest(response._id))
		.then(data => res.json(data))
		.catch(error => next(new HttpError(error.status, error.message)));
});

module.exports = router;