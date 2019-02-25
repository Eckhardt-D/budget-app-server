const mongoose = require('mongoose');

// Category model
const Category = mongoose.model('category', {
  name: String,
  type: {
    type: String,
    default: 'category'
  },
  total: Number
});

module.exports = Category;