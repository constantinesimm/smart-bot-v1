const nodemailer = require('nodemailer');
const { smtp } = require('../../config');
const { subjectTemplate, emailTemplate } = require('./email-templates');

const transporter = nodemailer.createTransport(smtp);
const noreplyMail = '"Rice - euro-asian food" <noreply@rice-food.com.ua>';

module.exports = {
	transporter,
	options(recipient, template, name, token) {
		return {
			from: noreplyMail,
			to: recipient,
			subject: subjectTemplate(template),
			html: emailTemplate(template, name, token)
		}
	}
};