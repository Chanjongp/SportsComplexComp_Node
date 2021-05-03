var express = require('express');
const routes = require('./router');
const compRouter =  express.Router();

const compCtrl = require('../controllers/CompetitionCtrl');

compRouter.post(routes.compCreate, compCtrl.compCreate);
compRouter.put(routes.compJoin, compCtrl.compJoin);


module.exports = compRouter;