var express = require('express');
var userRouter = express.Router();
var passport = require('passport');


//Success Callback
userRouter.get('/', function(req, res) {
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
userRouter.get('/error', function(req, res){
    const message = req.flash('message');
    return res.status(401).json({message : message[0]}).end();
});

// Signin
userRouter.post('/login', passport.authenticate('local-signin', 
    {successRedirect : '/',failureRedirect : '/error', failureFlash : true,}));

// Signup
userRouter.post('/signup', passport.authenticate('local-signup', 
    {successRedirect : '/',failureRedirect : '/error', failureFlash : true,}));

userRouter.get('/logout', (req, res) => {
    if(!req.user) {
        return res.status(401).json({"message" : "Not logged in."});
    }
    req.logout();
    return res.status(200).json({"message" : "Logout Success"});
})



module.exports = userRouter;