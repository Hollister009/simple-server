const mongoose = require('mongoose');
const { NODE_ENV, MONGODB_LOCAL, MONGODB_REMOTE } = process.env;

const db_uri = NODE_ENV === 'production' ? MONGODB_REMOTE : MONGODB_LOCAL;
const db = mongoose.connection;

mongoose.set('useCreateIndex', true);
mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true });

db.on('error', error => console.log(error));

db.once('open', () => console.log('MongoDB connection established'));

module.exports.db = db;
