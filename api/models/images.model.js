const mongoose = require('mongoose');
const OBJECT_ID = mongoose.Types.ObjectId;

const { PRODUCTS_MODEL } = require('./products.model');

const IMAGES_MODEL = 'Images';

/**
 * @swagger
 * definitions:
 *  Image:
 *    type: object
 *    properties:
 *      productId:
 *        type: string
 *        required: true
 *      claudinaryId:
 *        type: string
 *        required: true
 *      productColor:
 *        type: string
 */
const imagesSchema = new mongoose.Schema({
  productId: {
    type: OBJECT_ID,
    ref: PRODUCTS_MODEL,
    required: true
  },
  claudinaryId: { type: String, required: true },
  productColor: String
});

const Images = mongoose.model(IMAGES_MODEL, imagesSchema);

module.exports = {
  IMAGES_MODEL,
  Images
}
