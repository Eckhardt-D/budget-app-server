const express = require('express');
const router = express.Router();
const Budget = require('../database/Budget');

// Get All budgets
router.get('/', (req, res) => {
  
  Budget
  .find()
  .then(result => res.json(result))
  .catch(() => res.sendStatus(500));

});

// Get budget by id and type
router.get('/:id', (req, res) => {
  
  Budget
  .findById(req.params.id)
  .then(result => res.json(result))
  .catch(() => res.sendStatus(500));
  
});

// Create new budget
router.post('/', (req, res) => {

  // Only one budget should exist
  Budget.deleteMany({}).then(() => {

    // Overwrite
    Budget
    .create(req.body)
    .then(result => res.json(result))
    .catch(() => res.sendStatus(500));

  })
  .catch(e => res.status(500).send('Error overwriting'));

});

// Edit budget
router.put('/:id', (req, res) => {
  
  Budget
  .findByIdAndUpdate(req.params.id, req.body)
  .then(result => res.json(result))
  .catch(() => res.sendStatus(500));

});

// Delete Budget
router.delete('/:id', (req, res) => {
  
  Budget
  .findByIdAndDelete(req.params.id)
  .then(result => res.json(result))
  .catch(() => res.sendStatus(500));

});


module.exports = router