const path = require('path');
if (process.env.NODE_ENV !== 'production') {
	const dotenv = require('dotenv');
	
	dotenv.config({
		path: path.join(__dirname + '/../../.env')
	});
}

module.exports = {
	secretString: process.env.CONTROL_STRING,
	sessionSecretString: process.env.SESSION_CONTROL_STRING,
	appHost: process.env.APP_HOST,
	database: {
		mongo: {
			uri: {
				local: `mongodb://127.0.0.1:27017/${ process.env.DB_NAME }`,
				prod: `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_SECRET }@${ process.env.DB_HOST }/${ process.env.DB_NAME }?retryWrites=true&w=majority`
			},
			options: {
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useFindAndModify: false
			}
		}
	},
	smtp: {
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: false,
		requireTLS: true,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD
		}
	},
	bots: {
		telegram: {
			token: process.env.TELEGRAM_BOT_API,
			appUrl: process.env.APP_HOST
		}
	}
}