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
}

module.exports = UserSchema;