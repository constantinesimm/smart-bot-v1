const helmet = require('helmet');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

/* Libraries */
const connectMongoDB = require('./libs/database/mongoose');
const setPassportAuthStrategy = require('./libs/authenticate/passport');

/* Middleware */
const setHttpLogger = require('./middleware/http-logger');
const setController = require('./controller');
const setErrorHandler = require('./middleware/error-handler');

/* connect database */
connectMongoDB();

const app = express();

/* NODE_ENV=development middleware */
if (process.env.NODE_ENV === 'development') {
	const cors = require('cors');
	app.use(cors({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
		'Access-Control-Allow-Methods': 'POST, OPTIONS'
	}));
}

/* Http logger middleware */
setHttpLogger(app);

/* Secure middleware */
app
	.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }))
	.use(helmet.xssFilter())
	.use(helmet.noSniff());

/* Request body parser middleware */
app
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }));

/* set passport.js authentication */
app.use(passport.initialize());
setPassportAuthStrategy(passport);

/* Router */
setController(app);

/* Error handler */
setErrorHandler(app);

module.exports = app;
