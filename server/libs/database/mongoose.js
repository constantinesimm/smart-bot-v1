const { mongo } = require('../../config').database;
const mongoose = require('mongoose');
const mongoUriConnection = process.env.NODE_ENV === 'production' ? mongo.uri.prod : mongo.uri.local;

module.exports = () => {
	return mongoose
		.connect(mongoUriConnection, mongo.options)
		.then(() => console.info('♦♦♦♦♦ Database(mongoDB) connected ♦♦♦♦♦'))
		.catch(error => console.error(`♦♦♦♦♦ Database(mongoDB) error - ${ error.message } ♦♦♦♦♦`));
};