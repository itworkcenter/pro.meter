var app = require("express")();
var Account = require("../models/userModel");
var path = require('path');
var passport = require("passport");
var userController = require("../controllers/userController");

// pass passport for configuration
require("../configs/passport")(passport);

//Page deal
function pageDeal(req, res , backJson){
var backName = req.path.match(/\w+/);
var backStr = backName?backName[0]:"index";

  res.render(backStr, backJson);
}

// Page control
app.get(["/","/index.html"],function(req, res){
  pageDeal(req, res , {
      title: req.user
  })
});

//api page
app.get(["/admin/","/admin/index.html"],function(req, res){
    pageDeal(req, res , {
        title:"CRUD"
    })
});

// login controller
app.get("/show",function(req, res){
    userController.checkUser(req, res);
});

//login page
app.get(["/login.html"],function(req, res){
    pageDeal(req, res , {
        title:"Login"
    })
});
//login
app.get("/login", passport.authenticate('local-login'), function(req, res){
  res.json(req.user);
});

//login
app.get("/logout", function(req, res){
  req.logout();
  res.redirect('/login.html');
});


module.exports = app;
