const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

module.exports = new LocalStrategy ({
    usernameField : "email",
    passwordField : "password",
    passReqToCallback : true,

}, function(req, email, password, done) {
    db.User.findOne({where : {email}})
        .then(function(err, user) {
            if (err) { return done(err); }
            if (user) {
                return done(null, false, req.flash("message", "User already exists"));
            } else {
                db.User.create({email, password})
                    .then(function(err, user) {
                        if (err) { return done(err); }
                        return done(null, user);
                });
            }

        });    
})