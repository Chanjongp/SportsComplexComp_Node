const express = require('express');
const session = require('express-session');
const { sequelize } = require('./models');
const passport = require('passport');
const passportConfig = require('./passport');
const routes = require('./routes');
const app = express();
// sequelize.sync()

const flash = require('connect-flash');
// app.use(associations);
app.use(                                 // 기본적인 세션설정
    session({
      resave: false,
      saveUninitialized: false,
      secret: "awda231dasd",
      cookie: {
        httpOnly: true,
        secure: false
      }
    })
  );
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(routes);
passportConfig(passport);

app.listen(3000, () => {
    console.log('Server is running on 3000 port');
    sequelize.sync();
});

module.exports = app;