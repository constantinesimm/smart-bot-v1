const fs = require('fs');
const path = require('path');
const httpLogger = require('morgan');

const logFormat = '[:date[clf]] > :status > :method > :url > :response-time > authToken(:req[authorization]) > :referrer > :user-agent\n';
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' });
const skipServiceUrl = (req, res) => {
	let url = req.url;
	if (url.indexOf('?') > 0) url = url.substr(0, url.indexOf('?'));
	
	return !!url.match(/(css|fonts|img|js)$/ig);
};

module.exports = app => {
	if (process.env.NODE_ENV === 'production') app.use(httpLogger(logFormat, { skip: skipServiceUrl, stream: accessLogStream }));
	else app.use(httpLogger('dev', { skip: skipServiceUrl }));
};
