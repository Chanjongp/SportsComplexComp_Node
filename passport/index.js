const db = require('../models');
const signin = require('./localSignin');
const signup = require('./localSignup');

module.exports = passport => {
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ', user.id);
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        db.User.findOne({where : {id}}).then((user) => {
            console.log('deserializing user: ', id);
            done(null, user);
        }).catch(done);
    });

    passport.use('local-signin', signin);
    passport.use('local-signup', signup);
}
