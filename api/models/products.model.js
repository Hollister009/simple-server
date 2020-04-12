const mongoose = require('mongoose');
const OBJECT_ID = mongoose.Types.ObjectId;

const { BRANDS_MODEL } = require('./brands.model');

const PRODUCTS_MODEL = 'Products';
const SIZE_VALUES = ['s', 'm', 'l', 'xl', 'xxl'];
const SEASON_VALUES = ['spring', 'summer', 'autumn', 'winter'];

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
 *        example: '5daf1650a3f2fe001790b09b'
 *      category:
 *        type: string
 *        example: 'shirts'
 *      sizes:
 *        type: array
 *        items:
 *          type: string
 *          enum:
 *            - 's'
 *            - 'm'
 *            - 'l'
 *            - 'xl'
 *            - 'xxl'
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
 *          enum:
 *            - 'spring'
 *            - 'summer'
 *            - 'autumn'
 *            - 'winter'
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
  sizes: {
    type: [String],
    enum: SIZE_VALUES
  },
  colors: [String],
  genders: [String],
  seasons: {
    type: [String],
    enum: SEASON_VALUES
  },
  collectionIds: [{
    type: OBJECT_ID,
    ref: collectionsSchema
  }],
  quantity: { type: Number, default: 1 },
  sellCount: { type: Number, default: 0 },
  price: { type: Number, required: true },
  video: { type: String, default: null }
  },
  {
    timestamps: true
  }
);

// Custom field validation
productsSchema.path('sizes').validate(val => val.length, 'Please specify at least one size');

const Products = mongoose.model(PRODUCTS_MODEL, productsSchema);

module.exports = {
  PRODUCTS_MODEL,
  Products
};
