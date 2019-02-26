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

    await Category.findByIdAndUpdate(id, { total: parseFloat(current) + parseFloat(amount) });
    return res.json(results[0]);

  })
  .catch(e => res.sendStatus(500));

});

// Edit expense
router.put('/:id', async (req, res) => {
  
  try {

    const expense    = await Expense.findById(req.params.id);
    const difference = parseFloat(expense.amount) - parseFloat(req.body.amount);
    const category   = await Category.findOne({ name: expense.category });
    const newTotal   = parseFloat(category.total) - difference;
    
    await Expense.findByIdAndUpdate(req.params.id, req.body);
    await Category.findOneAndUpdate({ name: expense.category }, { total: newTotal });
    return res.status(200).send({msg: 'Succesfully updated expense and related category'});

  } catch(e) {

    res.status(500).send(e)

  }

});

// Delete expense
router.delete('/:id', async (req, res) => {

  try {

    const expense    = await Expense.findByIdAndDelete(req.params.id);
    const category   = await Category.findOne({ name: expense.category });
    const newTotal   = parseFloat(category.total) - parseFloat(expense.amount)
    
    await Category.findOneAndUpdate({ name: expense.category }, { total: newTotal });
    return res.status(200).send({msg: 'Succesfully deleted expense and updated related category'});

  } catch(e) {

    res.status(500).send(e)

  }

});

module.exports = router;