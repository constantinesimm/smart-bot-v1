const passport = require('passport');
const router = require('express').Router();
const AuthService = require('../services/auth');
const HttpError = require('../../../libs/errors/http-error');
const RouteGuard = require('../../../middleware/route-guard');
const AuthValidator = require('../../../middleware/validator/auth-validator');

router.post('/authenticate', RouteGuard.isPublic, AuthValidator.loginForm, (req, res, next) => {
	passport.authenticate('local', { session: false },(error, user, info) => {
		if (error) return next(new HttpError(error.status, error.message));
		if (!user) return next(new HttpError(info.status, info.message));
		
		req.logIn(user, (error) => {
			if (error) return next(new HttpError(error.status, error.message));
			
			return res.json(user);
		})
	})(req, res, next);
});

router.post('/register/invite', RouteGuard.isPrivate, AuthValidator.registerInviteForm, (req, res, next) => {
	AuthService.registerRequest(req.body)
		.then(data => res.json(data))
		.catch(error => next(new HttpError(error.status, error.message)));
});

router.post('/register/complete', RouteGuard.isPublic, AuthValidator.registerCompleteForm, (req, res, next) => {
	AuthService.registerComplete(req.body)
		.then(data => res.json(data))
		.catch(error => next(new HttpError(error.status, error.message)));
});

router.post('/password/restore/invite', RouteGuard.isPublic, AuthValidator.passwordRestoreInvite, (req, res, next) => {
	AuthService.passwordRestoreRequest(req.body.email)
		.then(response => res.json({ message: response }))
		.catch(error => next(new HttpError(error.status, error.message)));
});

router.post('/password/restore/complete', RouteGuard.isPublic, AuthValidator.passwordRestoreComplete, (req, res, next) => {
	AuthService.passwordRestoreComplete(req.body)
		.then(response => res.json({ message: response }))
		.catch(error => next(new HttpError(error.status, error.message)));
});

router.post('/check/token/:type', RouteGuard.isPublic, AuthValidator.checkToken, (req, res, next) => {
	AuthService.verifyToken(req.params.type, req.body.token)
		.then(response => req.params.type === 'service' ? res.json({ user: AuthService.publicUser(response)}) : res.json(response))
		.catch(error => next(new HttpError(error.status, error.message)));
});

router.post('/logout', RouteGuard.isPrivate, AuthValidator.logout, (req, res, next) => {
	AuthService.verifyToken('access', req.headers.authorization)
		.then(response => AuthService.signOutRequest(response._id))
		.then(data => res.json(data))
		.catch(error => next(new HttpError(error.status, error.message)));
});

module.exports = router;