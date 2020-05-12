const router = require('express').Router();
const { authService } = require('./services');
const { HttpError } = require('../../middleware');
const passport = require('passport');

router.post('/login', (req, res, next) => {
	passport.authenticate('local', { session: false },(error, user, info) => {
		if (error) return next(new HttpError(error));
		
		if (!user) return next(new HttpError(info.status, info.msg));
		
		req.logIn(user, (error) => {
			if (error) return next(new HttpError(error))
			
			res.set({
				'Content-Type': 'application/json; charset=utf-8',
				'Authorization': user.accessData.token
			})
			return res.json(user)
		})
	})(req, res, next);
});

router.post('/authenticate', (req, res, next) => {
	authService
		.authenticateUser({ email: req.body.email, secret: req.body.secret })
		.then(response => res.json(response))
		.catch(error => next(new HttpError(error.status, error.msg)));
});

router.post('/register/invite', (req, res, next) => {
	authService
		.registerInvite(req.body.email, req.body.role)
		.then(response => res.json({ message: response }))
		.catch(error => next(new HttpError(error.status, error.msg)))
});

router.post('/register/complete', (req, res, next) => {
	console.log(req.body)
	authService
		.registerComplete(req.body)
		.then(response => res.json({ message: response }))
		.catch(error => next(new HttpError(error.status, error.msg)))
});

module.exports = router;