const jwt = require('jsonwebtoken');
const AdminModel = require('../model');
const { sessionSecretString } = require('../../../config');

class AuthService {
	static createToken(type, data) {
		const expiresTime = type === 'service' ? '24h' : type === 'access' ? '3h' : 1000;
		
		return jwt.sign(data, sessionSecretString, { expiresIn: expiresTime })
	}
	
	static verifyToken(type, token) {
		const decodedJwt = jwt.verify(token, sessionSecretString, {},(error, decoded) => {
			if (error) return error;
			return decoded;
		});
		
		// Проверка сервисного токена
		if (type === 'service') {
			if (decodedJwt.name) {
				let reason = decodedJwt.name === 'TokenExpiredError' ?
					{ status: 400, message: 'Срок действия ссылки истёк. Воспользуйтесь функционалом восстановления пароля' } :
					{ status: 403, message: 'Доступ запрещён.\nНекорректная ссылка регистрации. Воспользуйтесь функционалом восстановления пароля' };
				
				return Promise.reject(reason);
			} else {
				return AdminModel.findOne({ 'email': decodedJwt.email }, (error, result) => {
					if (error) return Promise.reject({ status: 401, message: error.message })
					if (!result) return Promise.reject({ status: 403, message: 'Некорректная ссылка регистрации. Пользователь не найден' })
					
					return Promise.resolve(result);
				})
			}
		}
		
		//Проверка токена доступа
		if (type === 'access') {
			if (decodedJwt.name) {
				return decodedJwt.name === 'TokenExpiredError' ?
					Promise.reject({ status: 401, message: 'Срок действия сессии истёк. Пройдите авторизацию повторно' }) :
					Promise.reject({ status: 401, message: 'Некорректный токен сессии. Пройдите авторизацию повторно' });
			} else {
				return AdminModel.findOne({ _id: decodedJwt._id }, {}, (error, result) => {
					if (error === null && result === null) return Promise.reject({ status: 401, message: 'Некорректные данные токена' });
					if (error) return Promise.reject({ status: 401, message: error.message });
					if (!result) return Promise.reject({ status: 401, message: 'Пользователь не найден' });
					
					return Promise.resolve();
				});
			}
		}
	}
	
	static publicUser(user) {
		return {
			_id: user._id,
			userId: user.userId,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			gender: user.gender,
			phoneNumber: user.phoneNumber,
			role: user.role,
			birthday: user.birthday
		}
	}
	
	static signOutRequest(userId) {
		
		return new Promise((resolve, reject) => {
			AdminModel.findByIdAndUpdate(userId,{ accessToken: null },{ new: true }, (error, user) => {
				if (error) return reject({ status: 401, message: error.message });
				if (!user) return reject({ status: 401, message: 'Пользователь не найден'});
				
				return resolve({ message: `Хорошего дня, ${ user.firstName }!` });
			});
		});
	}
}

module.exports = AuthService;

