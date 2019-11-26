const mongoose = require('mongoose');

const BLOGS_MODEL = 'Blogs';

/**
 * @swagger
 * definitions:
 *  Blog:
 *    type: object
 *    properties:
 *      date:
 *        type: string
 *        format: date-time
 *      title:
 *        type: string
 *        example: 'summer trends'
 *      intro:
 *        type: string
 *        example: 'we know what you want this summer. most fashion looks'
 *      labels:
 *        type: array
 *        items:
 *          type: string
 *        example: ["summer", "swimsuit", "bags", "sunglasses"]
 *      description:
 *        type: string
 *        example: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit'
 */

const blogsSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  title: { type: String, required: true },
  intro: { type: String, required: true },
  description: { type: String, required: true },
  labels: [String],
  photo: { type: String, required: true },
  category: { type: String, required: true }
});

const Blogs = mongoose.model(BLOGS_MODEL, blogsSchema);

module.exports = {
  BLOGS_MODEL,
  Blogs
};
