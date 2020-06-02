const AdminSchema = require('./schemas/admin');
const HttpError = require('../../libs/errors/http-error');
const ajv = require('ajv')({ $data: true, allErrors: true, jsonPointers: true });
require('ajv-keywords')(ajv);
require('ajv-errors')(ajv, { singleError: true });

class AdminValidator {
	static getLogs(req, res, next) {
		return ajv.validate(AdminSchema.getLogsData(), { token: req.headers.authorization }) ? next() : next(new HttpError(400, `Ошибка валидации: ${ ajv.errors[0].message }`));
	}
};

module.exports = AdminValidator;