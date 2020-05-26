const router = require('express').Router();
const HttpError = require('../../../libs/http-error');
const UserService = require('../services/user');
const authHandler = require('../../../middleware/auth-handler');

router.post('/:type/all', authHandler.privateRoute, (req, res, next) => {
	if (req.params.type === 'admins') {
		
		UserService.getAll()
			.then(response => res.json(response))
			.catch(error => next(new HttpError(error.status, error.message)));
		
	} else if (req.params.type === 'clients') {
		return next(new HttpError(500, 'Route is unavailable'));
	} else return next(new HttpError(404, 'Not Found'));
});

router.post('/employee/remove/:docId', authHandler.privateRoute, (req, res, next) => {
	
	UserService.removeAccount(req.params.docId, req.body.email)
		.then(response => res.json({ message: response }))
		.catch(error => next(new HttpError(error.status, error.message)));
});

router.post('/employee/edit/:docId', authHandler.privateRoute, (req, res, next) => {
	UserService.editAccount(req.params.docId, req.body)
		.then(response => res.json(response))
		.catch(error => next(new HttpError(error.status, error.message)))
});

module.exports = router;