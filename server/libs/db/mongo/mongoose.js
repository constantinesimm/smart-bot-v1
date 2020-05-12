const mongoose = require('mongoose');
const { uri, options } = require('../../../config').database.mongo;

module.exports = async () => await mongoose.connect(uri.connect(), options);