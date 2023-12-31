const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/users');
const notes = require('./routes/notes');

const app = express();
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json());

app.use('/api/users', users);
app.use('/api/notes', notes);

// Bodyparser middleware
// app.use(
//   bodyParser.urlencoded({
//     extended: false
//   })
// );
// app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI.toString();

// Connect to MongoDB
console.log(db);
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// // // Passport config
require('./config/passport')(passport);

// // // Routes


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));