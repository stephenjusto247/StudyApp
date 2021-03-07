const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let flashcardSetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 32
  }, 
  flashcards: [{
    question: {
      type: String,
      required: true,
      max: 128
    },
    answer: {
      type: String,
      required: true,
      max: 128
    },    
    hint: {
      type: String,
      max: 128
    }
  }],
  users: [String]
});

module.exports = mongoose.model("FlashcardSet", flashcardSetSchema);