var express = require('express');
var router = express.Router();
var passport = require('passport');
var UserCtrl = require('../controllers/UserCtrl');
var CompetitionCtrl = require('../controllers/CompetitionCtrl');
var CommentCtrl = require('../controllers/CommentCtrl');
var MeetingCtrl = require('../controllers/MeetingCtrl');

router.get('/%20', function(req, res) {
	const id = req.user;
	return res.status(201).json({id}).end();
});

router.post('/login', passport.authenticate('local-signin', 
    {successRedirect : '/ ',failureRedirect : '/error', failureFlash : true,}));

router.get('/error', function(req, res){
    const message = req.flash('message');
    console.log("!2312312");
    // console.log(message[0]);
    return res.status(401).json({message : message[0]}).end();
    // return message;
});

// router.get('/login', function(req, res, next) {
//     passport.authenticate('local-signin', function(err, user, info) {
//       if (err) { return next(err); }
//       if (!user) { return res.redirect('/login'); }
//       req.logIn(user, function(err) {
//         if (err) { return next(err); }
//         return res.redirect('/users/' + user.username);
//       });
//     })(req, res, next);
//   });


router.post('/signup', passport.authenticate('local-signup', 
    {successRedirect : '/ ',failureRedirect : '/error', failureFlash : true,}));

router.get('/signup', function(req, res){
    const message = req.flash('message');
    console.log(message[0]);
    return res.status(401).json({message : message[0]}).end();
    // return message;
});


module.exports = router;