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
    }, 
    //option
    {
        classMethods : {
            comparePassword : function(password, hash, callback) {
                bcrypt.compare(password, hash, function(err, isMAtch) {
                    if(err) {
                        return callback(err, null);
                    } else {
                        callback(null, isMAtch);
                    }
                });
            }
        }
    });
    return User;
});