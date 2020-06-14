const userPropRules = require('../rules/user');

class AuthSchema {
	static loginForm() {
		return {
			type: 'object',
			required: ['email', 'secret'],
			additionalProperties: true,
			properties: {
				email: userPropRules.email,
				secret: userPropRules.secret
			},
			errorMessage: {
				required: {
					email: 'Необходимо указать email пользователя',
					secret: 'Необходимо указать пароль пользователя'
				}
			}
		};
	}
	
	static logout() {
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
	
	static checkToken() {
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
		};
	}
	
}

module.exports = AuthSchema;