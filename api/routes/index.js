const router = require('express').Router();
// swagger modules
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const {
  getProduct,
  createProduct,
  removeProduct,
  getMockedProducts,
  getAllProducts,
  findProductById,
  removeAllProducts
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
 *    properties:
 *      title: string
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
 *      - name: product
 *        in: body
 *        description: Created product object
 *        required: true
 *        type: object
 *        example: TODO
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
 * /products:
 *  delete:
 *    description: Delete all products
 *    responses:
 *      '200':
 *        description: Successful message
 *      '400':
 *        description: Error message
 */
router.delete('/products', removeAllProducts);

  
router.get('/products/mock', getMockedProducts);
router.get('/products/:id', findProductById, getProduct);
router.delete('/products/:id', findProductById, removeProduct);

router.route('/brands')
  .post(createBrand)
  .get(getBrands);

router.route('/images')
  .post(createImage);

module.exports = router;
