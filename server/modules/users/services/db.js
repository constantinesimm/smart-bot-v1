const AdminUser = require('../model');

module.exports.findOneById = userId => new Promise((resolve, reject) => {
	AdminUser
		.findById(userId)
		.then(result => resolve(result))
		.catch(error => reject(error));
});

module.exports.findOneByEmail = userEmail => new Promise(((resolve, reject) => {
	AdminUser
		.findOne({ email: userEmail })
		.then(result => resolve(result))
		.catch(error => reject(error));
}));

module.exports.findOneByServiceToken = serviceToken => new Promise((resolve, reject) => {
	console.log('findOneByServiceToken', serviceToken)
	AdminUser
		.findOne({ 'serviceData.token': serviceToken })
		.then(result => resolve(result))
		.catch(error => reject(error));
});

module.exports.getNewUserId = () => new Promise(((resolve, reject) => {
	AdminUser
		.find({}, { _id: 0, userId: 1 })
		.sort({ userId: -1 })
		.limit(1)
		.then(result => result.length ? resolve(result[0].userId + 1) : resolve(1))
		.catch(error => reject(error))
}));