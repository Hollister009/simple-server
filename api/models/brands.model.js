const mongoose = require('mongoose');

const BRANDS_MODEL = 'Brands';

const brandsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  logo: { type: String, required: true }
});

 const Brands = mongoose.model(BRANDS_MODEL, brandsSchema);

module.exports = {
  BRANDS_MODEL,
  Brands
}
