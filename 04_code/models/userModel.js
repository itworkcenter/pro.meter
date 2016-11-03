var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var db = require("../dal/mongoose");

mongoose.Promise = require("bluebird");
//passport
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
	'name' : String,
	'pwd' : String,
	'email' : String,
	'limit': String,
	'tel' : String,
	'gender' : String
});
//passport
Account.plugin(passportLocalMongoose);

module.exports = db.model('user', userSchema);
