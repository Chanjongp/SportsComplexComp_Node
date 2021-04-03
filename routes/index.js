const express = require('express');
const baseRouter = express.Router();

//Success Callback
baseRouter.get('/', function(req, res) {
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
baseRouter.get('/error', function(req, res){
    const message = req.flash('message');
    return res.status(401).json({message : message[0]}).end();
});

module.exports = baseRouter;

