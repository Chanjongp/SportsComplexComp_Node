const db = require('./index');


// Meeting

db.User.hasOne(db.Meeting, {
    'foreignKey' : 'host',
    'onDelete' : 'cascade',
});
db.Meeting.belongsTo(db.User, {
    'foreignKey' : 'host',
});

// Competition

db.User.hasOne(db.Meeting, {
    'foreignKey' : 'host',
    'onDelete' : 'cascade',
});
db.Competition.belongsTo(db.User, {
    'foreignKey' : 'host',
})

db.User.hasMany(db.Meeting, {
    'foreignkey' : 'joined_people',
})

db.Competition.belongsTo(db.User, {
    'foreignKey' : 'joined_people',
})

// Comment

db.User.hasOne(db.Comment, {
    'foreignkey' : 'user',
    'onDelete' : 'cascade',
})

db.Comment.belongsTo(db.User, {
    'foreignkey' : 'user',
})

db.Meeting.hasOne(db.Comment, {
    'foreignkey' : 'meeting',
    'onDelete' : 'cascade',
})

db.Comment.belongsTo(db.Meeting, {
    'foreignkey' : 'meeting'
})
