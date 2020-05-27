const router = require('express').Router();
const HttpError = require('../../../libs/errors/http-error');
const RouteGuard = require('../../../middleware/route-guard');
const UserService = require('../services/user');
const UserValidator = require('../../../middleware/validator/user-validator');

router.post('/admins/all', RouteGuard.isPrivate, UserValidator.getAllUsers, (req, res, next) => {
	UserService.getAll()
		.then(response => res.json(response))
		.catch(error => next(new HttpError(error.status, error.message)));
});

router.post('/employee/edit/:docId', RouteGuard.isPrivate, UserValidator.employeeEdit, (req, res, next) => {
	UserService.editAccount(req.params.docId, req.body)
		.then(response => res.json(response))
		.catch(error => next(new HttpError(error.status, error.message)))
});

router.post('/employee/remove/:docId', RouteGuard.isPrivate, UserValidator.employeeRemove, (req, res, next) => {
	UserService.removeAccount(req.params.docId, req.body.email)
		.then(response => res.json({ message: response }))
		.catch(error => next(new HttpError(error.status, error.message)));
});

module.exports = router;