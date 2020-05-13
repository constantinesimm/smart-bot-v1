const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const logger = require('morgan');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

/* Libraries */
const connectMongoDB = require('./libs/database/mongoose');
const setPassportAuthStrategy = require('./libs/authenticate/passport');

/* Middleware */
const setController = require('./controller');
const setErrorHandler = require('./middleware/error-handler');

/* connect database */
connectMongoDB();

const app = express();

/* NODE_ENV=dev middleware */
if (process.env.NODE_ENV === 'dev') {
	app
		.use(cors( { origin: 'http://localhost:8080' }))
		.use(logger('dev'));
}

/* Secure middleware */
app
	.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }))
	.use(helmet.xssFilter())
	.use(helmet.noSniff())
	.use(passport.initialize());

/* Request body parser middleware */
app
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }));

/* Static paths and files */
app
	.use(express.static(path.join(__dirname, 'dist')))
	.use(express.static(path.join(__dirname, 'public')))
	.get('*', (req, res) => res.sendFile('index.html', { root: 'dist'}));

/* set passport.js authentication */
setPassportAuthStrategy(passport);

/* Router */
setController(app);

/* Error handler */
setErrorHandler(app);

module.exports = app;
