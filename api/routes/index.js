// @ts-check
const router = require('express').Router();
const productsRoute = require('./products.route');
const brandsRoute = require('./brands.route');
const imagesRoute = require('./images.route');
// swagger modules
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

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

router
  .use(productsRoute)
  .use(brandsRoute)
  .use(imagesRoute);

module.exports = router;
