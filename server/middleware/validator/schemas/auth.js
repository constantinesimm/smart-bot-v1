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
	
	static registerInvite() {
		return {
			type: 'object',
			required: ['email', 'role'],
			additionalProperties: true,
			properties: {
				email: userPropRules.email,
				role: userPropRules.role
			},
			errorMessage: {
				required: {
					email: 'Необходимо указать email пользователя',
					role: 'Необходимо выбрать уровень прав доступа'
				}
			}
		};
	}
	
	static registerComplete() {
		return {
			type: 'object',
			required: ['userId', 'email', 'secret',  'firstName', 'lastName', 'gender', 'phoneNumber'],
			additionalProperties: true,
			properties: {
				userId: userPropRules.userId,
				email: userPropRules.email,
				secret: userPropRules.secret,
				firstName: userPropRules.firstName,
				lastName: userPropRules.lastName,
				gender: userPropRules.gender,
				phoneNumber: userPropRules.phoneNumber
			},
			errorMessage: {
				required: {
					userId: 'Необходимо указать идентификатор пользователя',
					email: 'Необходимо указать email пользователя',
					secret: 'Необходимо указать пароль пользователя',
					firstName: 'Необходимо указать имя пользователя',
					lastName: 'Необходимо указать фамилию пользователя',
					gender: 'Необходимо выбрать пол пользователя',
					phoneNumber: 'Необходимо указать номер телефона пользователя',
				}
			}
		};
	}
	
	static passwordRestoreInvite() {
		return {
			type: 'object',
			required: ['email'],
			additionalProperties: true,
			properties: {
				email: userPropRules.email
			},
			errorMessage: {
				required: {
					email: 'Необходимо указать email пользователя'
				}
			}
		};
	}
	
	static passwordRestoreComplete() {
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
	
}

module.exports = AuthSchema;