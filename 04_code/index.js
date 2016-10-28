var express = require('express'),
    session = require("express-sessions"),
    bodyParser = require('body-parser'),
    passport = require("passport"),
    app = express(),
    port = 8080;

var apiRoutes = require("./routes/apiRoutes"),
    pageRoutes = require("./routes/pageRoutes.js"),
    authRoutes = require("./routes/authRoutes.js");

// Set .html as the default extension
app.set('view engine', 'html');
app.set('views',  __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());
//Static assets
app.use('/assets', express.static("views/assets"));
app.use('/back/assets', express.static("views/back/assets"));

//Authenticate
app.use(authRoutes);

//API service
app.use("/api",apiRoutes);

//Tempalte rander
app.use(['/','/**.html','/**/'], pageRoutes);

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
