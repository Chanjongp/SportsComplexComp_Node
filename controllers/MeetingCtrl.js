const db = require('../models');
const User = require('../models/User');
const { meeting } = require('../routes/router');

const meetingCreate = function(req, res) {
    if(!req.isAuthenticated()){
        return res.status(401).json({ message : "User is not Authenticated" }).end();
    }
    const title = req.body.title
    const find_people = req.body.find_people
    const body = req.body.body
    const category = req.body.category
    const address = req.body.address
    const location = req.body.location
    const host = req.user.id
    // const host = 1
    if(!title || !find_people || !body || !category || !address || !location ){
        return res.status(400).json({message : "Incorrect Json Key"}).end();
    }
    if(isNaN(find_people)){
        return res.status(400).json({message : "find_people has to be number"}).end()
    }
    db.Meeting.create({title, find_people, body, category, address, location, host})
        .then(meeting => {
            res.status(201).json(meeting).end();
        })
        .catch(err => {
            res.status(400).json({err}).end();
        })
}

const meetingUpdate = function(req, res) {
    if(!req.isAuthenticated()){
        return res.status(401).json({ message : "User is not Authenticated" }).end();
    }
    const host = req.user.id;
    const title = req.body.title
    const find_people = req.body.find_people
    const body = req.body.body
    const category = req.body.category
    const address = req.body.address
    const location = req.body.location
    const meeting_id =  req.body.meeting_id;
    if(!meeting_id){
        return res.status(400).json({message : "no meeting_id in JSON key"}).end();
    } 
    db.Meeting.findOne({where : {id: meeting_id}})
        .then(meeting => {
            if(!meeting) {
                return res.status(404).json({message : "Meeting Object Not Found"}).end();
            }
            if(meeting.host != host){
                return res.status(401).json({message : "Meeting Host and User is not matched"})
            }
            if(title) { meeting.title = title; }
            if(find_people) { meeting.find_people = find_people }
            if(body) { meeting.body = body; }
            if(category) { meeting.category = category; }
            if(address) { meeting.address = address; }
            if(location) { meeting.location = location }
            meeting.save()
                .then(_ => {
                    res.json(meeting);
                })
                .catch(err => {
                    return res.status(409).json({message : err.message}).end();
                })
        })
        .catch(err => {
            res.status(400).json({message : err.message}).end();
        })
}

const meetingDelete = function(req, res) {
    if(!req.isAuthenticated()){
        return res.status(401).json({ message : "User is not Authenticated" }).end();
    }
    const host = req.user.id;
    const meeting_id = req.body.meeting_id;
    if(!meeting_id){
        return res.status(400).json({message : "no meeting_id in JSON key"}).end();
    }
    db.Meeting.findOne({where : {id : meeting_id}})
        .then(meeting => {
            if(meeting.host !== host){
                return res.status(400).json({message : "host not matching"})
            }
            meeting.destroy(); 
            res.status(200).json({message : "Delete Success!"})
            
        })
        .catch(err => {
            res.status(400).json({message : err.message}).end();
        })
    // db.Meeting.destroy({where : {id: meeting_id}})
    //     .then(() => {
    //         if(){
    //             return res.status(400).json({message : "host not matching"}).end();
    //         }
    //         res.status(200).json({message : "Delete Success"}).end();
    //     })
    //     .catch(err => {
    //         res.status(400).json({message : err.message}).end();
    //     })
}

const meetingAll = function(req, res) {
    db.Meeting.findAll()
        .then(meetings => {
            res.status(200).json(meetings).end();
        })
        .catch(err => {
            res.status(400).json({message : err.message}).end();
        })
}

const meetingDetail = function(req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).json({message : "Id is not number"}).end();
    }
    db.Meeting.findOne({where : {id}})
        .then(meeting => {
            res.status(200).json(meeting).end();
        })
        .catch(err => {
            res.status(400).json({message : err.message}).end();
        })
}

module.exports = {
    meetingCreate : meetingCreate,
    meetingUpdate : meetingUpdate,
    meetingDelete : meetingDelete,
    meetingAll : meetingAll,
    meetingDetail : meetingDetail,
}