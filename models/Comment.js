const Sequelize = require('sequelize');

module.exports = ((sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        content : {
            type : Sequelize.STRING(500),
        }
    });

    return Comment;
})