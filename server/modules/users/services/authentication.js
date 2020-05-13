const AdminUser = require('../model');
const sendEmailLetter = require('../../../libs/mailer');
const { getNewUserId, findOneByEmail, deleteOneByEmail } = require('./database');
const { createServiceToken, generateSecretHash } = require('./helpers');

module.exports.registerInvite = (userEmail, userRole, newUserId) => new Promise((resolve, reject) => {
	//create new userId value
	getNewUserId()
		.then(response => newUserId = response)
		.catch(error => reject(error));
	
	//check for existing user with requested email
	findOneByEmail(userEmail)
		.then(user => {
			//throw error if email exists
			if (user) return reject({ status: 400, msg: 'Пользователь с таким email существует' })
			
			const serviceToken = createServiceToken();
			
			const newUser = new AdminUser({
				email: userEmail,
				userId: newUserId,
				serviceData: {
					token: serviceToken,
					role: userRole
				}
			});
			
			newUser
				.save()
				.then(() => {
					sendEmailLetter('registerInvite', userEmail, null, serviceToken);
					
					return resolve('Пользователю отправлено приглашение на email');
				})
				.catch(error => reject(error));
			
		})
		.catch(error => reject(error))
});

module.exports.registerComplete = (data) => new Promise((resolve, reject) => {
	findOneByEmail(data.email)
		.then(user => {
			if (!user) return reject({ status: 404, msg: 'Пользователь не найден'});
			
			const hashedPassword = generateSecretHash(data.secret);
			
			user.info = {
				firstName: data.firstName,
				lastName: data.lastName,
				gender: data.gender,
				phoneNumber: data.phoneNumber
			};
			user.serviceData = {
				token: null,
				isVerified: true,
				accessExpires: null
			};
			user.accessData = {
				hash: hashedPassword
			};
			
			user.save()
				.then(() => {
					sendEmailLetter('registerComplete', data.email, data.firstName, null)
					
					return resolve('Аккаунт успешно активирован');
				})
				.catch(error => reject(error));
		})
		.catch(error => reject(error));
});

module.exports.passwordRestoreRequest = (userEmail) => new Promise((resolve, reject) => {
	findOneByEmail(userEmail)
		.then(user => {
			if (!user) return reject({ status: 404, msg: 'Пользователь не найден'})
			
			const serviceToken = createServiceToken();
			
			user.serviceData = {
				token: serviceToken,
				isVerified: false,
				accessExpires: Date.now() + 1000 * 60 * 60 * 24
			};
			user.accessData = {
				token: null,
				hash: null
			};
			
			user
				.save()
				.then(() => {
					sendEmailLetter('passwordRestore', user.email, user.firstName, serviceToken);
					
					return resolve('Ссылка на восстановление пароля отправлена на email.')
				})
				.catch(error => reject(error))
		})
		.catch(error => reject(error))
});

module.exports.passwordRestoreComplete = (data) => new Promise((resolve, reject) => {
	findOneByEmail(data.email)
		.then(user => {
			if (!user) return reject({ status: 404, msg: 'Пользователь не найден'});
			if (user.serviceData.token !== data.serviceToken) return reject({ status: 403, msg: 'Токен сброса пароля не актуальный или не существует'});
			
			user.serviceData = {
				token: null,
				isVerified: true,
				accessExpires: null
			};
			user.accessData = {
				hash: generateSecretHash(data.secret)
			};
			
			user
				.save()
				.then(() => {
					sendEmailLetter('passwordRestoreComplete', user.email, user.name, null);
					
					return resolve('Пароль успешно восстановлен. Для авторизации используйте ваш email и новый пароль')
				})
				.catch(error => reject(error));
		})
		.catch(error => reject(error))
});

module.exports.removeUserAccount = (userEmail) => new Promise((resolve, reject) => {
	deleteOneByEmail(userEmail)
		.then(result => {
			if (!result.deletedCount) return reject({ status: 400, msg: 'Пользователь не найден' });
			else return resolve('Пользователь успешно удалён');
		})
		.catch(error => reject(error));
});