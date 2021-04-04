'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// db.User = require('./User')(sequelize, Sequelize);

// module.exports = db;

const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize, Sequelize);
db.Meeting = require('./Meeting')(sequelize, Sequelize);
db.Competition = require('./Competition')(sequelize, Sequelize);
db.Comment = require('./Comment')(sequelize, Sequelize);

// Meeting

db.User.hasOne(db.Meeting, {
  'foreignKey' : 'host',
  'onDelete' : 'cascade',
});
db.Meeting.belongsTo(db.User, {
  'foreignKey' : 'host',
});

// Competition

db.User.hasOne(db.Competition, {
  'foreignKey' : 'host',
  'onDelete' : 'cascade',
});
db.Competition.belongsTo(db.User, {
  'foreignKey' : 'host',
})

db.User.hasMany(db.Competition, {
  'foreignKey' : 'joined_people',
});

db.Competition.belongsTo(db.User, {
  'foreignKey' : 'joined_people',
})

// Comment

db.User.hasOne(db.Comment, {
  'foreignKey' : 'user',
  'onDelete' : 'cascade',
});

db.Comment.belongsTo(db.User, {
  'foreignKey' : 'user',
});

db.Meeting.hasOne(db.Comment, {
  'foreignKey' : 'meeting',
  'onDelete' : 'cascade',
});

db.Comment.belongsTo(db.Meeting, {
  'foreignKey' : 'meeting'
});



module.exports = db;