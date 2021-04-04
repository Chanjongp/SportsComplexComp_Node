
module.exports = ((sequelize, DataTypes) => {
    const Meeting = sequelize.define('Meeting', {
        location : {
            type : DataTypes.STRING(40),
            defaultValue : '서울',
        },
        title : {
            type : DataTypes.STRING(30),
        },
        
        find_people : {
            type: DataTypes.INTEGER,
        },
        body : {
            type : DataTypes.STRING(500),
        },
        category : {
            type : DataTypes.STRING(30),
        },

        address : {
            type : DataTypes.STRING(50),
            allowNull: true,
        },
        
    })
    return Meeting;
})
