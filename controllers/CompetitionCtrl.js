const { request } = require('express');
const db = require('../models');

const compCreate = function(req, res) {
    if(!req.isAuthenticated()){
        return res.status(401).json({ message : "User is not Authenticated" }).end();
    }
    const comp_type = req.body.comp_type; // 경쟁, 챌린지
    const location = req.body.location;
    const category = req.body.category;
    const title = req.body.title;
    const ended_at = req.body.ended_at;
    const max_people = req.body.max_people;
    const host = req.user.id;
    const require_money = req.body.require_money;

    if(!comp_type || !location || !category || !title || !ended_at || !max_people || !require_money){
        return res.status(400).json({message : "Incorrect Json Key"}).end();
    }
    if(isNaN(max_people)){
        return res.status(400).json({message : "max_people has to be number"}).end();
    }
    if(req.user.money < require_money){
        return res.status(400).json({message : "Check your money to join your own competition"}).end();
    }
    db.Competition.create({comp_type, location, category, title, ended_at, max_people, require_money, total_money : 0, host})
        .then(comp => {
            res.status(201).json(comp).end();
        })
        .catch(err => {
            res.status(400).json({err}).end();
        })
}

const compJoin = function(req, res) {
    if(!req.isAuthenticated()){
        return res.status(401).json({ message : "User is not Authenticated" }).end();
    }
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).json({message : "Id is not number"}).end();
    }
    db.Competition.findOne({where : {id}})
        .then(comp => {
            if(!comp){
                return res.status(404).json({ message : 'Competition Object Not Found'});
            }
            comp.total_money += comp.require_money;
        })
}


module.exports = {
    compCreate: compCreate,
    compJoin : compJoin,
}