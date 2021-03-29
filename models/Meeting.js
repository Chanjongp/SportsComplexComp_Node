const Sequelize = require('sequelize');
const User = require('./User');

module.exports = ((sequelize, DataTypes) => {
    const Meeting = sequelize.define('Meeting', {
        location : {
            type : Sequelize.STRING(40),
            unique : true,
        },
        title : {
            type : Sequelize.STRING(30),
            allowNull: true,
        },
        
        find_people : {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        body : {
            type : Sequelize.STRING(500),
            defaultValue : '서울',
            allowNull: true,
        },
        category : {
            type : Sequelize.STRING(30),
            allowNull: true,
        },

        address : {
            type : Sequelize.STRING(50)
        },
        
    })
    return Meeting;
})