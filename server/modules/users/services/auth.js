const AdminUser = require('../model');
const { transporter, options } = require('../../../libs/mailer/mailer');
const { dbService, authHelper } = require('./');


module.exports.authenticateUser = data => new Promise((resolve, reject) => {
	dbService
		.findOneByEmail(data.email)
		.then(user => {
			if (!user) return reject({ status: 404, msg: 'Пользователь не найден' });
			if (!user.serviceData.isVerified)  return reject({ status: 403, msg: 'Аккаунт не подтверждён. Нужно завершить регистрацию!' });
			if (!authHelper.compareSecretWithHash(data.secret, user.accessData.hash)) return reject({ status: 401, msg: 'Не правильный логин или пароль' });
			
			const authToken = authHelper.createAuthToken(user._id);
			
			user.accessData.token = authToken;
			user
				.save()
				.then(() => {
					let responseUser = user;
					delete responseUser.serviceData;
					delete responseUser.accessData;
					
					return resolve({ user: responseUser, token: authToken });
				})
				.catch(error => reject(error));
		})
		.catch(error => reject(error));
});

module.exports.registerInvite = (userEmail, userRole, newUserId) => new Promise(((resolve, reject) => {
	//create new userId value
	dbService
		.getNewUserId()
		.then(response => newUserId = response)
		.catch(error => reject(error));
	
	//check for existing user with requested email
	dbService
		.findOneByEmail(userEmail)
		.then(user => {
			//throw error if email exists
			if (user) return reject({ status: 400, msg: 'Пользователь с таким email существует' })
			
			const serviceToken = authHelper.createServiceToken();
			
			console.log('serviceToken', serviceToken)
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
					transporter.sendMail(options(userEmail, 'registerInvite', null, serviceToken));
					
					return resolve('Пользователю отправлено приглашение на email');
				})
				.catch(error => reject(error));
			
		})
		.catch(error => reject(error))
}));

module.exports.registerComplete = data => new Promise(((resolve, reject) => {
	
	dbService
		.findOneByEmail(data.email)
		.then(user => {
			if (!user) reject({ status: 404, msg: 'Пользователь с таким email не найден' });
			
			const hashedPassword = authHelper.generateSecretHash(data.secret);
			
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
					console.log('update.user save then')
					transporter.sendMail(options(data.email, 'registerComplete', data.firstName, null))
					
					return resolve('Аккаунт успешно активирован');
				})
				.catch(error => reject(error));
			
			
		})
		.catch(error => reject(error));
}));

module.exports.passwordRecoveryRequest = userEmail => new Promise((resolve, reject) => {

});

module.exports.passwordRecoveryComplete = userEmail => new Promise((resolve, reject) => {

});

module.exports.removeUserAccount = userEmail => new Promise((resolve, reject) => {

});