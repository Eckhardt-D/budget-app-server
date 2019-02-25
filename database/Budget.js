const mongoose = require('mongoose');

// Budget model
const Budget = mongoose.model('budget', {
  from: Date,
  to: Date,
  amount: Number,
  type: {
    type: String,
    default: 'budget'
  }
});

module.exports = Budget;