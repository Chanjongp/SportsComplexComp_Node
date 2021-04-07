const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const bcrypt = require('bcrypt-nodejs');

bcrypt.genSalt(20, function(err, result) {
    if(err){
        
    }
})

module.exports = new LocalStrategy ({
    usernameField : "email",
    passwordField : "password",
    passReqToCallback : true,

}, function(req, email, password, done) {
    db.User.findOne({where : {email}})
        .then(user => {
            if (user) {
                return done(null, false, req.flash("message", "User already exists"));
            } else {
                bcrypt.genSalt(10, function(err, salt) {
                    if(err) {console.log("bcrypt.genSalt() error : ", err.message)}
                    else{
                        bcrypt.hash(password, salt, null, function(err, passwordhash) { // 10 is salt
                            if(err) {console.log('bcrypt.has() error :', err.message); }
                            else {
                                console.log(passwordhash);
                                db.User.create({email, password : passwordhash})
                                .then(user => {
                                    return done(null, user);
                                })
                                .catch(err => {
                                    done(err);
                                });
                            }
                        })
                    }
                })
            }
        })
        .catch(err => {
            done(err);
        });    
})