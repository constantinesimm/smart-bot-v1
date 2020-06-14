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


/**
 * @api {post} /api/auth/register/invite
 * @apiName User registration invite
 * @apiPermission auth, super
 * @apiGroup Auth
 *
 * @apiParam {String} [email] Email
 * @apiParam {String} [role] Role
 *
 * @apiSuccess (200) {Object} success text message in object
 */
router.post('/register/invite', RouteGuard.isPrivate, UserValidator.registerInviteForm, (req, res, next) => {
	UserService.registerRequest(req.body)
		.then(data => res.json(data))
		.catch(error => next(new HttpError(error.status, error.message)));
});

/**
 * @api {post} /api/auth/register/complete
 * @apiName User registration complete
 * @apiPermission guest with services token
 * @apiGroup Auth
 *
 * @apiParam {Number} [userId] User ID
 * @apiParam {String} [email] Email
 * @apiParam {String} [secret] Password
 * @apiParam {String} [firstName] Firstname
 * @apiParam {String} [lastName] Lastname
 * @apiParam {String} [gender] Gender
 * @apiParam {String} [phoneNumber] Phone Number
 *
 * @apiSuccess (200) {Object} success text message in object
 */
router.post('/register/complete', RouteGuard.isPublic, UserValidator.registerCompleteForm, (req, res, next) => {
	UserService.registerComplete(req.body)
		.then(data => res.json(data))
		.catch(error => next(new HttpError(error.status, error.message)));
});

/**
 * @api {post} /api/auth/password/restore/invite
 * @apiName User password recovery verify
 * @apiPermission guest
 * @apiGroup Auth
 *
 * @apiParam {String} [email] Email
 *
 * @apiSuccess (200) {Object} success text message in object and sending mail with link
 */
router.post('/password/restore/invite', RouteGuard.isPublic, UserValidator.passwordRestoreInvite, (req, res, next) => {
	UserService.passwordRestoreRequest(req.body.email)
		.then(response => res.json({ message: response }))
		.catch(error => next(new HttpError(error.status, error.message)));
});

/**
 * @api {post} /api/auth/password/restore/complete
 * @apiName User registration recovery complete
 * @apiPermission guest with services token
 * @apiGroup Auth
 *
 * @apiParam {String} [email] Email
 * @apiParam {String} [secret] Password
 *
 * @apiSuccess (200) {Object} success text message in object
 */
router.post('/password/restore/complete', RouteGuard.isPublic, UserValidator.passwordRestoreComplete, (req, res, next) => {
	UserService.passwordRestoreComplete(req.body)
		.then(response => res.json({ message: response }))
		.catch(error => next(new HttpError(error.status, error.message)));
});

module.exports = router;