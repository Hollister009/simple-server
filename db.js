const mongoose = require('mongoose');
require('dotenv').config();

const db_uri = process.env.MONGODB_LOCAL;

mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', error => console.log(error));

db.once('open', () => console.log('MongoDB connection established'));

module.exports.db = db;
