const { connect, connection } = require('mongoose');
const { requiredPaths } = require('../models/reaction');
require('dotenv').config()
const connectionString = process.env.MONGODB_URI || process.env.mongoDB_URL;

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});





module.exports = connection;