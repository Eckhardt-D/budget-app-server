const mongoose = require('mongoose');

// Expense model
const Expense = mongoose.model('expense', {
  name: String,
  type: {
    type: String,
    default: 'expense'
  },
  category: String,
  amount: Number,
  created: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Expense;