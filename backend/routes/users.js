const express = require('express');
const passport = require('passport');

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




router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
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
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

const passport = require('passport');

// ...

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get(
  '/current', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;