const AdminModel = require('../model');
const AuthService = require('./auth');
const sendEmailLetter = require('../../../libs/mailer');

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
};

module.exports = UserService;