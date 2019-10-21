const router = require('express').Router();
const {
  getMockedProducts, createProduct, getAllProducts, findProductById, getProduct
} = require('../controllers/products.controller');
const { getBrands } = require('../controllers/brands.controller');

router.get('/', (req, res) => {
  res.send('Server works fine!');
});

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/mock', getMockedProducts);
router.get('/products/:id', findProductById, getProduct);

router.get('/brands', getBrands);

module.exports = router;
