const passport = require('passport');
const router = require('express').Router();
const AuthService = require('../services/auth');
const HttpError = require('../../../libs/errors/http-error');
const RouteGuard = require('../../../middleware/route-guard');
const AuthValidator = require('../../../middleware/validator/auth-validator');

/**
 * @api {post} /api/auth/authenticate
 * @apiName User authentication
 * @apiPermission guest
 * @apiGroup Auth
 *
 * @apiParam {Object} [user] user credentials from passport.js middleware
 *
 * @apiSuccess (200) {Object} mixed `User` object
 */
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

/**
 * @api {post} /api/auth/check/token/:type
 * @apiName Verify access or services token
 * @apiPermission all
 * @apiGroup Auth
 *
 * @apiParam {String} [token] JsonWebToken
 * @apiParam {String} [type] Type of token
 *
 * @apiSuccess (200) {Object} mixed `User` public data for services token type
 * @apiSuccess (200) Promise resolve for access token type
 */
router.post('/check/token/:type', RouteGuard.isPublic, AuthValidator.checkToken, (req, res, next) => {
	AuthService.verifyToken(req.params.type, req.body.token)
		.then(response => req.params.type === 'service' ? res.json({ user: AuthService.publicUser(response)}) : res.json(response))
		.catch(error => next(new HttpError(error.status, error.message)));
});

/**
 * @api {post} /api/auth/logout
 * @apiName User sign Out
 * @apiPermission all authenticated users
 * @apiGroup Auth
 *
 * @apiParam {String} [authorization] request header with user session data
 * @apiSuccess (200) {Object} success text message in object
 */
router.post('/logout', RouteGuard.isPrivate, AuthValidator.logout, (req, res, next) => {
	AuthService.verifyToken('access', req.headers.authorization)
		.then(response => response._id ? AuthService.signOutRequest(response._id) : next(new HttpError(401, 'Некорректные данные токена')))
		.then(data => res.json(data))
		.catch(error => next(new HttpError(error.status, error.message)));
});

module.exports = router;