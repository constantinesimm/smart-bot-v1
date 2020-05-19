const fs = require('fs');
const path = require('path');

const routes = {
	users: require('./modules/users/controller')
};
const filePath = path.join(__dirname, '../dist/index.html');

module.exports = app => {
	app.use('/api/users', routes.users);
	app.get('*', (req, res) => {
		fs.stat(filePath,(error, stats) => {
			res.set({ 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': stats.size })
		});
		
		fs.createReadStream(filePath).pipe(res);
	});
};