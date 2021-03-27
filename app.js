const sequelize = require('./models/index');
const express = require('express');
const app = express();
sequelize.sync();

// app.use(express.json())
// app.listen(3000, () => {
//     console.log('Server is running on 3000 port');
// });

module.exports = app;
