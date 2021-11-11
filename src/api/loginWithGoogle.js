const express = require('express');
const passport = require('passport');
require('dotenv').config();

const router = express.Router();

const successLoginUrl = `${process.env.REACT_FRONTEND_URL}/login/success`;
const errorLoginUrl = `${process.env.REACT_FRONTEND_URL}/login/error`;

router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email', 'phone', 'https://www.googleapis.com/auth/user.phonenumbers.read'] })
);

// After login or whatever the callback call thiss
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Cannot login to Google, please try again later!',
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (req, res) => {
    console.log('User: ', req.user);
    res.send('Thank you for signing in!');
  }
);

module.exports = router;
