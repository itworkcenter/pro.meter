var express = require('express');
var session = require("express-sessions");
var app = express();
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var path = require("path");
var bodyParser = require('body-parser');
var passport = require("passport");
var cons = require('consolidate');
var port = 8080;

global.passport = passport;

// assign the swig engine to .html files
app.engine('html', cons.swig);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views',  path.join(__dirname + '/views'));
//app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//Static assets
app.use('/assets', express.static("views/assets"));
app.use('/back/assets', express.static("views/back/assets"));

//API service
app.use('/api', require("./routes/apiRoutes"));

//Template  render
app.use(['/','/**.html','/**/'], require("./routes/pageRoutes"));

// Deal with Error
app.use(function(err,req,res,next){
  if(err){
    res.send('Bad Request');
    res.end();
  }else{
    res.status(304).end();
    res.status(404).end();
    res.status(500).end();
  }
  next();
});

app.listen(port);
console.log('Express server listening on port '+port);
