const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminModel = require('./model');
const sendEmailLetter = require('../../libs/mailer');
const { sessionSecretString } = require('../../config');

const getMaxUserId = () => Promise.resolve(AdminModel.find({}, { _id: 0, userId: 1 }).sort({ userId: -1 }).limit(1));
const signToken = (type, data) => {
	const expiresTime = type === 'service' ? '24h' : type === 'access' ? '9h' : 1000;
	
	return Promise.resolve(jwt.sign(data, sessionSecretString, { expiresIn: expiresTime }));
};

class UserService {
	static createToken(type, data) {
		const expiresTime = type === 'service' ? '24h' : type === 'access' ? '9h' : 1000;
		
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
					{
						status: 400,
						message: 'Срок действия ссылки истёк. Воспользуйтесь функционалом восстановления пароля'
					} : {status: 403, message: 'Доступ запрещён'};
				
				return Promise.reject(reason);
			} else {
				let queryKey = Object.keys(decodedJwt)[0];
				
				return AdminModel.findOne({[Symbol(queryKey)]: decodedJwt[queryKey]}, {}, (error, result) => {
					if (error) return Promise.reject({status: 500, message: error.message})
					if (!result) return Promise.reject({status: 404, message: 'Пользователь не найден'})
					
					return Promise.resolve(result);
				})
			}
		}
		
		//Проверка токена доступа
		if (type === 'access') {
			if (decodedJwt.name) {
				let reason = decodedJwt.name === 'TokenExpiredError' ?
					{ status: 401, message: 'Срок действия сессии истёк. Пожалуйста авторизирутесь' } :
					{ status: 401, message: 'Ошибочный токен, доступ запрещён. Пожалуйста авторизируйтесь' };
				
				return Promise.reject(reason);
			} else {
				return AdminModel.findOne({ accessToken: token}, {}, (error, result) => {
					if (error) return Promise.reject({status: 500, message: error.message})
					if (!result) return Promise.reject({status: 401, message: 'Пользователь не найден'})
					
					return Promise.resolve();
				})
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
			role: user.role
		}
	}
	
	static registerRequest(data) {
		return new Promise(async (resolve, reject) => {
			const maxUserId = await getMaxUserId();
			const token = await signToken('service', { email: data.email });
			
			AdminModel.findOne({ email: data.email }, (error, user) => {
				if (error) return reject({ status: 500, message: error.message });
				if (user) return reject({ status: 400, message: 'Пользователь с таким email существует' });
				
				const newUser = {
					email: data.email,
					userId: maxUserId.length ? maxUserId[0].userId + 1 : 1,
					role: data.role,
					serviceToken: token,
					isVerified: false
				};
				
				AdminModel.create(newUser, (error, user) => {
					if (error) return reject({ status: 500, message: error.message });
					
					sendEmailLetter('registerInvite', user.email, null, user.serviceToken);
					
					return resolve('Пользователю отправлено приглашение на email');
				});
			})
		})
	}
	
	static registerComplete(data) {
		return new Promise((resolve, reject) => {
			
			AdminModel.findOne({email: data.email}, (error, user) => {
				if (error) return reject({ status: 500, message: error.message });
				if (!user) return reject({status: 404, message: 'Пользователь не найден'});
				if (user.isVerified) return reject({status: 400, message: 'Пользователь уже зарегистрирован'});
				
				return bcrypt.genSalt(10, (error, salt) => {
					return bcrypt.hash(data.secret, salt, (error, hash) => {
						user.firstName = data.firstName;
						user.lastName = data.lastName;
						user.gender = data.gender;
						user.phoneNumber = data.phoneNumber;
						user.hash = hash;
						user.serviceToken = null;
						user.isVerified = true;
						
						user.save()
							.then(() => {
								sendEmailLetter('registerComplete', data.email, data.firstName, null)
								
								return resolve('Аккаунт успешно активирован');
							})
							.catch(error => reject({ status: 500, message: error.message }));
					})
				})
			})
		})
	}
	
	static passwordRestoreRequest(email) {
		
		return new Promise(async (resolve, reject) => {
			const token = await signToken('service', { email: email });
			
			AdminModel.findOne({ email: email }, (error, user) => {
				if (error) return reject({ status: 500, message: error.message });
				if (!user) return reject({status: 404, message: 'Пользователь не найден'});
				
				user.hash = null;
				user.accessToken = null;
				user.serviceToken = token;
				user.isVerified = false;
				
				user.save()
					.then(() => {
						sendEmailLetter('passwordRestore', user.email, user.firstName, token);
						
						return resolve('Ссылка на восстановление пароля отправлена на email.');
					})
					.catch(error => reject({ status: 500, message: error.message }))
			})
		})
	}
	
	static passwordRestoreComplete(data) {
		return new Promise((resolve, reject) => {
			AdminModel.findOne({ email: data.email }, (error, user) => {
				if (error) return reject({ status: 500, message: error.message });
				if (!user) return reject({status: 404, message: 'Пользователь не найден'});
				if (user.isVerified) return reject({status: 400, message: 'Аккаунт пользователя уже активирован'});
				
				return bcrypt.genSalt(10, (error, salt) => {
					return bcrypt.hash(data.secret, salt, (error, hash) => {
						
						user.hash = hash;
						user.serviceToken = null;
						user.isVerified = true;
						
						user.save()
							.then(() => {
								sendEmailLetter('passwordRestoreComplete', user.email, user.firstName, null);
								
								return resolve('Пароль успешно восстановлен. Для авторизации используйте ваш email и новый пароль')
							})
							.catch(error => reject({ status: 500, message: error.message }));
					})
				})
			})
		})
	}
	
	static removeEmployerAccount(email) {
		return new Promise((resolve, reject) => {
			AdminModel.deleteOne({ email: email }, (error, result) => {
				if (error) return reject({ status: 500, message: error.message });
				if (!result.deletedCount) return reject({ status: 404, message: 'Пользователь не найден' });
				
				sendEmailLetter('userRemoveAccess', email, null, null)
				
				return resolve('Пользователь успешно удалён');
			})
		})
	}
	
	static signOutRequest(userId) {
		console.log(userId)
		return new Promise((resolve, reject) => {
			AdminModel.findByIdAndUpdate(userId,{ accessToken: null },{ new: true }, (error, user) => {
				if (error) return reject({ status: 500, message: error.message });
				if (!user) return reject({ status: 404, message: 'Пользователь не найден'});
				
				return resolve(`Хорошего дня, ${ user.firstName }!`);
			});
		});
	}
}

module.exports = UserService;