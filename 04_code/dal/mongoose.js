var mongoose = require("mongoose");
var mongooseCfg = require("../configs/database").mongoose;

var db = mongoose.createConnection(mongooseCfg.uri, mongooseCfg.options);

    db.on("error", function(err){
        if(err) throw err;
    })

    db.once("open", function callback(){
        console.log("database connection open.");
    })

module.exports = db;
