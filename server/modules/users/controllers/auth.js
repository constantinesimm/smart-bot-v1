const passport = require('passport');
const router = require('express').Router();
const HttpError = require('../../../libs/http-error');
const AuthService = require('../services/auth');

router.post('/authenticate', (req, res, next) => {
	passport.authenticate('local', { session: false },(error, user, info) => {
		if (error) return next(new HttpError(error));
		if (!user) return next(new HttpError(info.status, info.msg));
		
		req.logIn(user, (error) => {
			if (error) return next(new HttpError(error));
			
			return res.json(user);
		})
	})(req, res, next);
});

router.post('/register/:action', (req, res, next) => {
	if (req.params.action === 'invite') {
		
		AuthService.registerRequest(req.body)
			.then(data => res.json(data))
			.catch(error => next(new HttpError(error.status, error.message)));
		
	} else if (req.params.action === 'complete') {
		
		AuthService.registerComplete(req.body)
			.then(data => res.json(data))
			.catch(error => next(new HttpError(error.status, error.message)));
		
	} else return next(new HttpError(404, 'Not Found'));
});

router.post('/password/restore/:action', (req, res, next) => {
	if (req.params.action === 'invite') {
		
		AuthService.passwordRestoreRequest(req.body.email)
			.then(response => res.json({ message: response }))
			.catch(error => next(new HttpError(error.status, error.message)));
		
	} else if (req.params.action === 'complete') {
		
		AuthService.passwordRestoreComplete(req.body)
			.then(response => res.json({ message: response }))
			.catch(error => next(new HttpError(error.status, error.message)));
		
	} else return next(new HttpError(404, 'Not Found'));
});

router.post('/check/token/:type', (req, res, next) => {
	AuthService.verifyToken(req.params.type, req.body.token)
		.then(response => req.params.type === 'service' ? res.json({ user: AuthService.publicUser(response)}) : res.json(response))
		.catch(error => next(new HttpError(error.status, error.message)));
});

router.post('/logout', (req, res, next) => {
	AuthService.signOutRequest(req.body.userId)
		.then(response => res.json(response))
		.catch(error => next(new HttpError(error.status, error.message)));
});

module.exports = router;