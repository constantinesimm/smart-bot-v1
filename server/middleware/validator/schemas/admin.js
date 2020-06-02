const userPropRules = require('../rules/user');

class AdminSchema {
	static getLogsData() {
		return {
			type: 'object',
			required: ['token'],
			additionalProperties: true,
			properties: {
				token: userPropRules.token
			},
			errorMessage: {
				required: {
					token: 'Токен обязателен к передаче'
				}
			}
		}
	}
}

module.exports = AdminSchema;