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
  apis: ['./api/routes/*.js', './api/models/*.js']
};
const swaggerSpec = swaggerJSDoc(options);

router.get('/', (req, res) => {
  res.send('<h2>Server works fine!</h2>');
});

router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /products:
 *  get:
 *    tags:
 *      - products
 *    description: Read list of all products
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
 *        description: Created product object
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Product'
 *    responses:
 *      '201':
 *        description: Return newly created product
 *      '400':
 *        description: Error message
 */
router.route('/products')
  .get(getAllProducts)
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
router.route('/products/:id')
  .get(findProductById, getProduct)
  .delete(findProductById, removeProduct);

// router.delete('/products', removeAllProducts);
// router.get('/products/mock', getMockedProducts);

router.route('/brands')
  .post(createBrand)
  .get(getBrands);

router.route('/images')
  .post(createImage);

module.exports = router;
