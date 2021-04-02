var express = require('express');
var router = express.Router();
var passport = require('passport');
var UserCtrl = require('../controllers/UserCtrl');
var CompetitionCtrl = require('../controllers/CompetitionCtrl');
var CommentCtrl = require('../controllers/CommentCtrl');
var MeetingCtrl = require('../controllers/MeetingCtrl');

router.post('/login', passport.authenticate('local-signin', 
    {successRedirect : '/ ',failureRedirect : '/login', failureFlash : true,}));

router.get('/login', function(req, res){
    const message = req.flash('message');
    console.log(message[0]);
    return res.status(401).json({message : message[0]}).end();
    // return message;
});

router.post('/signup', passport.authenticate('local-signup', 
    {successRedirect : '/ ',failureRedirect : '/signup', failureFlash : true,}));

router.get('/signup', function(req, res){
    const message = req.flash('message');
    console.log(message[0]);
    return res.status(401).json({message : message[0]}).end();
    // return message;
});
module.exports = router;