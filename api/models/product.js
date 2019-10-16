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
  productName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  sizes: [String],
  colors: [String],
  images: [imageSchema],
  collection: [collectionSchema],
  genders: [String],
  category: String,
  season: [String],
  quantity: Number,
  sellCount: Number,
  price: Number,
  createdAt: Date,
  updatedAt: Date,
  video: {
    type: String,
    required: false
  }
});


module.exports = mongoose.model('Product', productSchema);
