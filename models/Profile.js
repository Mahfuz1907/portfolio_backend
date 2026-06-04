const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  bio: { type: String, default: '' },
  about: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  website: { type: String, default: '' },
  avatar: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
