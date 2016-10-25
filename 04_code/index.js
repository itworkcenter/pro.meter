var express = require('express'),
    //cons = require('consolidate'),
    app = express(),
    port = 8080;

var routes = require("./routes"),
    pages = require("./routes/pages.js");

// assign the swig engine to .html files
//app.engine('html', cons.swig);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views',  __dirname + '/views');

//API service
app.get("/api/*",routes);

//tempalte rander
app.get(['/','/**.html','/**/'], pages);

app.use(function(err,req,res,next){
    console.log(err);
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
