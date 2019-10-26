// @ts-check
const imagesRoute = require('express').Router();
const { createImage } = require('../controllers/images.controller');

/**
 * @swagger
 * /images:
 *  post:
 *    tags:
 *      - images
 *    description: Creates new image object
 *    parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          $ref: '#/definitions/Image'
 *    responses:
 *      '201':
 *        description: Returns created image object
 *      '500':
 *        description: Error message
 */
imagesRoute.route('/images')
  .post(createImage);

module.exports = imagesRoute;