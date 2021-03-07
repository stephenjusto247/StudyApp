const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware that checks if a user has a token
// returns the user's data if true
// returns an error if false

const verify = async function (req, res, next){

  // check if user has an access token
  let token = req.header('Authorization');
  if(!token) return res.status(404).json({message: 'Token missing'});
  if(token.startsWith('Bearer ')) token = token.slice(7, token.length);

  // verify access token
  if(token){
    await jwt.verify(token, process.env.AUTH_TOKEN, (err, id) => {
      if(err) {
        return res.status(401).json({message: 'Token is not valid'});
      } else{
        User.findOne({_id: id.id}, (err, obj) => {
          req.user = obj;
          next();
        });
      }
    });
  }else{
    res.status(401).json({message: 'Auth token is not supplied'});
  }
}

module.exports = verify;