var app = require("express")();
var Account = require("../models/userModel");
var path = require('path');
var passport = require("passport");
var userController = require("../controllers/userController");

//Page deal
function pageDeal(req, res , backJson){
var backName = req.path.match(/\w+/);
var backStr = backName?backName[0]:"index";

  res.render(backStr, backJson);
}

//Authenticate user login
var isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login.html');
};

// Page control
app.get(["/","/index.html"],function(req, res){
  pageDeal(req, res , {
      title: req.user
  })
});

//api page
app.get(["/admin/","/admin/index.html"], isAuthenticated, function(req, res){
  console.log(req.user);
    pageDeal(req, res , {
        title: "Application Component",
        username: req.user.name
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
app.get("/login", function(req, res, next){
    passport.authenticate('local-login', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send({success: "", erro: "No User"});}

        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.send({success: "success", erro: ""});
        });
  })(req, res, next);
});

// redirect path
app.get("/direct-error", function(req, res){
    res.send({error:"error", success:""});
});
app.get("/direct-success", function(req, res){
    res.send({error:"", success:"success"});
});

//login
app.get("/logout", function(req, res){
  req.logout();
  res.redirect('/login.html');
});


module.exports = app;
