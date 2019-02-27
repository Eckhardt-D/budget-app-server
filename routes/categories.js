const express = require('express');
const router = express.Router();
const Category = require('../database/Category');

// Get all expense categories
router.get('/', (req, res) => {

  Category
  .find()
  .then(result => res.json(result))
  .catch(() => res.sendStatus(500));

});

// Get specific category
router.get('/:id', (req, res) => {

  Category
  .findById(req.body._id)
  .then(result => res.json(result))
  .catch(() => res.sendStatus(500));

});

// Create new category (Currently only internal)
router.post('/', (req, res) => {

  Category
  .create(req.body)
  .then(result => res.json(result))
  .catch(() => res.sendStatus(500));

});

// Edit category
router.put('/:id', (req, res) => {
  
  Category
  .findByIdAndUpdate(req.params.id)
  .then(result => res.json(result))
  .catch(() => res.sendStatus(500));

});

// Delete category (Currently only internal)
router.delete('/:id', (req, res) => {
  
  Category
  .findByIdAndDelete(req.params.id)
  .then(result => res.json(result))
  .catch(() => res.sendStatus(500));

});

module.exports = router;