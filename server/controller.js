const routes = {
	users: require('./modules/users/controller')
};

module.exports = app => {
	app
		.use('/api/users', routes.users);
};