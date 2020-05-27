const AuthSchema = require('./schemas/auth');
const HttpError = require('../../libs/errors/http-error');
const ajv = require('ajv')({ $data: true, allErrors: true, jsonPointers: true });
require('ajv-keywords')(ajv);
require('ajv-errors')(ajv, { singleError: true });

class AuthValidator {
	static loginForm(req, res, next) {
		return ajv.validate(AuthSchema.loginForm(), req.body) ? next() : next(new HttpError(400, `Ошибка валидации: ${ ajv.errors[0].message }`));
	}
	
	static logout(req, res, next) {
		return ajv.validate(AuthSchema.logout(), { token: req.headers.authorization }) ? next() : next(new HttpError(401, `Ошибка валидации: ${ ajv.errors[0].message }`));
	}
	
	static checkToken(req, res, next) {
		return ajv.validate(AuthSchema.checkToken(), req.body) ? next() : next(new HttpError(400, `Ошибка валидации: ${ ajv.errors[0].message }`));
	}
	
	static registerInviteForm(req, res, next) {
		return ajv.validate(AuthSchema.registerInvite(), req.body) ? next() : next(new HttpError(400, `Ошибка валидации: ${ ajv.errors[0].message }`));
	}
	
	static registerCompleteForm(req, res, next) {
		return ajv.validate(AuthSchema.registerComplete(), req.body) ? next() : next(new HttpError(400, `Ошибка валидации: ${ ajv.errors[0].message }`));
	}
	
	static passwordRestoreInvite(req, res, next) {
		return ajv.validate(AuthSchema.passwordRestoreInvite(), req.body) ? next() : next(new HttpError(400, `Ошибка валидации: ${ ajv.errors[0].message }`));
	}
	
	static passwordRestoreComplete(req, res, next) {
		return ajv.validate(AuthSchema.passwordRestoreComplete(), req.body) ? next() : next(new HttpError(400, `Ошибка валидации: ${ ajv.errors[0].message }`));
	}
}

module.exports = AuthValidator;