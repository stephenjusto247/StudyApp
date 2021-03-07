const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let coursePlannerSchema = new mongoose.Schema({
  semester: {
    type: String,
    required: true,
  },
  courseEntries: [
    {
      courseNumber: {
        type: String,
        required: true
      },
      courseName: {
        type: String,
        required: true
      },      
      units: {
        type: String,
        required: true
      },
    }
  ]
});

module.exports = mongoose.model("CoursePlanner", coursePlannerSchema);