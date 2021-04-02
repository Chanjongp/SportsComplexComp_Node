var express = require('express');
var router = express.Router();
var passport = require('passport');
var UserCtrl = require('../controllers/UserCtrl');
var CompetitionCtrl = require('../controllers/CompetitionCtrl');
var CommentCtrl = require('../controllers/CommentCtrl');
var MeetingCtrl = require('../controllers/MeetingCtrl');

router.post('/login', passport.authenticate('local-signin', 
    {successRedirect : '/ ',failureRedirect : '/login', failureFlash : true,}));

// router.get('/login', function(req, res, next) {
//     passport.authenticate('local', function(err, user, info) {
//         if (err) { return next(err); }
//         if (!user) { return res.redirect('/login'); }
//         req.logIn(user, function(err) {
//         if (err) { return next(err); }
//         return res.redirect('/users/' + user.username);
//         });
//     })(req, res, next);
//     });
router.get('/login', function(req, res){
    const message = req.flash('message');
    console.log(message[0]);
    return res.json({message : message[0]}).status(401).end();
    // return message;
})
module.exports = router;