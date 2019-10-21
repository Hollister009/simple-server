const router = require('express').Router();
const {
  getMockedProducts,
  createProduct,
  getAllProducts,
  findProductById,
  getProduct,
  removeAllProducts
} = require('../controllers/products.controller');
const { getBrands } = require('../controllers/brands.controller');

router.get('/', (req, res) => {
  res.send('Server works fine!');
});

router.route('/products')
  .post(createProduct)
  .get(getAllProducts)
  .delete(removeAllProducts);
  
  router.get('/products/mock', getMockedProducts);
  router.get('/products/:id', findProductById, getProduct);

router.get('/brands', getBrands);

module.exports = router;
