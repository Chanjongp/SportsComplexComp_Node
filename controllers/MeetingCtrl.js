const db = require('../models');
const User = require('../models/User');

const meetingCreate = function(req, res) {
    // if(!req.isAuthenticated()){
    //     return res.status(400).json({ message : "User is not Authenticated" });
    // }
    // const user = req.user;
    // console.log(user.id)
    // var object = new db.Me
    // console.log(object);
    // console.log(object.dataValues);
    const user = db.User.findOne({where : {id : 1}});
    db.Meeting.create({body : "test", host : user})
        .then(meeting => {
            res.status(201).json(meeting);
        })
        .catch(err => {
            res.status(400).json({err});
        })
}

module.exports = {
    meetingCreate : meetingCreate,
}