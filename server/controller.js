const fs = require('fs');
const path = require('path');
const express = require('express');

/* Application API endpoints */
const routes = {
	auth: require('./modules/users/controllers/auth'),
	users: require('./modules/users/controllers/user'),
};

/* Path to static index.html file */
const filePath = path.join(__dirname, '../dist/index.html');

/* Application controller handler */
module.exports = app => {
	app.use('/api/auth', routes.auth);
	app.use('/api/users', routes.users);
	
	/* static path */
	app.use(express.static(path.join(__dirname, '../dist')));
	app.get('*', (req, res) => {
		fs.stat(filePath,(error, stats) => {
			res.set({ 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': stats.size })
		});
		
		return fs.createReadStream(filePath).pipe(res);
	});
};