const Sequelize = require('sequelize');

module.exports = ((sequelize, DataTypes) => {
    const Competition = sequelize.define('Competition', {
        comp_type : {
            type : Sequelize.STRING(20),
        },
        location : {
            type : Sequelize.STRING(20),
        },
        category : {
            type : Sequelize.STRING(20),
        },
        title : {
            type : Sequelize.STRING(30),
        },
        ended_at : {
            type : Sequelize.DATE(),
            
        },
        max_people : {
            type: Sequelize.INTEGER,
        },
        require_money : {
            type: Sequelize.INTEGER,
        },
        total_money : {
            type: Sequelize.INTEGER,
            defaultvalue : 0
        },
    });
    return Competition;
})