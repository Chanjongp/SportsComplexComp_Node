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

    // passport.serializeUser(function(user, done) {
    //     done(null, user.id);
    //   });
      
    //   // from the user id, figure out who the user is...
    //   passport.deserializeUser(function(userId, done){
    //     models.User
    //       .find({ where: { id: userId } })
    //       .then(function(user){
    //         done(null, user);
    //       }).catch(function(err){
    //         done(err, null);
    //       });
    //   });

    passport.use('local-signin', signin);
    passport.use('local-signup', signup);
}
