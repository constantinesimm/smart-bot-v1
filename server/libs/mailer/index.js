const nodemailer = require('nodemailer');
const { smtp } = require('../../config');
const { subjectTemplate, letterTemplate } = require('./email-templates');

module.exports = (emailTemplate, emailRecipient, recipientName, mailBodyToken) => {
	return nodemailer.createTransport(smtp).sendMail({
		from: '"Rice - euro-asian food" <noreply@rice-food.com.ua>',
		to: emailRecipient,
		subject: subjectTemplate(emailTemplate),
		html: letterTemplate(emailTemplate, recipientName, mailBodyToken)
	})
};