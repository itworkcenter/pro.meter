var LocalStrategy = require("passport-local").Strategy,
    userModel = require('../models/userModel.js'),
    bcrypt = require("bcrypt");

// expose this function to our app using module.exports
module.exports = function(){
  //console.log("passport strategy");

  // ==============================================
  // Passport session setup
  // ==============================================

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });
  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
           done(err, user);
      });
  });

  // ==============================================
  // Passport  strategy signup
  // ==============================================
console.log("passport use");
  passport.use("local-login",new LocalStrategy(function(name, pwd, done){
    console.log("local strategy");

      userModel.findOne({name: name}, function(err, user){

        if (!err) {
           return done(err);
       }

        if (!user) {
           return one(null, fasle,{alert: "Incorrect username."})
       }

       if(bcrypt.compareSync(pwd, user.pwd)){
               return done(null, user);
       }else{
               return one(null, fasle,{alert: "Incorrect password."})
       }

     });

  }));


}
