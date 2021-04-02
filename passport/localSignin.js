const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

module.exports = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true,
    },
    function(req, email, password, done) {
        // console.log(req);
        db.User.findOne({where : { email }}).then(function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, req.flash("message", 'Incorrect Email.'));
            }
            console.log(email);

            if (!user.validPassword(password)) {
                return done(null, false, {message : 'Incorrect Password.'});
            }

            return done(null, user);
        })
    }
    )