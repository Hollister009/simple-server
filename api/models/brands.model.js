const mongoose = require('mongoose');

const BRANDS_MODEL = 'Brands';

const brandsSchema = new mongoose.Schema({
  title: String,
  logo: String
});

 const Brands = mongoose.model(BRANDS_MODEL, brandsSchema);

module.exports = {
  BRANDS_MODEL,
  Brands
}
