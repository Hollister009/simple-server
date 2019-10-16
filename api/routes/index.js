const router = require('express').Router();
const controllers = require('../controllers');
const { getMockedProducts, createProduct, getAllProducts } = controllers;

router.get('/', (req, res) => {
  res.send('Server works fine!');
});

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/mock', getMockedProducts);

module.exports = router;