const routes = {
	users: require('../modules/users/controller')
};

const setRouter = (app) => {
	app.use('/api/users', routes.users);
};

module.exports = setRouter;