var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var db = require("../dal/mongoose");

mongoose.Promise = require("bluebird");

var settingsSchema = new Schema({	'webName' : String,	'keywords' : String,	'logoPath' : String,	'introduction' : String,	'webBottom' : String});

module.exports = db.model('settings', settingsSchema);
