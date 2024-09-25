const env = require('./env.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    operatorsAliases: false,

    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle,
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Model = require('../models/model.model.js')(sequelize, Sequelize);
/*db.Model5 = require('../models/model5.model.js')(sequelize, Sequelize);
db.Model6 = require('../models/model6.model.js')(sequelize, Sequelize);
db.Autor = require('../models/autor.model.js')(sequelize, Sequelize);*/
module.exports = db;
