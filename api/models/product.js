const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  value: String,
  urls: [String]
});

const collectionSchema = new mongoose.Schema({
  title: String,
  season: [String]
});

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  sizes: [String],
  colors: [String],
  genders: [String],
  season: [String],
  images: [imageSchema],
  productCollections: [collectionSchema],
  quantity: { type: Number, default: 1 },
  sellCount: { type: Number, default: 0 },
  price: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  video: { type: String, required: false }
});


module.exports = mongoose.model('Product', productSchema);
