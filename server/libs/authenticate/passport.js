const LocalStrategy = require('passport-local').Strategy;
const HttpError = require('../http-error');
const { dbService, authHelper } = require('../../modules/users/services');

const publicUserObj = user => {
	return {
		userId: user.userId,
		email: user.email,
		info: {
			firstName: user.info.firstName,
			lastName: user.info.lastName,
			gender: user.info.gender,
			phoneNumber: user.info.phoneNumber
		},
		serviceData: {
			role: user.serviceData.role
		},
		accessData: {
			token: user.accessData.token
		}
	}
};

module.exports = passport => {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'secret'
	}, (username, password, done) => {
		dbService
			.findOneByEmail(username)
			.then(user => {
				if (!user) return done(null, false, { status: 404, msg: 'Пользователь не найден или не существует'});
				if (!user.serviceData.isVerified) return done(null, false, { status: 403, msg: 'Аккаунт не подтверждён. Нужно завершить регистрацию!' });
				if (!authHelper.compareSecretWithHash(password, user.accessData.hash)) return done(null, false, { status: 401, msg: 'Не правильный логин или пароль' });
				
				user.accessData.token = authHelper.createAuthToken(user._id);
				
				user
					.save()
					.then(() => done(null, publicUserObj(user)));
				
			})
			.catch(error => done(new HttpError(error)))
	}));
	
	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((id, done) => {
		dbService
			.findOneById(id)
			.then(user => done(null, user))
			.catch(error => new HttpError(error));
	})
};