const Sequelize = require('sequelize');

module.exports = ((sequelize, DataTypes) => {
    const Meeting = sequelize.define('Meeting', {
        location : {
            type : Sequelize.STRING(40),
        },
        title : {
            type : Sequelize.STRING(30),
        },
        
        find_people : {
            type: Sequelize.INTEGER,
        },
        body : {
            type : Sequelize.STRING(500),
            defaultValue : '서울',
        },
        category : {
            type : Sequelize.STRING(30),
        },

        address : {
            type : Sequelize.STRING(50),
            allowNull: true,
        },
        
    })
    return Meeting;
})