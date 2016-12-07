var LocalStrategy = require('passport-local').Strategy;
var userModel = require('../models/userModel.js');
var bcrypt = require("bcrypt");

// expose this function to our app using module.exports
module.exports = function(passport){

  // ==============================================
  // Passport session setup
  // ==============================================

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      //console.log("serializeUser");
      done(null, user.id);
  });
  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      // console.log("deserializeUser");
      userModel.findById(id, function(err, user) {
           done(err, user);
      });
  });

  // ==============================================
  // Passport  strategy signup
  // ==============================================
  passport.use("local-login",new LocalStrategy(function(name, pwd, done){

    // console.log("----->local strategy");

      userModel.findOne({name: name}, function(err, user){
        if (err) {
           return done(err);
       }

        if (!user) {
           return done(null, false,{alert: "Incorrect username."})
       }

       if(bcrypt.compareSync(pwd, user.pwd)){
               return done(null, user);
       }else{
               return done(null, false,{alert: "Incorrect password."})
       }

     });

  }));


}
