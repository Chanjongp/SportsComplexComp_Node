var express = require('express');
var router = express.Router();
var passport = require('passport');
var UserCtrl = require('../controllers/UserCtrl');
var CompetitionCtrl = require('../controllers/CompetitionCtrl');
var CommentCtrl = require('../controllers/CommentCtrl');
var MeetingCtrl = require('../controllers/MeetingCtrl');

//Success Callback
router.get('/', function(req, res) {
    const user = req.user;
    return req.login(user, loginError => {
        if (loginError) {
            console.log(loginError);
            return res.status(401).json({loginError}).end();
        }
        return res.json({ user });
    })
});

//Error Callback
router.get('/error', function(req, res){
    const message = req.flash('message');
    return res.status(401).json({message : message[0]}).end();
});

// Signin
router.post('/login', passport.authenticate('local-signin', 
    {successRedirect : '/',failureRedirect : '/error', failureFlash : true,}));

// Signup
router.post('/signup', passport.authenticate('local-signup', 
    {successRedirect : '/',failureRedirect : '/error', failureFlash : true,}));

router.get('/logout', (req, res) => {
    if(!req.user) {
        return res.status(401).json({"message" : "Not logged in."});
    }
    req.logout();
    return res.status(200).json({"message" : "Logout Success"});
})

module.exports = router;