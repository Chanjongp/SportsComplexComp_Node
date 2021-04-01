var express = require('express');
var router = express.Router();
var passport = require('passport');
var UserCtrl = require('../controllers/UserCtrl');
var CompetitionCtrl = require('../controllers/CompetitionCtrl');
var CommentCtrl = require('../controllers/CommentCtrl');
var MeetingCtrl = require('../controllers/MeetingCtrl');

router.post('/login', passport.authenticate('local', {failureRedirect : '/login', failureFlash : true}), 
    (req, res) => {res.redirect('/home')});