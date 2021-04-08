const db = require('../models');
const User = require('../models/User');

const meetingCreate = function(req, res) {
    if(!req.isAuthenticated()){
        return res.status(401).json({ message : "User is not Authenticated" });
    }
    title = req.body.title
    find_people = req.body.find_people
    body = req.body.body
    category = req.body.category
    address = req.body.address
    location = req.body.location
    host = req.user.id
    if(!title || !find_people || !body || !category || !address || !location ){
        return res.status(400).json({message : "Incorrect Json Key"});
    }
    db.Meeting.create({title, find_people, body, category, address, location, host})
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