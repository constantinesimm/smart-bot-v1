const router = require('express').Router();
const HttpError = require('../../../libs/errors/http-error');
const RouteGuard = require('../../../middleware/route-guard');
const UserService = require('../services/user');
const UserValidator = require('../../../middleware/validator/user-validator');

/**
 * @api {post} /api/users/admins/all
 * @apiName get all Admin users list
 * @apiPermission all authenticated users
 * @apiGroup User
 *
 * @apiSuccess (200) {Array} Array with auth users
 */
router.post('/admins/all', RouteGuard.isPrivate, UserValidator.getAllUsers, (req, res, next) => {
	UserService.getAll()
		.then(response => res.json(response))
		.catch(error => next(new HttpError(error.status, error.message)));
});

/**
 * @api {post} /api/users/employee/edit/:docId
 * @apiName User edit account
 * @apiPermission auth and super
 * @apiGroup User
 *
 * @apiParam {String} [docId] Mongo document ObjectId in request params
 * @apiParam {String} [role] Role
 * @apiParam {String} [firstName] Firstname
 * @apiParam {String} [lastName] Lastname
 * @apiParam {String} [phoneNumber] Phone Number
 * @apiParam {String} [birthday] Date of birthday
 *
 * @apiSuccess (200) {Object} success text message in object
 */
router.post('/employee/edit/:docId', RouteGuard.isPrivate, UserValidator.employeeEdit, (req, res, next) => {
	UserService.editAccount(req.params.docId, req.body)
		.then(response => res.json(response))
		.catch(error => next(new HttpError(error.status, error.message)))
});

/**
 * @api {post} /api/users/employee/remove/:docId
 * @apiName User remove account
 * @apiPermission auth and super
 * @apiGroup User
 *
 * @apiParam {String} [docId] Mongo document ObjectId in request params
 * @apiParam {String} [email] Email
 *
 * @apiSuccess (200) {Object} success text message in object
 */
router.post('/employee/remove/:docId', RouteGuard.isPrivate, UserValidator.employeeRemove, (req, res, next) => {
	UserService.removeAccount(req.params.docId, req.body.email)
		.then(response => res.json({ message: response }))
		.catch(error => next(new HttpError(error.status, error.message)));
});

module.exports = router;