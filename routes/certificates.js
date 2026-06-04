const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Certificate = require('../models/Certificate');
const { createUploader } = require('../config/cloudinary');

const upload = createUploader('certificates');

router.get('/', async (req, res) => {
  try {
    const certs = await Certificate.find().populate('category').sort('order');
    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.path;
    const cert = await Certificate.create(data);
    res.status(201).json(await cert.populate('category'));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.path;
    const cert = await Certificate.findByIdAndUpdate(req.params.id, data, { new: true }).populate('category');
    res.json(cert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
