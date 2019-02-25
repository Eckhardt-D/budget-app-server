const mongoose = require('mongoose');

// Admin model
const Admin = mongoose.model('admin', {
  username: String,
  password: String
});

module.exports = Admin