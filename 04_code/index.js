var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = 8080;

    var promise = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…

      if ( 1===1 /* everything turned out fine */) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });

    promise.then(function( message ) {
      console.log( message );
    },
    function( err ) {
      console.log( err );
    });

console.log(promise);

var routes = require("./routes"),
    pages = require("./routes/pages.js");

// set .html as the default extension
app.set('view engine', 'html');
app.set('views',  __dirname + '/views');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/assets', express.static("views/assets"));
app.use('/back/assets', express.static("views/back/assets"));
//API service
// app.route("/api",routes);
app.use("/api",routes);

//tempalte rander
app.use(['/','/**.html','/**/'], pages);

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
