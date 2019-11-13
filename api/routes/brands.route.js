const brandsRoute = require('express').Router();
const { getBrands, createBrand } = require('../controllers/brands.controller');

/**
 * @swagger
 * /brands:
 *  get:
 *    tags:
 *      - brands
 *    responses:
 *      '200':
 *        description: List of brands
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/Brand'
 *      '500':
 *        description: Error message
 *  post:
 *    tags:
 *      - brands
 *    description: Creates new brand object
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Brand'
 *    responses:
 *      '201':
 *        description: Created brand
 *        schema:
 *          $ref: '#/definitions/Brand'
 *      '400':
 *        description: Error message
 */
brandsRoute
  .route('/brands')
  .get(getBrands)
  .post(createBrand);

module.exports = brandsRoute;
