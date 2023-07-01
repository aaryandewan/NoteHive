const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Note schema
const NoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users', // This should match the name you've given to the User model
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Export the Note model
module.exports = Note = mongoose.model('note', NoteSchema);