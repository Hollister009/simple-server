const mongoose = require('mongoose');

const brandsSchema = new mongoose.Schema({
  title: String,
  logo: String
});

module.exports = mongoose.model('Brands', brandsSchema);
