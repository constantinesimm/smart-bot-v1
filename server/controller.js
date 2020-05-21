const fs = require('fs');
const path = require('path');

const routes = {
	auth: require('./modules/users/controllers/auth'),
	users: require('./modules/users/controllers/user'),
};
const filePath = path.join(__dirname, '../dist/index.html');

module.exports = app => {
	app.use('/api/auth', routes.auth);
	app.use('/api/users', routes.users);
	app.get('*', (req, res) => {
		fs.stat(filePath,(error, stats) => {
			res.set({ 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': stats.size })
		});
		
		fs.createReadStream(filePath).pipe(res);
	});
};