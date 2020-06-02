const fs = require('fs');
const path = require('path');
const express = require('express');

/* Application API endpoints */
const routes = {
	admin: require('./modules/admin/controllers/admin'),
	auth: require('./modules/users/controllers/auth'),
	users: require('./modules/users/controllers/user'),
};

/* Path to static index.html file */
const filePath = path.join(__dirname, '../dist/index.html');

/* Application controller handler */
module.exports = app => {
	app.use('/api/auth', routes.auth);
	app.use('/api/users', routes.users);
	app.use('/api/admin', routes.admin);
	
	/* static path and file */
	app.use(express.static(path.join(__dirname, '../dist')));
	app.get('*', (req, res) => {
		fs.stat(filePath,(error, stats) => {
			res.set({ 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': stats.size })
		});
		
		fs.createReadStream(filePath).pipe(res);
	});
};