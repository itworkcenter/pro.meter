var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var db = require("../dal/mongoose");

var userSchema = new Schema({
	'name' : String,
	'pwd' : String,
	'email' : String,
	'limit': String,
	'tel' : String,
	'gender' : String
});

module.exports = db.model('user', userSchema);
