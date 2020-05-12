const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secretString } = require('../../../config');

module.exports = {
	createAuthToken(userId) {
		return jwt.sign({ id: userId }, secretString, { expiresIn: '3h' });
	},
	createServiceToken() {
		const randomString = (+new Date).toString(36).slice(-10) + Math.random().toString(36).slice(-10);
		
		return bcrypt.hashSync(randomString, 10).replace(/[/]/g, '').replace(/[$]/g, '').replace(/[.]/g, '');
	},
	generateSecretHash(secret) {
		return bcrypt.hashSync(secret, 10);
	},
	compareSecretWithHash(secret, hash) {
		return bcrypt.compareSync(secret, hash);
	}
};
