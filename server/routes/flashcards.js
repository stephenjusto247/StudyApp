const router = require('express').Router();
const FlashcardSet = require('../models/FlashcardSet');
const User = require('../models/User');
const { createFlashcardSetValidation, addUserSetslashcardSetValidation, updateFlashcardSetValidation, deleteFlashcardSetValidation,updateFlashcardValidation, deleteFlashcardValidation, addFlashcardValidation } = require('../lib/validation');
const verify = require('../lib/verify');

router.post('/add-user-sets', verify, async (req, res) => {

  // Validate request body
  const {error} = addUserSetslashcardSetValidation(req.body);
  if(error) return res.status(400).json({ message: error.details[0].message });

  try{
    await Promise.all(req.user.flashcardSets.map(async (id) => {
      await FlashcardSet.deleteOne({ _id: id });
    }));

    const ids = await Promise.all(req.body.sets.map(async (set) => {
      let flashcardset = new FlashcardSet(set);
      let newFlashcardSet = await flashcardset.save();
      return newFlashcardSet._id;
    }))

    console.log(ids)

    // Connect flashcard sets to user
    const query = { _id: req.user._id };
    const set = { $set: { flashcardSets: ids } };
    await User.updateOne(query, set);

    return res.status(201).json({ message: "Success"});
  } catch {
    return res.status(500).json({ message: 'Failed to save flashcard set' })
  }
});

router.post('/create-set', verify, async (req, res) => {

  // Validate request body
  const {error} = createFlashcardSetValidation(req.body);
  if(error) return res.status(400).json({ message: error.details[0].message });

  try{

    // Create new flashcard set and link to user
    req.body.users = req.user._id;
    const flashcardset = new FlashcardSet(req.body);
    const newFlashcardSet = await flashcardset.save();

    // Connect flashcard set to user
    const query = { _id: req.user._id };
    const set = { $push: { flashcardSets: newFlashcardSet._id } };
    await User.updateOne(query, set);

    // Get the Object IDs of all the flashcards
    const ids = await FlashcardSet.findOne({ _id: newFlashcardSet._id })
      .then(response => response.flashcards.map(flashcard => flashcard._id));

    return res.status(201).json({ setID: newFlashcardSet._id, flashcardIDs: ids });
  } catch {
    return res.status(500).json({ message: 'Failed to save flashcard set' })
  }
});

router.post('/update-set', verify, async (req, res) => {

  // Validate request body
  const {error} = updateFlashcardSetValidation(req.body);
  if(error) return res.status(400).json({ message: error.details[0].message });

  try{

    // Check if Flashcard set exists
    const oldFlashcardSet = await FlashcardSet.findOne({_id: req.body.setID})
    if(!oldFlashcardSet) return res.status(404).json({message: "Flashcards set cannot be found"});

    // Connect flashcard set to user
    const query = { _id: req.body.setID };
    const set = { name: req.body.name, flashcards: req.body.flashcards };
    await FlashcardSet.replaceOne(query, set);

    return res.status(201).json({ message: "Success" });
  } catch {
    return res.status(500).json({ message: 'Failed to save flashcard set' })
  }
});


router.post('/get-set', async (req, res) => {

  // Validate request body
  const {error} = deleteFlashcardSetValidation(req.body);
  if(error) return res.status(400).json({ message: error.details[0].message });

  try{

    // Get all the flashcards from the set
    const flashcards = await FlashcardSet.findOne({ _id: req.body.setID })
      .then(response => response.flashcards);

    return res.status(200).json({ flashcards: flashcards });
  } catch {
    return res.status(500).json({ message: 'Failed to get flashcard set' })
  }
});

router.get('/get-set', async (req, res) => {

  const data = req.query.setID || null;
  // Validate request body
  if(!data) return res.status(400).json({ message: "Missing argument" });

  try{

    // Get all the flashcards from the set
    const flashcards = await FlashcardSet.findOne({ _id: data })
      .then(response => response.flashcards.map(flashcard => {
        let card = {question: flashcard.question, answer: flashcard.answer};
        if(flashcard.hint) card.hint = flashcard.hint;
        return card;
      }));

    return res.status(200).json({ flashcards: flashcards });
  } catch {
    return res.status(500).json({ message: 'Failed to get flashcard set' })
  }
});

router.get('/get-user-sets', verify, async (req, res) => {

  try{

    // Get list of all sets
    const query = { _id: req.user._id };
    const setIDs = await User.findOne(query)
      .then(response => response.flashcardSets);

    // Get all info for each set
    const allSets = await Promise.all(setIDs.map(async (setID) => {
      let flashcards = await FlashcardSet.findOne({ _id: setID })
      return { name: flashcards.name, flashcards: flashcards.flashcards };
    }));

    return res.status(200).json({ sets: allSets });
  } catch {
    return res.status(500).json({ message: 'Failed to get flashcard sets' })
  }
});

router.post('/add-set', verify, async (req, res) => {

  // Validate request body
  const {error} = deleteFlashcardSetValidation(req.body);
  if(error) return res.status(400).json({ message: error.details[0].message });

  try{

    // Append the set to the user
    const query1 = { _id: req.user._id };
    const set1 = { $push: { flashcardSets: req.body.setID} };
    await User.updateOne(query1, set1);

    // Append the user to the back of the array
    const query2 = { _id: req.body.setID };
    const set2 = { $push: { users: req.user._id} }
    await FlashcardSet.updateOne(query2, set2);

    // Get all the flashcards from the set
    const flashcards = await FlashcardSet.findOne({ _id: req.body.setID })
    .then(response => response.flashcards);

    return res.status(201).json({ flashcards: flashcards });
  } catch {
    return res.status(500).json({ message: 'Failed to save flashcard set' })
  }
});

router.delete('/delete-set', verify, async (req, res) => {

  // Validate request body
  const {error} = deleteFlashcardSetValidation(req.body);
  if(error) return res.status(400).json({ message: error.details[0].message });

  try{

    // Remove the set from the user
    const query1 = { _id: req.user._id };
    const set1 = { $pull: { flashcardSets: req.body.setID } };
    await FlashcardSet.updateOne(query1, set1);

    // Remove the user from the set
    const query2 = { _id: req.body.setID };
    const set2 = { $pull: { users: req.user._id } };
    await FlashcardSet.updateOne(query2, set2);

    // Get the array of users on the set
    const users = await FlashcardSet.findOne({ _id: req.body.setID })
      .then(response => response.users);

    if(users.length == 0){
      // Delete the set
      const query3 = { _id: req.body.setID };
      await FlashcardSet.deleteOne(query2);
    }


    return res.status(200).json({ message: 'Success'});
  } catch {
    return res.status(500).json({ message: 'Failed to delete flashcard set' })
  }
});

router.post('/update-flashcard', verify, async (req, res) => {

  // Validate request body
  const {error} = updateFlashcardValidation(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});

  try{

    // Replace the old flashcard values with new ones
    const query = { "flashcards._id": req.body.flashcardID };
    const set = { $set: { "flashcards.$": req.body.flashcard} }
    await FlashcardSet.updateOne(query, set);

    return res.status(201).json({ message: 'Success'});
  } catch{
    return res.status(500).json({ message: 'Failed to save flashcard' })
  }

});

router.post('/add-flashcard', verify, async (req, res) => {

  // Validate request body
  const {error} = addFlashcardValidation(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});

  try{

    // Append the flashcard to the back of the array
    const query = { _id: req.body.setID };
    const set = { $push: { flashcards: req.body.flashcard} }
    await FlashcardSet.updateOne(query, set);

    // Get the Object ID of the flashcard
    const id = await FlashcardSet.find({ _id: req.body.setID }, { flashcards: { $slice: -1 } })
      .then(response => response[0].flashcards[0]._id);

    return res.status(201).json({ id: id});
  } catch{
    return res.status(500).json({ message: 'Failed to save flashcard' })
  }

});

router.delete('/delete-flashcard', verify, async (req, res) => {

  // Validate request body
  const {error} = deleteFlashcardValidation(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});

  try{

    // Delete the flashcard from the set
    const query = { _id: req.body.setID };
    const set = { $pull: { flashcards: { _id: req.body.flashcardID } } }
    await FlashcardSet.updateOne(query, set);

    return res.status(200).json({ message: 'Success'});
  } catch{
    return res.status(500).json({ message: 'Failed to delete flashcard' })
  }

});

module.exports = router;