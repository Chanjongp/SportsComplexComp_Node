const db = require('./models');

module.exports = () => {
    return db.sequelize.sync({force : true});
}