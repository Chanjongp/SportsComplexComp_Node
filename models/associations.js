const db = require('./index');


// Meeting

db.User.hasOne(db.Meeting, {
    'foreignKey' : 'host',
    'onDelete' : 'cascade',
});
db.Meeting.belongsTo(db.User, {
    'foreignKey' : 'host',
});