const express = require('express');
const session = require('express-session');
const { sequelize } = require('./models');
const passport = require('passport');
const passportConfig = require('./passport');
const app = express();
const flash = require('connect-flash');
const meetingRouter = require('./routes/meetingRouter');
const compRouter = require('./routes/competitionRouter');
const userRouter = require('./routes/userRouter');
// const baseRouter = require('./routes');
const routes = require('./routes/router');

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

app.use(routes.comp, compRouter);
app.use(routes.meeting, meetingRouter);
app.use(routes.user, userRouter);
// app.use(routes.home, baseRouter);
passportConfig(passport);

module.exports = app;