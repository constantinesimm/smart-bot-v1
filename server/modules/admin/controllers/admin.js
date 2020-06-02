const router = require('express').Router();
const HttpError = require('../../../libs/errors/http-error');
const AdminService = require('../services/admin');
const AdminValidator = require('../../../middleware/validator/admin-validator');
const RouteGuard = require('../../../middleware/route-guard');
const fs = require('fs');
const path = require('path');

router.post('/service/log-data', RouteGuard.isAdmin, AdminValidator.getLogs, (req, res, next) => {
	const logFile = path.join(__dirname, '../logs/access.log');
	
	res.set({ 'Transfer-Encoding': 'chunked', 'Accept-Ranges': 'bytes' });
	
	return fs.createReadStream(logFile).pipe(res);
});

module.exports = router;