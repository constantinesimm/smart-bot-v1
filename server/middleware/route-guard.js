const AuthService = require('../modules/users/services/auth');
const HttpError = require('../libs/errors/http-error');

class RouteGuard {
	static isPublic(req, res, next) {
		console.log('publicRoute\n', 'req.method - ', req.method, '\n', 'req.headers - ', req.headers,'\n', 'req.body - ', req.body)
		if (!req.headers.authorization) return next();
		
		return next(new HttpError(403, 'Ресурс доступен только новым посетителям'));
	}
	
	static isPrivate(req, res, next) {
		console.log('privateRoute', req.method, req.headers);
		if (!req.headers.authorization) return next(new HttpError(401, 'Для доступа к этому ресурсу необходима авторизация'));
		
		return AuthService.verifyToken('access', req.headers.authorization)
			.then(() => next())
			.catch(error => next(new HttpError(error.status, error.message)))
	}
	
	static isAdmin(req, res, next) {
		if (!req.headers.authorization) return next(new HttpError(401, 'Для доступа к этому ресурсу необходима авторизация'));
		
		return AuthService.verifyToken('access', req.headers.authorization)
			.then(response => response.role === 'super' ? next() : next(new HttpError(403, 'Доступ к данному ресурсу запрещён!')))
			.catch(error => next(new HttpError(error.status, error.message)));
	}
}

module.exports = RouteGuard;