const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'studying-application'
});
const userRef = db.collection('users');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

exports.getUserInfo = async (req, res) => {
  const userID = req.query.message || req.body.message || 'Stephen'
  try{
    const doc = await userRef.doc(userID).get();
    if(!doc.exists){
      res.status(404).json({message: 'could not be found'});
    }
    res.status(200).json(doc.data());
  } catch {
    res.status(500).json({message: 'Failed to retrieve doc'});
  } 
};

