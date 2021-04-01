const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = passport => {
    passport.use(new LocalStrategy(
        function(email, password, done) {
            User.findOne({ email }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, {message : 'Incorrect Email.'});
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {message : 'Incorrect Password.'});
                }

                return done(null, user);
            })
        }
    ))
}