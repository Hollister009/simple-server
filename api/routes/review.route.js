const reviewRoute = require('express').Router();
const {
  getReviews,
  getReview,
  createReview,
  findReviewById,
  removeReview,
  updateReview
} = require('../controllers/review.controller');

/**
 * @swagger
 * /reviews:
 *  get:
 *    tags:
 *      - reviews
 *    responses:
 *      '200':
 *        description: A list of reviews
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/Review'
 *      '500':
 *        description: Error message
 *  post:
 *    tags:
 *      - reviews
 *    description: Create new review
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Review'
 *    responses:
 *      '201':
 *        description: Created review
 *        schema:
 *          $ref: '#/definitions/Review'
 *      '400':
 *        description: Bad request error
 */

reviewRoute
  .route('/reviews')
  .get(getReviews)
  .post(createReview);

/**
 * @swagger
 Reviews/{id}:
 *  get:
 *    tags:
 *      - reviews
 *    description: Get review by Id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: A single review
 *        schema:
 *          $ref: '#/definitions/Review'
 *      '400':
 *        description: Review not found
 *      '500':
 *        description: Error message
 *  put:
 *    tags:
 *      - reviews
 *    description: Update selected review
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *      - in: body
 *        name: body
 *        required: true
 *        description: Update product fields
 *        schema:
 *          $ref: '#/definitions/review'
 *    responses:
 *      '200':
 *        description: Updated review
 *        schema:
 *          $ref: '#/definitions/review'
 *      '400':
 *        description: review not found
 *      '500':
 *        description: Error message
 *      '503':
 *        description: Service unavailable
 *  delete:
 *    tags:
 *      - reviews
 *    description: Removes single review
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: Removed review
 *        schema:
 *          $ref: '#/definitions/review'
 *      '400':
 *        description: Product not found
 *      '500':
 *        description: Error message
 */

reviewRoute
  .route('/reviews/:id')
  .get(findReviewById, getReview)
  .put(findReviewById, updateReview)
  .delete(findReviewById, removeReview);

module.exports = reviewRoute;