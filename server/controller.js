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
		
		return fs.createReadStream(filePath).pipe(res);
		
	});
};

/*
router.options('/initiateCall', function(req, res){
    res.header('Access-Control-Allow-Origin', '*');  //allow access to current origin
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, x-route-guard');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.status(204).end();
})
 */