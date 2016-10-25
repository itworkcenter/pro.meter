var express = require('express'),
    cons = require('consolidate'),
    path = require('path'),
    app = express();

// assign the swig engine to .html files
app.engine('html', cons.swig);
app.set('view engine', 'html');

// Page control
app.get(["/","/index.html"],function(req, res){
  pageDeal(req, res , {
      title:"Home page"
  })
});

//Page deal
function pageDeal(req, res , backJson){
  var backStr = req.params[0]||"index";
  res.render("index", backJson);
}

module.exports = app;
