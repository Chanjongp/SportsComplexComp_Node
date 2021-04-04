// const db = require('./index');

// // Meeting

// db.User.hasOne(db.Meeting, {
//     'foreignKey' : 'host',
//     'onDelete' : 'cascade',
// });
// db.Meeting.belongsTo(db.User, {
//     'foreignKey' : 'host',
// });

// // Competition

// db.User.hasOne(db.Competition, {
//     'foreignKey' : 'host',
//     'onDelete' : 'cascade',
// });
// db.Competition.belongsTo(db.User, {
//     'foreignKey' : 'host',
// })

// db.User.hasMany(db.Competition, {
//     'foreignkey' : 'joined_people',
// })

// db.Competition.belongsTo(db.User, {
//     'foreignKey' : 'joined_people',
// })

// // Comment

// db.User.hasOne(db.Comment, {
//     'foreignkey' : 'user',
//     'onDelete' : 'cascade',
// })

// db.Comment.belongsTo(db.User, {
//     'foreignKey' : 'user',
// })

// db.Meeting.hasOne(db.Comment, {
//     'foreignKey' : 'meeting',
//     'onDelete' : 'cascade',
// })

// db.Comment.belongsTo(db.Meeting, {
//     'foreignKey' : 'meeting'
// })
