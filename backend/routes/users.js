const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// Load User model
const User = require('../models/User');

router.post('/register', (req, res) => {
    // Find user by email
    User.findOne({ email: req.body.email }).then(user => {
      // If user exists, send a 400 response
      if (user) {
        return res.status(400).json({ email: 'Email already exists' });
      } else {
        // If user does not exist, create new user
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
  
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                // Create JWT Payload
                const payload = {
                  id: user.id,
                  name: user.name
                };
  
                // Sign token
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  { expiresIn: 31556926 }, // 1 year in seconds
                  (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token
                    });
                  }
                );
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  });


  

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  // Login code here
});

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get('/current', (req, res) => {
  // Return current user code here
});

module.exports = router;