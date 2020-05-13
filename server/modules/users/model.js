const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	userId: Number,
	email: {
		type: String,
		trim: true,
		set: v => v.toLowerCase()
	},
	info: {
		firstName: String,
		lastName: String,
		gender: String,
		phoneNumber: {
			type: String,
			set: v => v.replace(/[+\s()]/g, '')
		}
	},
	serviceData: {
		token: {
			type: String,
			default: null
		},
		isVerified: {
			type: Boolean,
			default: false
		},
		accessExpires: Date,
		role: {
			type: String,
			default: 'manager',
			enum: ['manager', 'admin', 'super']
		}
	},
	accessData: {
		token: {
			type: String,
			default: null
		},
		hash : {
			type: String,
			default: null
		}
	}
}, { collection: 'AdminUsers' });

module.exports = mongoose.model('AdminUser', UserSchema);