
module.exports = ((sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        content : {
            type : DataTypes.STRING(500),
        }
    });

    return Comment;
})