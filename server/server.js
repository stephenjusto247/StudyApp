require('dotenv').config();
const express = require('express');
const server = express();
const serverPort = process.env.PORT || 5000;

const mongoose = require('mongoose');
const mongodburi = process.env.mongodburi || 'mongodb://localhost/studying-app';

// Connect to Database
mongoose.connect(mongodburi,  {
  useUnifiedTopology: true,  
  useNewUrlParser: true,
  useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));

// Import Routes
const authRoute = require('./routes/auth');
const flashcardsRoute = require('./routes/flashcards');
const coursePlannerRoute = require('./routes/courseplanner');


server.use(express.json());

// Route Middlewares
server.use('/auth', authRoute);
server.use('/flashcards', flashcardsRoute);
server.use('/courseplanner', coursePlannerRoute);






server.listen(serverPort, () => console.log(`Server listening on port ${serverPort}`));