const router = require('express').Router();
// swagger modules
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const {
  getProduct,
  createProduct,
  removeProduct,
  getAllProducts,
  findProductById,
} = require('../controllers/products.controller');
const { getBrands, createBrand } = require('../controllers/brands.controller');
const { createImage } = require('../controllers/images.controller');

// Extended: https://swagger.io/specification/#infoObject
const options = {
  swaggerDefinition: {
    info: {
      title: 'Simple REST API Server',
      version: '1.0.0',
      description: 'A sample API'
    },
    basePath: '/'
  },
  apis: ['./api/routes/*.js']
};
const swaggerSpec = swaggerJSDoc(options);

router.get('/', (req, res) => {
  res.send('<h2>Server works fine!</h2>');
});

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * definitions:
 *  Product:
 *    type: object
 *    properties:
 *      title:
 *        type: string
 *        example: 'Universal shirt'
 *      description:
 *        type: string
 *        example: 'Adopt breathable fabric, soft, lightweight, comfortable to wear.'
 *      brandId:
 *        type: string
 *        example: 'e3sdd4544aa'
 *      category:
 *        type: string
 *        example: 'shirts'
 *      sizes:
 *        type: array
 *        items:
 *          type: string
 *        example: ['s', 'm', 'l']
 *      colors:
 *        type: array
 *        items:
 *          type: string
 *        example:
 *          ['#555555', '#87ddee', '#af1515']
 *      genders:
 *        type: array
 *        items:
 *          type: string
 *        example: ['man', 'woman']
 *      seasons:
 *        type: array
 *        items:
 *          type: string
 *        example: ['spring', 'summer', 'autumn']
 *      quantity:
 *        type: integer
 *        example: 15
 *      sellCount:
 *        type: integer
 *        example: 5
 *      price:
 *        type: integer
 *        example: 100
 *      createdAt:
 *        type: string
 *        format: date-time
 *      updatedAt:
 *        type: string
 *        format: date-time
 */

/**
 * @swagger
 * /products:
 *  get:
 *    description: Read list of all products
 *    responses:
 *      '200':
 *        description: Return array of products
 *      '500':
 *        description: Error message
 */
router.get('/products', getAllProducts);

/**
 * @swagger
 * /products:
 *  post:
 *    description: Create new product
 *    parameters:
 *      - name: body
 *        in: body
 *        description: Created product object
 *        required: true
 *        type: object
 *        schema:
 *          $ref: '#/definitions/Product'
 *    responses:
 *      '201':
 *        description: Return newly created product
 *      '400':
 *        description: Error message
 */
router.post('/products', createProduct);

/**
 * @swagger
 * /products/{id}:
 *  get:
 *    description: Get product by Id
 *    parameters:
 *      - name: id
 *        in: query
 *        required: true
 *    responses:
 *      '200':
 *        description: Returns the product 
 *      '400':
 *        description: Product not found
 *      '500':
 *        description: Error message
 */
router.get('/products/:id', findProductById, getProduct);

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *    description: Removes single product
 *    parameters:
 *      - name: id
 *        in: query
 *        required: true
 *    responses:
 *      '200':
 *        description: Returns deleted product
 *      '400':
 *        description: Product not found
 *      '500':
 *        description: Error message
 */
router.delete('/products/:id', findProductById, removeProduct);

// router.delete('/products', removeAllProducts);
// router.get('/products/mock', getMockedProducts);

router.route('/brands')
  .post(createBrand)
  .get(getBrands);

router.route('/images')
  .post(createImage);

module.exports = router;
