var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var categorySchema = new Schema({

module.exports = mongoose.model('category', categorySchema);