var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/meter');
var Schema   = mongoose.Schema;

var userSchema = new Schema({	'name' : String,	'pwd' : String,	'email' : String,	'tel' : String,	'gender' : String});

module.exports = mongoose.model('user', userSchema);
