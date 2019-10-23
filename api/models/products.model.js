const mongoose = require('mongoose');
const OBJECT_ID = mongoose.Types.ObjectId;

const { BRANDS_MODEL } = require('./brands.model');

const PRODUCTS_MODEL = 'Products';

const collectionsSchema = new mongoose.Schema({
  title: String,
  season: [String]
});

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  brandId: {
    type: OBJECT_ID,
    ref: BRANDS_MODEL
  },
  category: { type: String, required: true },
  sizes: [String],
  colors: [String],
  genders: [String],
  seasons: [String],
  collectionIds: [{
    type: OBJECT_ID,
    ref: collectionsSchema
  }],
  quantity: { type: Number, default: 1 },
  sellCount: { type: Number, default: 0 },
  price: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  video: { type: String, required: false }
});


const Products = mongoose.model(PRODUCTS_MODEL, productsSchema);

module.exports = {
  PRODUCTS_MODEL,
  Products
}
