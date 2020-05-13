const mongoose = require('mongoose');
const { mongo } = require('../../config').database;
const uri = process.env.NODE_ENV === 'dev' ? mongo.uri.local : mongo.uri.prod;

module.exports = () => {
	return mongoose
		.connect(uri, mongo.options)
		.then(() => console.log('Application Database(mongoDB) connected'))
		.catch(error => console.log(`Application Database(mongoDB) connection error - ${ error }`));
};