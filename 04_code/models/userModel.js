var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/meter');

var userSchema = new Schema({	'name' : String,	'pwd' : String,	'email' : String,	'limit': String,	'tel' : String,	'gender' : String});

module.exports = mongoose.model('user', userSchema);
