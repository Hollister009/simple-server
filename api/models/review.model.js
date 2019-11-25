const mongoose = require("mongoose");

const REVIEW_MODEL = "Review";

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
const reviewSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    productId: { type: String, required: true },
    createdBy: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

const Review = mongoose.model(REVIEW_MODEL, reviewSchema);

module.exports = { REVIEW_MODEL, Review };
