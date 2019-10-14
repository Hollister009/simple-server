const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  value: String,
  urls: [String]
});

const productSchema = new mongoose.Schema({
  productName: String,
  description: String,
  brand: String,
  sizes: [String],
  colors: [String],
  images: [imageSchema],
  sex: String,
  category: String,
  season: [String],
  quantity: Number,
  price: Number,
  video: {
    type: String,
    required: false
  }
});


module.exports = mongoose.model('Product', productSchema);
