const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const bcrypt = require('bcrypt-nodejs');

module.exports = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true,
    },
    function(req, email, password, done) {
        db.User.findOne({where : { email }})
            .then(user => {
                if (!user) {
                    console.log("no user");
                    return done(null, false, req.flash("message", 'Incorrect Email.'));
                }
                bcrypt.compare(password, user.password, function(err, isMatch) {
                    if(err) {
                        return done(null, false, req.flash("message", "bcrypt.compare() error."));}
                    if(isMatch) {
                        return done(null, user);
                    }
                    else{ 
                        return done(null, false, req.flash("message", "password incorrect."));
                    }
                })
            })
}
)