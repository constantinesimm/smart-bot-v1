const HttpError = require('../libs/errors/http-error');

module.exports = (app) => {
	/* catch 404 and forward to error handler */
	app.use((req, res, next) => next(new HttpError(404, `Not Found ${ req.path }`)));
	
	/* Central error handler */
	app.use((error, req, res, next) => {
		
		if (error.errors) return res.status(error.status).json({ name: error.name, message: error.message, errors: error.errors })
		if (error.status) return res.status(error.status).json({ message: error.message });
		
		next(error);
	});
};