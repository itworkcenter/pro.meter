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

//login page
app.get(["/api.html"],function(req, res){
    pageDeal(req, res , {
        title:"CRUD"
    })
});

// login controller
app.get("/show",function(req, res){
    userController.checkUser(req, res);
});

// login controller
app.get("/login",function(req, res){
    userController.checkUser(req, res);
});


//admin
app.get("/admin", passport.authenticate('local-login'), function(req, res){
  res.json(req.user);
});


module.exports = app;
