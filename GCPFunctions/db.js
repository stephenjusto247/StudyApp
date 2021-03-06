const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'studying-application'
});

module.exports = db;