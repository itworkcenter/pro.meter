var app = require("express")();
var Account = require("../models/userModel");
var path = require('path');
var userController = require("../controllers/userController");

// pass passport for configuration
// require("../configs/passport");

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
        message:"It's ok."
    })
});

// login controller
app.get("/show",function(req, res){
  console.log("--->/show");
    userController.checkUser(req, res);
});

// login controller
app.get("/login",function(req, res){
  console.log("--->/login");
    userController.checkUser(req, res);
});


//admin
app.get("/admin",passport.authenticate('local-login', { successRedirect: '/',  failureRedirect: '/login' }));
// app.get("/admin",function(req, res){
//   console.log(passport.authenticate('local', { successRedirect: '/',  failureRedirect: '/login' }));
// });




module.exports = app;
