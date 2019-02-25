const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Admin = require('../database/Admin');

router.post('/', (req, res) => {
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(5);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Find the only user in the database
  Admin.findOne({ username: 'Eckhardt' })
  .then(result => {

    // Unauthorized if wrong password
    if(!bcrypt.compareSync(password, hashedPassword)) return res.status(401).send({ auth: false, token: null});
    
    // Sign the token
    const token = jwt.sign({ id: result._id }, 'onetwothreefour', { expiresIn: 86400 });
      
    // Send result
    res.status(200).send({auth: true, token});

  });
});

module.exports = router;