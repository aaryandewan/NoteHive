const express = require('express');
const router = express.Router();

// Load Note model
const Note = require('../models/Note');

const auth = require('../middleware/auth.js');

// @route POST api/notes/create
// @desc Create a new note
// @access Private
router.post('/create', auth, (req, res) => {
  // The auth middleware verifies the user's token and adds their user ID to the request object
  console.log("In notes.js, user = ", req.user);
  const userId = req.user.id;

  // Now you can use this user ID when creating the note
  const { title, content } = req.body;
  const newNote = new Note({
    user: userId,
    title,
    content
  });

  // Save the note
  newNote.save()
    .then(note => res.json(note))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.get('/', auth, (req, res) => {
  // Retrieve all notes from the database
  Note.find({ user: req.user.id })
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route DELETE api/notes/:id
// @desc Delete a note
// @access Private
router.delete('/:id', (req, res) => {
  // Delete note code here
  const noteId = req.params.id;

  // Find the note by ID and delete it
  Note.findByIdAndDelete(noteId)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route PUT api/notes/:id
// @desc Edit a note
// @access Private
router.put('/:id', (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

  // Find the note by ID and update its title and content
  Note.findByIdAndUpdate(noteId, { title, content }, { new: true })
    .then(updatedNote => res.json(updatedNote))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;