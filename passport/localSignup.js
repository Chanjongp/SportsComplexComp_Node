const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

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
                db.User.create({email, password})
                    .then(user => {
                        return done(null, user);
                    })
                    .catch(err => {
                        done(err);
                    });
            }

        })
        .catch(err => {
            done(err);
        });    
})