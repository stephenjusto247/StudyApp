const router = require('express').Router();
const User = require('../models/User');
const { registerValidation, loginValidation, deleteAccountValidation } = require('../lib/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('../lib/verify');

router.post('/register', async (req, res) => {

  // Validate request body
  const {error} = registerValidation(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});

  // Check if the user's email is already in the database
  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).json({message: 'Email already exists'});

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  try{
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      phone: null, 
      flashcards: []
    });

    const newUser = await user.save();
    const token = await jwt.sign({id: newUser._id}, process.env.AUTH_TOKEN);
    return res.status(201).json({token: `Bearer ${token}`});
  } catch {
    return res.status(500).json({message: 'Failed to create account'});
  }
});

router.post('/login', async (req, res) => {
    // Validate data before adding user
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});

    // Check if the user's email is already in the database
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).json({message: 'Email or password is incorrect'});
    
    // Check if password is valid
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).json({message: 'Email or password is incorrect'});

    try{
      const token = jwt.sign({id: user._id}, process.env.AUTH_TOKEN);
      return res.status(201).json({token: `Bearer ${token}`});
    } catch {
      return res.status(500).json({message: 'Failed to log in'});
    }
});

router.delete('/delete-account', verify, async (req, res) => {

  // Validate data
  const {error} = deleteAccountValidation(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});

  // Check password
  const validPass = await bcrypt.compare(req.body.password, req.user.password);
  if(!validPass) return res.status(400).json({message: 'Password is incorrect'});

  try{
      const query = { _id: req.user._id };
      await User.deleteOne(query);

      return res.status(200).json({message: 'Success'});
  }catch{ 
      return res.status(500).json({message: 'Failed to delete account'});
  }
});

router.get('/get-account-details', verify, async (req, res) => {
  try{
    const user = await User.findOne({ _id: req.user._id });
    if(!user) return res.status(400).json({message: 'User cannot be found'});
    
    return res.status(200).json({name: user.name, email: user.email});    
  } catch {
    return res.status(500).json({message: 'Failed to get account details'});
  }
})

module.exports = router;