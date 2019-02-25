const jwt = require('jsonwebtoken');
const Admin = require('../database/Admin');

module.exports = function (req, res, next) {
  const authHeader = req.headers['x-access-token'];
  let token;
  
  // Check if headers
  if(!authHeader) return res.status(401).send('unauth');
  
  //get token value
  jwt.verify(authHeader, 'onetwothreefour', (err, decode) => {
    
    if(err) return res.status(500);
    token = decode;

    // check if token matches user
    Admin.findById(token.id)
    .then(() => next())
    .catch(() => res.status(401).send('unauthorized'));

  });
}