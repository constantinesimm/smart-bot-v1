const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const HttpError = require('../http-error');
const AdminModel = require('../../modules/users/model');
const UserService = require('../../modules/users/service');

module.exports = passport => {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'secret'
	}, (username, password, done) => {
		AdminModel.findOne({ email: username })
			.then(user => {
				if (!user) return done(null, false, { status: 404, msg: 'Пользователь не найден или не существует'});
				if (!user.isVerified) return done(null, false, { status: 403, msg: 'Аккаунт не подтверждён. Нужно завершить регистрацию!' });
				
				return bcrypt.compare(password, user.hash, function(err, res) {
					if (err) return done(null, false, err);
					if (!res) return done(null, false, { status: 401, msg: 'Не правильный логин или пароль' });
					
					user.accessToken = UserService.createToken('access', { _id: user._id });
					
					user.save().then(() => done(null, { user: UserService.publicUser(user), token: user.accessToken }));
				});
				
			})
			.catch(error => done(new HttpError(error)))
	}));
	
	passport.serializeUser((data, done) => done(null, data.user._id));
	passport.deserializeUser((token, done) => {
		AdminModel.findOne({ accessToken: token }).then(user => done(null, user)).catch(error => new HttpError(error));
	})
};