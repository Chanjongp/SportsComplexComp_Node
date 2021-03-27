const Sequelize = require('sequelize');
const sequelize = new Sequelize('sports_development', 'root', 'ckswhd123~')

const User = sequelize.define('User', {
    email : {
        type : Sequelize.STRING(40),
        unique : true,
    },
    nickname : {
        type : Sequelize.STRING(30),
    },
    
    password : {
        type: Sequelize.STRING(100),
    },
    location : {
        type : Sequelize.STRING(10),
        defaultValue : '서울'
    }

})
