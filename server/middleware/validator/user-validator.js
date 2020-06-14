const UserSchema = require('./schemas/user');
const HttpError = require('../../libs/errors/http-error');
const ajv = require('ajv')({ $data: true, allErrors: true, jsonPointers: true });
require('ajv-keywords')(ajv);
require('ajv-errors')(ajv, { singleError: true });

class UserValidator {
	static getAllUsers(req, res, next) {
		return ajv.validate(UserSchema.getAllUsers(), { token: req.headers.authorization }) ? next() : next(new HttpError(401, `Ошибка валидации: ${ ajv.errors[0].message }`));
	}
	
	static employeeEdit(req, res, next) {
		const validate = ajv.validate(UserSchema.employeeEdit(), Object.assign({}, req.body, req.params));
		const filteredErrors = ajv.errors ? ajv.errors.filter(error => error.message.length > 0) : null;
		
		return validate ? next() : next(new HttpError(400, filteredErrors[0].message));
	}
	
	static employeeRemove(req, res, next) {
		const validate = ajv.validate(UserSchema.employeeRemove(), Object.assign({}, req.body, req.params));
		const filteredErrors = ajv.errors ? ajv.errors.filter(error => error.message.length > 0) : null;
		
		return validate ? next() : next(new HttpError(400, filteredErrors[0].message));
	}

	static registerInviteForm(req, res, next) {
		return ajv.validate(UserSchema.registerInvite(), req.body) ? next() : next(new HttpError(400, `Ошибка валидации: ${ ajv.errors[0].message }`));
	}

	static registerCompleteForm(req, res, next) {
		return ajv.validate(UserSchema.registerComplete(), req.body) ? next() : next(new HttpError(400, `Ошибка валидации: ${ ajv.errors[0].message }`));
	}

	static passwordRestoreInvite(req, res, next) {
		return ajv.validate(UserSchema.passwordRestoreInvite(), req.body) ? next() : next(new HttpError(400, `Ошибка валидации: ${ ajv.errors[0].message }`));
	}

	static passwordRestoreComplete(req, res, next) {
		return ajv.validate(UserSchema.passwordRestoreComplete(), req.body) ? next() : next(new HttpError(400, `Ошибка валидации: ${ ajv.errors[0].message }`));
	}
}

module.exports = UserValidator;