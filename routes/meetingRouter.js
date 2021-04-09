var express = require('express');
const routes = require('./router');
const meetingRouter =  express.Router();

const meetingCtrl = require('../controllers/MeetingCtrl');

meetingRouter.post(routes.meetingCreate, meetingCtrl.meetingCreate);

meetingRouter.put(routes.meetingUpdate, meetingCtrl.meetingUpdate);

module.exports = meetingRouter;
