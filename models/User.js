const bcrypt = require('bcrypt-nodejs');

module.exports = ((sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email : {
            type : DataTypes.STRING(40),
            unique : true,
        },
        nickname : {
            type : DataTypes.STRING(30),
        },
        password : {
            type: DataTypes.STRING(100),
        },
        location : {
            type : DataTypes.STRING(10),
            defaultValue : '서울'
        }
    }, );
    return User;
});