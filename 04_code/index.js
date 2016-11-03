var express = require('express'),
    session = require("express-sessions"),
    logger = require("morgan"),
    cookieParser = require("cookie-parser");
    path = require("path"),
    bodyParser = require('body-parser'),
    app = express(),
    port = 8080;

// set .html as the default extension
app.set('view engine', 'html');
app.set('views',  path.join(__dirname + '/views'));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

//Static assets
app.use('/assets', express.static("views/assets"));
app.use('/back/assets', express.static("views/back/assets"));

// Authenticate
app.use(require("./routes/authRoutes"));

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
