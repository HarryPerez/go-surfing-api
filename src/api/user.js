const express = require('express');
const User = require('../models/user');
const { isUserAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.get('/auth/user', isUserAuthenticated, (req, res) => {
  res.json(req.user);
});

router.post('/auth/user/profile', async (req, res) => {
  const { user, profile } = req.body;
  const { email } = user;

  await User.update(
    { profile },
    { where: { email } }
  );

  res.json(req.user);
});

router.post('/auth/user/location', async (req, res) => {
  const { user, latitude, longitude } = req.body;
  const { email } = user;

  await User.update(
    { latitude, longitude },
    { where: { email } }
  );

  res.json(req.user);
});

module.exports = router;
