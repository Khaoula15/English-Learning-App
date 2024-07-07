// english-learning-platform/database/init-mongo.js

db.createUser({
  user: 'admin',
  pwd: 'password',
  roles: [{ role: 'readWrite', db: 'english_learning_db' }]
});

db = db.getSiblingDB('english_learning_db');

// Create collections and indexes here
