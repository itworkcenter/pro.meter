var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/meter');
var Schema   = mongoose.Schema;

var userSchema = new Schema({

module.exports = mongoose.model('user', userSchema);