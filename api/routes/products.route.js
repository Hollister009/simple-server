// @ts-check
const productsRoute = require('express').Router();
const {
  getProduct,
  createProduct,
  updateProduct,
  removeProduct,
  getProducts,
  findProductById,
} = require('../controllers/products.controller');

/**
 * @swagger
 * /products:
 *  get:
 *    tags:
 *      - products
 *    responses:
 *      '200':
 *        description: Return array of products
 *      '500':
 *        description: Error message
 *  post:
 *    tags:
 *      - products
 *    description: Create new product
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Product'
 *    responses:
 *      '201':
 *        description: Returns created product
 *      '400':
 *        description: Error message
 */
productsRoute.route('/products')
  .get(getProducts)
  .post(createProduct);

/**
 * @swagger
 * /products/{id}:
 *  get:
 *    tags:
 *      - products
 *    description: Get product by Id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: A single product
 *      '400':
 *        description: Product not found
 *      '500':
 *        description: Error message
 *  put:
 *    tags:
 *      - products
 *    description: Update selected product 
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *      - in: body
 *        name: body
 *        description: Update product paramters
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Product'
 *    responses:
 *      '200':
 *        description: Product updated
 *      '400':
 *        description: Product not found
 *      '503':
 *        description: Error message
 *  delete:
 *    tags:
 *      - products
 *    description: Removes single product
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *    responses:
 *      '200':
 *        description: Returns removed product
 *      '400':
 *        description: Product not found
 *      '500':
 *        description: Error message
 */
productsRoute.route('/products/:id')
  .get(findProductById, getProduct)
  .put(findProductById, updateProduct)
  .delete(findProductById, removeProduct);

module.exports = productsRoute;