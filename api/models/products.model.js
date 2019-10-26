const mongoose = require('mongoose');
const OBJECT_ID = mongoose.Types.ObjectId;

const { BRANDS_MODEL } = require('./brands.model');

const PRODUCTS_MODEL = 'Products';

const collectionsSchema = new mongoose.Schema({
  title: String,
  season: [String]
});

/**
 * @swagger
 * definitions:
 *  Product:
 *    type: object
 *    properties:
 *      title:
 *        type: string
 *        example: 'Universal shirt'
 *      description:
 *        type: string
 *        example: 'Adopt breathable fabric, soft, lightweight, comfortable to wear.'
 *      brandId:
 *        type: string
 *        example: 'e3sdd4544aa'
 *      category:
 *        type: string
 *        example: 'shirts'
 *      sizes:
 *        type: array
 *        items:
 *          type: string
 *        example: ['s', 'm', 'l']
 *      colors:
 *        type: array
 *        items:
 *          type: string
 *        example:
 *          ['#555555', '#87ddee', '#af1515']
 *      genders:
 *        type: array
 *        items:
 *          type: string
 *        example: ['man', 'woman']
 *      seasons:
 *        type: array
 *        items:
 *          type: string
 *        example: ['spring', 'summer', 'autumn']
 *      quantity:
 *        type: integer
 *        example: 15
 *      sellCount:
 *        type: integer
 *        example: 5
 *      price:
 *        type: integer
 *        example: 100
 *      createdAt:
 *        type: string
 *        format: date-time
 *      updatedAt:
 *        type: string
 *        format: date-time
 */
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
  video: String
});

const Products = mongoose.model(PRODUCTS_MODEL, productsSchema);

module.exports = {
  PRODUCTS_MODEL,
  Products
};
