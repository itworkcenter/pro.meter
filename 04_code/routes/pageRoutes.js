var express = require('express'),
    cons = require('consolidate'),
    path = require('path'),
    app = express();

var userController = require("../controllers/userController");

// assign the swig engine to .html files
app.engine('html', cons.swig);
app.set('view engine', 'html');

// Page control
app.get(["/","/index.html"],function(req, res){
  pageDeal(req, res , {
      title:"Home page"
  })
});

app.get(["/login.html"],function(req, res){
    pageDeal(req, res , {
        title:"Home page"
    })
});
app.get(["/login"],function(req, res){
    userController.checkUser(req, res);
});


//Page deal
function pageDeal(req, res , backJson){
var backName = req.path.match(/\w+/);

var backStr = backName?backName[0]:"index";

  res.render(backStr, backJson);
}

module.exports = app;
