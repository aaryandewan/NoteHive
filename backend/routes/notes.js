const express = require('express');
const router = express.Router();

// Load Note model
const Note = require('../models/Note');

// @route POST api/notes/create
// @desc Create a new note
// @access Private
router.post('/create', (req, res) => {
  // Create note code here
});

// @route GET api/notes
// @desc Get all notes
// @access Private
router.get('/', (req, res) => {
  // Get all notes code here
});

// @route DELETE api/notes/:id
// @desc Delete a note
// @access Private
router.delete('/:id', (req, res) => {
  // Delete note code here
});

// @route PUT api/notes/:id
// @desc Edit a note
// @access Private
router.put('/:id', (req, res) => {
  // Edit note code here
});

module.exports = router;