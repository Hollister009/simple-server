const router = require('express').Router();
const controllers = require('../controllers');
const { getMockedProducts, createProduct, getAllProducts, findProductById, getProduct } = controllers;

router.get('/', (req, res) => {
  res.send('Server works fine!');
});

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/mock', getMockedProducts);
router.get('/products/:id', findProductById, getProduct);

module.exports = router;