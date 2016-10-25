var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var categorySchema = new Schema({	'name' : String,	'type' : String,	'pId' : Number});

module.exports = mongoose.model('category', categorySchema);
