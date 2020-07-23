const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	userId: Number,
	email: {
		type: String,
		trim: true,
		required: true,
		set: v => v.toLowerCase()
	},
	firstName: String,
	lastName: String,
	gender: String,
	phoneNumber: {
		type: String,
		set: v => v.replace(/[+\s()]/g, '')
	},
	birthday: {
		type: Date,
		default: null
	},
	role: {
		type: String,
		enum: ['manager', 'admin', 'super'],
		default: 'manager'
	},
	hash : {
		type: String,
		default: null
	},
	accessToken: {
		type: String,
		default: null
	},
	serviceToken: {
		type: String,
		default: null
	},
	isVerified: {
		type: Boolean,
		default: false
	}
}, { collection: 'AdminUsers' });

module.exports = mongoose.model('AdminModel', UserSchema);