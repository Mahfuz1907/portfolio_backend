const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const { createUploader } = require('../config/cloudinary');

const upload = createUploader('avatars');

router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/', auth, upload.single('avatar'), async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();

    const fields = ['name', 'title', 'bio', 'about', 'email', 'phone', 'location', 'github', 'linkedin', 'website'];
    fields.forEach(f => { if (req.body[f] !== undefined) profile[f] = req.body[f]; });

    if (req.file) profile.avatar = req.file.path;

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
