var express = require('express');
const routes = require('./router');
const compRouter =  express.Router();

const compCtrl = require('../controllers/CompetitionCtrl');

compRouter.post(routes.compCreate, compCtrl.compCreate);

module.exports = compRouter;