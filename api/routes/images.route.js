// @ts-check
const imagesRoute = require('express').Router();
const {
  getImageById,
  createImage,
  updateImage,
  removeImage,
  getAllImages,
  findImageRecord
} = require('../controllers/images.controller');

/**
 * @swagger
 * /images:
 *  get:
 *    tags:
 *      - images
 *    responses:
 *      '200':
 *        description: List of image records
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/Image'
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
 *        description: Created image record
 *        schema:
 *          $ref: '#/definitions/Image'
 *      '400':
 *        description: Bad request error
 */
imagesRoute.route('/images')
  .get(getAllImages)
  .post(createImage);

/**
 * @swagger
 * /images/{id}:
 *  get:
 *    tags:
 *      - images
 *    description: Get Image record by Id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: A single Image record
 *        schema:
 *          $ref: '#/definitions/Image'
 *      '400':
 *        description: Image record not found
 *      '500':
 *        description: Error Message
 *  put:
 *    tags:
 *      - images
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *      - in: body
 *        name: body
 *        required: true
 *        description: Update Image record fields
 *        schema:
 *          $ref: '#/definitions/Image'
 *    responses:
 *      '200':
 *        description: Updated Image record
 *        schema:
 *          $ref: '#/definitions/Image'
 *      '400':
 *        description: Image record not found
 *      '500':
 *        description: Error Message
 *      '503':
 *        description: Service unavailable
 *  delete:
 *    tags:
 *      - images
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *    description: Removes single record
 *    responses:
 *      '200':
 *        description: Removed Image record
 *        schema:
 *          $ref: '#/definitions/Image'
 *      '400':
 *        description: Image record not found
 *      '500':
 *        description: Error Message
 */
imagesRoute.route('/images/:id')
  .get(findImageRecord, getImageById)
  .put(findImageRecord, updateImage)
  .delete(findImageRecord, removeImage)

module.exports = imagesRoute;