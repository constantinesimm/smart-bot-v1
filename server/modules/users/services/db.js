const AdminUsers = require('../model');

module.exports.findOneByEmail = userEmail => new Promise(((resolve, reject) => {
	AdminUsers
		.findOne({ email: userEmail })
		.then(result => resolve(result))
		.catch(error => reject(error));
}));

module.exports.findOneByServiceToken = serviceToken => new Promise((resolve, reject) => {
	console.log('findOneByServiceToken', serviceToken)
	AdminUsers
		.findOne({ 'serviceData.token': serviceToken })
		.then(result => {
			console.log('servicetoken',result)
			resolve(result);
		})
		.catch(error => reject(error));
});

module.exports.getNewUserId = () => new Promise(((resolve, reject) => {
	AdminUsers
		.find({}, { _id: 0, userId: 1 })
		.sort({ userId: -1 })
		.limit(1)
		.then(result => result.length ? resolve(result[0].userId + 1) : resolve(1))
		.catch(error => reject(error))
}));