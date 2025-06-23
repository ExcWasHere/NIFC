const Sequelize = require('sequelize');
const sequelize = require('../config/database.js');
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Emotion = require('./emotion')(sequelize, Sequelize.DataTypes);

// Setup associations
Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = db;