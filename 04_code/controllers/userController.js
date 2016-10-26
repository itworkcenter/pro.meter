var userModel = require('../models/userModel.js'),
    bcrypt = require("bcrypt");

const saltRounds = 10;


// public function
function checkUser(json,back){
    userModel.findOne({name: json.name}, function (err, object) {
        if (err) {
           return back({error:"error"});
        }
        if (!object) {
           return back({error:"No find user"});
        }

        if(bcrypt.compareSync(json.pwd, object.pwd)){
                return back({success:"successed",hasUser:true});
        }else{
                return back({error:"Password error!",hasUser:true});
        }
    });
}

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        userModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
     show: function (req, res) {
         var id = req.params.id;
         userModel.findOne({_id: id}, function (err, user) {
             if (err) {
                 return res.status(500).json({
                     message: 'Error when getting user.',
                     error: err
                 });
             }
             if (!user) {
                 return res.status(404).json({
                     message: 'No such user'
                 });
             }
             return res.json(user);
         });
     },
     checkUser: function (req, res) {
         checkUser(req.query,function(json){
             return res.json(json);
         })
     },
    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new userModel({
			name : req.body.name,
			pwd : bcrypt.hashSync(req.body.pwd, saltRounds),
			email : req.body.email,
			tel : req.body.tel,
              gender: req.body.gender
        });


        //post method use req.body by body.parse;
        checkUser(req.body,function(json){
            if(!json.hasUser){
                user.save(function (err, user) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when creating user',
                            error: err
                        });
                    }
                    return res.status(201).json(user);
                });
            }else{
                return res.send("Same username.")
            }
        });

    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.name = req.body.name ? req.body.name : user.name;
			user.pwd = req.body.pwd ? req.body.pwd : user.pwd;
			user.email = req.body.email ? req.body.email : user.email;
			user.tel = req.body.tel ? req.body.tel : user.tel;
			user.gender = req.body.gender ? req.body.gender : user.gender;

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        userModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
