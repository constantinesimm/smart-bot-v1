const { dbService, authHelper } = require('../../modules/users/services');
const { HttpError } = require('../../middleware');
const LocalStrategy = require('passport-local').Strategy;

const setPassport = passport => {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'secret'
	}, (username, password, done) => {
		dbService
			.findOneByEmail(username)
			.then(user => {
				if (!user) return done(null, false, { status: 404, msg: 'Пользователь не найден или несуществует'});
				if (!user.serviceData.isVerified) return done(null, false, { status: 403, msg: 'Аккаунт не подтверждён. Нужно завершить регистрацию!' });
				if (!authHelper.compareSecretWithHash(username, user.accessData.hash)) return done(null, false, { status: 401, msg: 'Не правильный логин или пароль' });
				
				const authToken = authHelper.createAuthToken(user._id);
				user.accessData.hash = authToken;
				
				user
					.save()
					.then(() => {
						delete user.serviceData;
						delete user.accessData;
						
						return done(null, { data: user, token: authToken });
					});
			})
			.catch(err => new HttpError(err))
	}));
	
	passport.serializeUser((user, done) => done(null, user._id));
	passport.deserializeUser((id, done) => {
		dbService
			.findOneById(id)
			.then(user => done(null, user))
			.catch(error => new HttpError(error));
	})
};

module.exports = setPassport;