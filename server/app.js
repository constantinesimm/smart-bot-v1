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
if (process.env.NODE_ENV !== 'production') {
	app.use(cors( { origin: 'http://localhost:8080' }))
	app.use(logger('dev'));
}

/* Secure middleware */
app
	.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }))
	.use(helmet.xssFilter())
	.use(helmet.noSniff());

/* Request body parser middleware */
app
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }));

/* static path */
app.use(express.static(path.join(__dirname, '../dist')));

/* set passport.js authentication */
app.use(passport.initialize());
setPassportAuthStrategy(passport);

/* Router */
setController(app);

/* Error handler */
setErrorHandler(app);

module.exports = app;
