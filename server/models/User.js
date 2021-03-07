const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 64
  },
  password: {
    type: String,
    required: true,
    max: 32,
    min: 10
  },
  name: {
    type: String,
    required: true,
    max: 32
  },
  phone: {
    type: String,
    min: 7,
    max: 12
  },
  flashcardSets: [String]
});

module.exports = mongoose.model("users", userSchema);