const router = require('express').Router();
const CoursePlanner = require('../models/courseplanner');
const { coursePlannerValidation } = require('../lib/validation');
const verify = require('../lib/verify');
const User = require('../models/User');

router.post('/add-planner', verify, async (req, res) => {
  // Validate request body
  const {error} = coursePlannerValidation(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});

  try{

    // Check if user has a planner already 
    const id = await User.findOne({_id: req.user._id})
      .then(response => response.coursePlanner);
    
    // Delete old planner
    if(id) await CoursePlanner.deleteOne({ _id: id });

    // Save course planner
    const coursePlanner = new CoursePlanner(req.body);
    const newCoursePlanner = await coursePlanner.save();

    // Connect course planner to user
    const query = { _id: req.user._id };
    const set = { $set: { coursePlanner: newCoursePlanner._id } };
    await User.updateOne(query, set);

    return res.status(201).json({ coursePlannerID: newCoursePlanner._id });

  } catch{
    return res.status(500).json({message: 'Failed to save Course Planner'});
  }
});

router.get('/get-planner', verify, async (req, res) => {

  try{
    const id = await User.findOne({_id: req.user._id})
      .then(response => response.coursePlanner);
    if(!id) return res.status(404).json({message: 'No Course Planner saved'});

    let data = await CoursePlanner.findOne({ _id: id });

    return res.status(201).json({ coursePlanner: data });

  } catch{
    return res.status(500).json({message: 'Failed to save Course Planner'});
  }
});

router.delete('/delete-planner', verify, async (req, res) => {

  try{
    const id = await User.findOne({_id: req.user._id})
      .then(response => response.coursePlanner);
    if(!id) return res.status(404).json({message: 'No Course Planner saved'});

    const query = { _id: req.user.id };
    const set = { $unset: { coursePlanner: "" } };
    await User.updateOne(query, set);

    await CoursePlanner.deleteOne({ _id: id })

    return res.status(201).json({ message: "Success" });

  } catch{
    return res.status(500).json({message: 'Failed to save Course Planner'});
  }
});

module.exports = router;