var app = require("express")();
var configs = require("../configs");
var Account = require("../models/userModel");
var path = require('path');
var passport = require("passport");
var userController = require("../controllers/userController");
var settingsController = require("../controllers/settingsController");
var multer = require("multer");
var storage = multer.diskStorage(
    {
        destination: configs.uploadAddress,
        filename: function ( req, file, cb ) {
            //req.body is empty... here is where req.body.new_file_name doesn't exists
            cb( null, file.originalname );
        }
    }
);
var upload = multer({storage: storage});
var bcrypt = require("bcrypt");
const saltRounds = 10;

//Page deal
function pageDeal(req, res , backJson){
var backName = req.path.match(/[\w-\/]+/);
backName = backName.length>0?backName[0]:"index";
backName = backName.replace(/^\//,"");

  res.render(backName, backJson);
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

//Admin page
app.get(["/admin/","/admin/index.html"], isAuthenticated, function(req, res){
  configs.userName = req.user.name;
    pageDeal(req, res , configs)
});
app.get("/admin/admin-part.html", isAuthenticated, function(req, res){
  configs.userName = req.user.name;
    pageDeal(req, res , configs)
});
app.get("/admin/admin-data.html", isAuthenticated, function(req, res){
  configs.userName = req.user.name;
    pageDeal(req, res , configs)
});
app.get("/admin/admin-category.html", isAuthenticated, function(req, res){
  configs.userName = req.user.name;
    pageDeal(req, res , configs)
});
app.get("/admin/admin-article.html", isAuthenticated, function(req, res){
  configs.userName = req.user.name;
    pageDeal(req, res , configs)
});
app.get("/admin/admin-user.html", isAuthenticated, function(req, res){
  configs.userName = req.user.name;
    pageDeal(req, res , configs)
});

// Page controller
app.get("/settings", isAuthenticated, function(req, res){
  console.log(req.query);
  settingsController.update(req, res);
  // configs.userName = req.user.name;
  //   pageDeal(req, res , configs)
});


// upload file
app.post('/upload', upload.array('photos', 12), function (req, res, next) {
  //console.log(req.files);
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  res.send("Uploaded")
})

// login controller
app.get("/show",function(req, res){
    userController.checkUser(req, res);
});

//login page
app.get(["/login.html"],function(req, res){
    pageDeal(req, res , configs)
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
//tools page
app.get(["/tools.html"],function(req, res){
    pageDeal(req, res , {
        title:"Tools"
    })
});
//tools
app.get("/tools.encrypt", function(req, res){
    res.send(bcrypt.hashSync(req.query.code, saltRounds));
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
