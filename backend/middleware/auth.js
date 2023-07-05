const jwt = require('jsonwebtoken');
const config = require('config');
const keys = require('../config/keys');
const {secretOrKey} = keys 

module.exports = function(req, res, next) {
  // Get token from header
  console.log("In auth js");
  // console.log("req", req);
  console.log("req.aaryan", req.headers['x-auth-token']);
  console.log("qqq");
  const token = req.headers['x-auth-token'];
  const decoded_token = jwt.decode(token, { complete: true });
  console.log("The entire decoded token is:", decoded_token);

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, secretOrKey);
    console.log("in auth, decoded = ", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};