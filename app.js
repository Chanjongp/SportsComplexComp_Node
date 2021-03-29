const express = require('express');
const { sequelize } = require('./models');
const associations = require('./models/associations');
const app = express();
// sequelize.sync()


// app.use(associations);
app.use(express.json())
app.listen(3000, () => {
    console.log('Server is running on 3000 port');
    sequelize.sync();
});

module.exports = app;
