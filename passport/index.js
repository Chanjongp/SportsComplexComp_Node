const signin = require('./localSignin');
const signup = require('./localSignup');

module.exports = passport => {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        })
    });

    passport.use('local-signin', signin, {passReqToCallback : true});
    passport.use('local-signup', signup, {passReqToCallback : true});
}
