const { Sequelize } = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Task = require('./task')(sequelize, Sequelize.DataTypes);

db.User.hasMany(db.Task, { as: 'tasks', foreignKey: 'userId' });
db.Task.belongsTo(db.User, { as: 'owner', foreignKey: 'userId' });

module.exports = db;
