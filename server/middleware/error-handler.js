const HttpError = require('../libs/http-error');

module.exports = (app) => {
	/* catch 404 and forward to error handler */
	app.use((req, res, next) => next(new HttpError(404, `Not Found ${ req.path }`)));
	
	/* Central error handler */
	app.use((error, req, res, next) => {
		if (error.status) return res.status(error.status).json({ message: error.message });
		if (error.errors) return res.status(400).json({ error: { name: error.name, errors: error.errors } });
		
		next(error);
	});
};