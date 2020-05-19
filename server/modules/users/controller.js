const passport = require('passport');
const router = require('express').Router();
const HttpError = require('../../libs/http-error');
const UserService = require('./service');

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
		
		UserService.registerRequest(req.body)
			.then(data => res.json(data))
			.catch(error => next(new HttpError(error.status, error.message)));
		
	} else if (req.params.action === 'complete') {
		
		UserService.registerComplete(req.body)
			.then(data => res.json(data))
			.catch(error => next(new HttpError(error.status, error.message)));
		
	} else next(new HttpError(404, 'Not Found'));
});

router.post('/password/restore/:action', (req, res, next) => {
	if (req.params.action === 'request') {
		
		UserService.passwordRestoreRequest(req.body.email)
			.then(response => res.json({ message: response }))
			.catch(error => next(new HttpError(error.status, error.message)));
		
	} else if (req.params.action === 'complete') {
		
		UserService.passwordRestoreComplete(req.body)
			.then(response => res.json({ message: response }))
			.catch(error => next(new HttpError(error.status, error.message)));
		
	} else next(new HttpError(404, 'Not Found'));
});

router.post('/employee/remove', (req, res, next) => {
	
	UserService.removeEmployerAccount(req.body.email)
		.then(response => res.json({ message: response }))
		.catch(error => next(new HttpError(error.status, error.message)));
});

router.post('/check/serviceToken', (req, res, next) => {
	UserService.verifyToken('service', req.body.serviceToken)
		.then(response => res.json({ user: UserService.publicUser(response)}))
		.catch(error => next(new HttpError(error.status, error.message)));
});

router.post('/logout', (req, res, next) => {
	UserService.signOutRequest(req.body.userId)
		.then(response => res.json(response))
		.catch(error => next(new HttpError(error.status, error.message)));
});

module.exports = router;