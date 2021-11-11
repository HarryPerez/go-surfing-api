const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const cookieSession = require('cookie-session');
const Session = require('express-session');

require('./auth/passport');
require('./auth/passportGoogleSSO');

require('./models/user');

const passport = require('passport');
const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ALLOWED_ORIGIN, credentials: true }));
app.use(express.json());

/*
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
*/

try {
  app.use(
    Session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false
    })
  )
  console.log("Sessions successfully initialized!");
} catch (err) {
  console.log(`Error setting up a mongo session store! `);
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
