const Firestore = require('@google-cloud/firestore');
const Joi = require('@hapi/joi');

// Connect to Firestore
const db = new Firestore({
  projectId: 'studying-application'
});

// Validates flashcard set
const flashCardSetValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(64).required(),
    flashcards: Joi.array().items(Joi.object({
      question: Joi.string().min(1).max(128).required(),
      answer: Joi.string().min(1).max(128).required(),
      hint: Joi.string().min(1).max(128)
    }))
  });
  return schema.validate(data);
}

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

exports.createFlashCardSet = async (req, res) => {
  if(req.method != 'POST') return res.status(404).json({message: "Method must be POST"});
  const {error} = flashCardSetValidation(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});

  let id;
  await db.collection('flashcardset').add(req.body)
    .then(documentRef => {
      id = documentRef.id;
    });
  return res.status(200).json({flashcardID: id});
}

