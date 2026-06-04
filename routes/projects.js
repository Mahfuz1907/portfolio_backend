const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const { createUploader } = require('../config/cloudinary');

const upload = createUploader('projects');

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('category').sort('order');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.body.technologies) data.technologies = JSON.parse(req.body.technologies);
    if (req.file) data.image = req.file.path;
    const project = await Project.create(data);
    res.status(201).json(await project.populate('category'));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.body.technologies) data.technologies = JSON.parse(req.body.technologies);
    if (req.file) data.image = req.file.path;
    const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true }).populate('category');
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
