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
 *        example: '5db179b634a29600172f6e8a'
 *      claudinaryId:
 *        type: string
 *        example: 'blouse_1_1'
 *      productColor:
 *        type: string
 *        example: 'black'
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
