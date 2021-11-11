const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/auth/user', (req, res) => {
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

router.get('/auth/user/surfers', async (req, res) => {
  const allSurfers = await User.findAll(
    { where: { profile: 'surfer' } }
  );
  res.json(allSurfers);
});

router.get('/auth/user/coaches', async (req, res) => {
  const allSurfers = await User.findAll(
    { where: { profile: 'coach' } }
  );
  res.json(allSurfers);
});

router.post('/auth/user/extrainfo', async (req, res) => {
  const {
    user, phone, description, profile
  } = req.body;
  const { email } = user;

  await User.update(
    { phone, description, profile },
    { where: { email } }
  );

  res.json(user);
});

module.exports = router;
