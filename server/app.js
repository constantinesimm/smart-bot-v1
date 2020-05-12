const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const express = require('express');
const database = require('./libs/db/mongo/mongoose');
const bodyParser = require('body-parser');
const { HttpError } = require('./middleware');
const setRouter = require('./controllers');

const app = express();

database()
	.then(() => console.log('Application Database(mongoDB) connected'))
	.catch(error => console.log(`Application Database(mongoDB) connection error - ${ error }`));


if (process.env.NODE_ENV !== ' production') {
	app
		.use(cors( { origin: 'http://localhost:8080' }))
		.use(logger('dev'));
}

/**
 * Request body parser middleware
 */
app
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }));

/**
 * App static paths and files
 */
app
	.use(express.static(path.join(__dirname, 'dist')))
	.use(express.static(path.join(__dirname, 'public')))
	.get('*', (req, res) => res.sendFile('index.html', { root: 'dist'}));


/**
 * App router
 */
setRouter(app);

/**
 * Error handlers
 * 404 error handler
 * App main error handler
 */
app.use((req, res, next) => {
	let error = new HttpError(404, `Not Found ${ req.path }`);
	
	next(error);
});

app.use((error, req, res, next) => {
	if (error.status) res.status(error.status).json({ message: error.message });
	if (error.errors) res.status(400).json({ error: { name: error.name, errors: error.errors } });
	
	next(error);
});
module.exports = app;
