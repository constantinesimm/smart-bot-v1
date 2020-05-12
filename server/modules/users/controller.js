const router = require('express').Router();
const { authService } = require('./services');
const { HttpError } = require('../../middleware');

router.post('/register/invite', (req, res, next) => {
	authService
		.registerInvite(req.body.email, req.body.role)
		.then(response => res.status(200).json({ message: response }))
		.catch(error => next(new HttpError(error.status, error.msg)))
});

router.post('/register/complete', (req, res, next) => {
	authService
		.registerComplete(req.body)
		.then(response => res.json({ message: response }))
		.catch(error => next(new HttpError(error.status, error.msg)))
});

module.exports = router;