const router = require('express').Router();
const { authService } = require('./services');
const { HttpError } = require('../../middleware');
const passport = require('passport');

router.post('/login', (req, res, next) => {
	passport.authenticate('local', { session: false },(err, user, info) => {
		if (err) return next(new HttpError(err));
		
		if (!user) return next(new HttpError(info.status, info.msg));
		
		req.logIn(user, (err) => {
			if (err) return next(new HttpError(err))
			
			return res.json({ user: user.data, token: user.token, message: user.message })
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
	authService
		.registerComplete(req.body)
		.then(response => res.json({ message: response }))
		.catch(error => next(new HttpError(error.status, error.msg)))
});

module.exports = router;