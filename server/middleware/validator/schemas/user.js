const userPropRules = require('../rules/user');

class UserSchema {
	static getAllUsers() {
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
	
	static employeeEdit() {
		return {
			type: 'object',
			required: ['docId'],
			additionalProperties: true,
			properties: {
				docId: userPropRules.mongoId,
				firstName: userPropRules.firstName,
				lastName: userPropRules.lastName,
				phoneNumber: userPropRules.phoneNumber,
				role: userPropRules.role,
				birthday: userPropRules.birthday
			},
			errorMessage: {
				required: {
					docId: 'Необходимо указать идентификатор документа'
				}
			}
		}
	}
	
	static employeeRemove() {
		return {
			type: 'object',
			required: ['docId', 'email'],
			additionalProperties: true,
			properties: {
				email: userPropRules.email,
				docId: userPropRules.mongoId
			},
			errorMessage: {
				required: {
					email: 'Необходимо указать email пользователя',
					docId: 'Необходимо указать идентификатор документа'
				}
			}
		}
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

module.exports = UserSchema;