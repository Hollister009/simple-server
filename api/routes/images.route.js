// @ts-check
const imagesRoute = require('express').Router();
const { createImage, getAllImages } = require('../controllers/images.controller');

/**
 * @swagger
 * /images:
 *  get:
 *    tags:
 *      - images
 *    responses:
 *      '200':
 *        description: Returns array of all images
 *      '500':
 *        description: Error message
 *  post:
 *    tags:
 *      - images
 *    description: Creates new image object
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Image'
 *    responses:
 *      '201':
 *        description: Returns created image
 *      '400':
 *        description: Error message
 */
imagesRoute.route('/images')
  .get(getAllImages)
  .post(createImage);

module.exports = imagesRoute;