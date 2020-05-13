const passport = require('passport');
const router = require('express').Router();
const HttpError = require('../../libs/http-error');
const { authService } = require('./services');

router.post('/authenticate', (req, res, next) => {
	passport.authenticate('local', { session: false },(error, user, info) => {
		if (error) return next(new HttpError(error));
		
		if (!user) return next(new HttpError(info.status, info.msg));
		
		req.logIn(user, (error) => {
			if (error) return next(new HttpError(error));
			
			res.setHeader('Authorization', `Bearer ${ user.accessData.token }`);
			return res.json(user);
		})
	})(req, res, next);
});

router.post('/register/:action', (req, res, next) => {
	if (req.params.action === 'invite') {
		return authService
			.registerInvite(req.body.email, req.body.role)
			.then(response => res.json({ message: response }))
			.catch(error => next(new HttpError(error.status, error.msg)));
		
	} else if (req.params.action === 'complete') {
		return authService
			.registerComplete(req.body)
			.then(response => res.json({ message: response }))
			.catch(error => next(new HttpError(error.status, error.msg)));
		
	} else next(new HttpError(404, `Not Found ${ req.path }`));
});

router.post('/password/restore/:action', (req, res, next) => {
	if (req.params.action === 'request') {
		return authService
			.passwordRestoreRequest(req.body.email)
			.then(response => res.json({ message: response }))
			.catch(error => next(new HttpError(error.status, error.msg)));
		
	} else if (req.params.action === 'complete') {
		return authService
			.passwordRestoreComplete(req.body)
			.then(response => res.json({ message: response }))
			.catch(error => next(new HttpError(error.status, error.msg)));
		
	} else next(new HttpError(404, `Not Found ${ req.path }`));
});

router.post('/employee/remove', (req, res, next) => {
	authService
		.removeUserAccount(req.body.email)
		.then(response => res.json({ message: response }))
		.catch(error => next(new HttpError(error.status, error.msg)));
});
module.exports = router;