const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

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
                // db.User.comparePassword(password, user.password, function(err, isMatch){
                //     if(err) {
                //         return done(err);
                //       }
                //       if(isMatch) {
                //         return done(null, user);
                //       } else {
                //         return done(null, false, { message: 'Invalid password' });
                //       }
                // });
                return done(null, user);
            })
            .catch(err => {
                done(err);
            })
}
)