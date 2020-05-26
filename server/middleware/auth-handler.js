const AuthService = require('../modules/users/services/auth');
const HttpError = require('../libs/http-error');

module.exports = {
	publicRoute: (req, res, next) => {
		console.log('publicRoute\n', 'req.method - ', req.method, '\n', 'req.headers - ', req.headers,'\n', 'req.body - ', req.body)
		if (!req.headers.authorization) return next();
		
		return next(new HttpError(403, 'Forbidden. Only for guest users'));
	},
	privateRoute: (req, res, next) => {
		console.log('privateRoute', req.method, req.headers);
		
		if (!req.headers.authorization) return next(new HttpError(401, 'Unauthorized. User need to be authorized'));
		
		return AuthService.verifyToken('access', req.headers.authorization)
			.then(() => next())
			.catch(error => next(new HttpError(error.status, error.message)))
	}
};