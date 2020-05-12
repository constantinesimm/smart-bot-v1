const AdminUsers = require('../model');
const { transporter, options } = require('../../../libs/mailer/mailer');
const { getNewUserId, findOneByEmail } = require('./db');
const helper = require('./helpers');

module.exports.registerInvite = (userEmail, userRole, newUserId) => new Promise(((resolve, reject) => {
	//create new userId value
	getNewUserId()
		.then(response => newUserId = response)
		.catch(error => reject(error));
	
	//check for existing user with requested email
	findOneByEmail(userEmail)
		.then(user => {
			//throw error if email exists
			if (user) return reject({ status: 400, msg: 'Пользователь с таким email существует' })
			
			const serviceToken = helper.createServiceToken();
			
			console.log('serviceToken', serviceToken)
			const newUser = new AdminUsers({
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
	
	findOneByEmail(data.email)
		.then(user => {
			if (!user) reject({ status: 404, msg: 'Пользователь с таким email не найден' });
			
			const hashedPassword = helper.generateSecretHash(data.secret);
			
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