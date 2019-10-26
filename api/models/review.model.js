const mongoose = require('mongoose');

/**
 * @swagger
 * definitions:
 *  Review:
 *    type: object
 *    properties:
 *      title:
 *        type: string
 *      productId:
 *        type: string
 *      createdBy:
 *        type: string
 *      message:
 *        type: string
 *      rating:
 *        type: integer
 *      createdAt:
 *        type: string
 *        format: date-time
 *      updatedAt:
 *        type: string
 *        format: data-time
 */
const reviewSchema = new mongoose.Schema({
  title: String,
  productId: String,
  createdBy: String,
  message: String,
  rating: Number,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model('Review', reviewSchema);