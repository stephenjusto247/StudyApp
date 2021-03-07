const Joi = require('@hapi/joi');

const coursePlannerValidation = (data) => {
  const schema = Joi.object({
    semester: Joi.string().required(),
    courseEntries: Joi.array().items(Joi.object({
      courseNumber: Joi.string().required(),
      courseName: Joi.string().required(),
      units: Joi.string().required()
    }))
  });
  return schema.validate(data);
};

const createFlashcardSetValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(64).required(),
    flashcards: Joi.array().items(Joi.object({
      question: Joi.string().max(128).required(),
      answer: Joi.string().max(128).required(),
      hint: Joi.string().max(128)
    }))
  });
  return schema.validate(data);
};

const addUserSetslashcardSetValidation = (data) => {
  const schema = Joi.object({
    sets: Joi.array().items(Joi.object({
      name: Joi.string().max(64).required(),
      flashcards: Joi.array().items(Joi.object({
        question: Joi.string().max(128).required(),
        answer: Joi.string().max(128).required(),
        hint: Joi.string().max(128)
    }))}))
  });
  return schema.validate(data);
};

const updateFlashcardSetValidation = (data) => {
  const schema = Joi.object({
    setID: Joi.string().required(),
    name: Joi.string().max(64).required(),
    flashcards: Joi.array().items(Joi.object({
      question: Joi.string().max(128).required(),
      answer: Joi.string().max(128).required(),
      hint: Joi.string().max(128)
    }))
  });
  return schema.validate(data);
};

const deleteFlashcardSetValidation = (data) => {
  const schema = Joi.object({
    setID: Joi.string().required() 
  });
  return schema.validate(data);
};

const updateFlashcardValidation = (data) => {
  const schema = Joi.object({
    setID: Joi.string().required(),
    flashcardID: Joi.string().required(),
    flashcard: Joi.object({
      question: Joi.string().max(128).required(),
      answer: Joi.string().max(128).required(),
      hint: Joi.string().max(128)
    })
  });
  return schema.validate(data);
};

const addFlashcardValidation = (data) => {
  const schema = Joi.object({
    setID: Joi.string().required(),
    flashcard: Joi.object({
      question: Joi.string().min(1).max(128).required(),
      answer: Joi.string().min(1).max(128).required(),
      hint: Joi.string().min(1).max(128)
    })
  });
  return schema.validate(data);
};

const deleteFlashcardValidation = (data) => {
  const schema = Joi.object({
    setID: Joi.string().required(),
    flashcardID: Joi.string().required()
  });
  return schema.validate(data);
};

const registerValidation = (data) => {
  const schema = Joi.object({
      name: Joi.string().max(32).required(),
      email: Joi.string().max(64).required().email(),
      password: Joi.string().min(10).max(32).required()
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
      email: Joi.string().max(64).required().email(),
      password: Joi.string().max(32).min(10).required()
  });
  return schema.validate(data);
};

const deleteAccountValidation = (data) => {
  const schema = Joi.object({
      password: Joi.string().max(32).min(10).required()
  });
  return schema.validate(data);
};

module.exports.coursePlannerValidation = coursePlannerValidation;
module.exports.createFlashcardSetValidation = createFlashcardSetValidation;
module.exports.addUserSetslashcardSetValidation = addUserSetslashcardSetValidation;
module.exports.updateFlashcardSetValidation = updateFlashcardSetValidation;
module.exports.deleteFlashcardSetValidation = deleteFlashcardSetValidation;
module.exports.updateFlashcardValidation = updateFlashcardValidation;
module.exports.addFlashcardValidation = addFlashcardValidation;
module.exports.deleteFlashcardValidation = deleteFlashcardValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.deleteAccountValidation = deleteAccountValidation;