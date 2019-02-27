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

// Create new budget
router.post('/', async (req, res) => {

  try {

    await Budget.deleteMany({});
    return await Budget.create(req.body);

  } catch(error) {

    return res.status(500)
    .send({msg: 'error updating budget'});

  }

});

module.exports = router