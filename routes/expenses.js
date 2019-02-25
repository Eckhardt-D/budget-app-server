const express = require('express');
const router = express.Router();
const Expense = require('../database/Expense');
const Category = require('../database/Category');

// Get all expenses
router.get('/', (req, res) => {
  Expense
  .find()
  .then(result => res.json(result))
  .catch(() => res.json({ err: 'Not found', msg: 'expense types don\'t exist' }));
});

// Get expense by id
router.get('/:id', (req, res) => {
  Expense
  .findById(req.params.id)
  .then(result => res.json(result))
  .catch(() => res.json({ err: 'Not found', msg: 'expense types don\'t exist' }));
});

// Get expenses by category
router.get('/category', (req, res) => {
  if(!req.query.v) return res.json({err: 'No cat', msg: 'No category specified'});
  let results = [];

  Expense.find({ category: req.query.v }).then(result => {
    for(let i = 0; i < result.length; i++) {
      if(result[i].category === req.query.v) {
        results.push(result[i]);
      }
    }
    return res.json(results);
  });
});

// Create new expense
router.post('/', (req, res) => {
  const expense = req.body;
  const category = expense.category;
  const amount = expense.amount;

  // Waterfall the actions
  Promise.all([
    Expense.create(expense),
    Category.findOne({ name: category })
  ])
  .then(async results => {
    let id = results[1]._id;
    let current = results[1].total;

    await Category.findByIdAndUpdate(id, { total: current + amount });
    return res.json(results[0]);

  })
  .catch(() => res.sendStatus(500));

});

// Edit expense
router.put('/', (req, res) => {
  
  Expense
  .findByIdAndUpdate(req.body._id, req.body)
  .then(result => res.json(result))
  .catch(() => res.sendStatus(500));

});

// Delete expense
router.delete('/:id', (req, res) => {

  Expense
  .findByIdAndDelete(req.body._id)
  .then(result => res.json(result))
  .catch(() => res.sendStatus(500));

});

module.exports = router;