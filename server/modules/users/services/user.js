const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminModel = require('../model');
const AuthService = require('./auth');

const { sessionSecretString } = require('../../../config');
const sendEmailLetter = require('../../../libs/mailer');

const getMaxUserId = () => Promise.resolve(AdminModel.find({}, { _id: 0, userId: 1 }).sort({ userId: -1 }).limit(1));
const signToken = (type, data) => {
	const expiresTime = type === 'service' ? '24h' : type === 'access' ? '9h' : 1000;

	return Promise.resolve(jwt.sign(data, sessionSecretString, { expiresIn: expiresTime }));
};
class UserService {
	static getAll() {
		return new Promise((resolve, reject) => {
			AdminModel.find({},
				{ _id: 1, userId: 1, email: 1, firstName: 1, lastName: 1, gender: 1, phoneNumber: 1, birthday: 1, role: 1, isVerified: 1 },
				(error, users) => {
					if (error) return reject({ status: 500, message: error.message });
					
					return resolve(users);
				})
		})
	}
	
	static editAccount(docId, data) {
		return new Promise((resolve, reject) => {
			AdminModel.findByIdAndUpdate(docId, data, { new: true }, (error, user) => {
				if (error) return reject({ status: 500, message: error.message });
				if (!user) return reject({ status: 404, message: 'Пользователь не найден'});
				
				return resolve({ message: `Пользователь обновлён`, user: AuthService.publicUser(user) });
			})
		})
	}
	
	static removeAccount(docId, email) {
		return new Promise((resolve, reject) => {
			
			AdminModel.findByIdAndRemove(docId, {},(error) => {
				if (error) return reject({ status: 500, message: error.message });
				
				sendEmailLetter('userRemoveAccess', email, 'пользователь', null)
				
				return resolve({ message: 'Пользователь успешно удалён' });
			});
		})
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

					return resolve({ message: 'Пользователю отправлено приглашение на email', user: user });
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

								return resolve({ message: 'Аккаунт успешно активирован' });
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
				if (!user) return reject({ status: 404, message: 'Пользователь не найден' });

				user.hash = null;
				user.accessToken = null;
				user.serviceToken = token;
				user.isVerified = false;

				user.save()
					.then(() => {
						sendEmailLetter('passwordRestore', user.email, user.firstName, token);

						return resolve({ message: 'Ссылка на восстановление пароля отправлена на email' });
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

								return resolve({ message: 'Пароль успешно восстановлен. Для авторизации используйте ваш email и новый пароль' })
							})
							.catch(error => reject({ status: 500, message: error.message }));
					})
				})
			})
		})
	}
}

module.exports = UserService;