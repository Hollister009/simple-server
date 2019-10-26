// @ts-check
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
 *        description: Returns array of all brands
 *      '500':
 *        description: Error message
 *  post:
 *    tags:
 *      - brands
 *    description: Creates new brand
 *    parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          $ref: '#/definitions/Brand'
 *    responses:
 *      '201':
 *        description: Returns created brand
 *      '500':
 *        description: Error message
 */
brandsRoute.route('/brands')
  .get(getBrands)
  .post(createBrand);

module.exports = brandsRoute;