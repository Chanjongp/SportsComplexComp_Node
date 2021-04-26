
module.exports = ((sequelize, DataTypes) => {
    const Competition = sequelize.define('Competition', {
        comp_type : {
            type : DataTypes.STRING(20),
        },
        location : {
            type : DataTypes.STRING(20),
        },
        category : {
            type : DataTypes.STRING(20),
        },
        title : {
            type : DataTypes.STRING(30),
        },
        ended_at : {
            type : DataTypes.DATEONLY
            
        },
        max_people : {
            type: DataTypes.INTEGER,
        },
        require_money : {
            type: DataTypes.INTEGER,
        },
        total_money : {
            type: DataTypes.INTEGER,
            defaultvalue : 0
        },
    });
    return Competition;
})