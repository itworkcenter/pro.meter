var express = require('express'),
    passport = require('passport'),
    Account = require("../models/userModel"),
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
      title: req.user
  })
});

//login page
app.get(["/api.html"],function(req, res){
    pageDeal(req, res , {
        message:"It's ok."
    })
});

// login controller
app.get("/login",function(req, res){
    userController.checkUser(req, res);
});

//admin
app.get("/admin",passport.authenticate('local', { successRedirect: '/',  failureRedirect: '/login' }));
// app.get("/admin",function(req, res){
//   console.log(passport.authenticate('local', { successRedirect: '/',  failureRedirect: '/login' }));
// });



//Page deal
function pageDeal(req, res , backJson){
var backName = req.path.match(/\w+/);
var backStr = backName?backName[0]:"index";

  res.render(backStr, backJson);
}

module.exports = app;
