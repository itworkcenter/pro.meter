var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var articleSchema = new Schema({	'title' : String,	'auther' : String,	'content' : String,	'type' : Number,	'create_time' : Date,	'update_time' : Date});

module.exports = mongoose.model('article', articleSchema);
