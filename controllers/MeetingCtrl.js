const db = require('../models');

const meetingCreate = function(req, res) {
    var object = new db.Meeting(req.body);
    
    db.Meeting.create(object)
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