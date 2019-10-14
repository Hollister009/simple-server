const router = require('express').Router();
const controllers = require('../controllers');
const { getMockedProducts, createProduct } = controllers;

router.get('/', (req, res) => {
  res.send('Server works fine!');
});

router.post('/products', createProduct);
router.get('/products/mock', getMockedProducts);

module.exports = router;