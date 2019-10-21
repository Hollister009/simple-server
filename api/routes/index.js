const router = require('express').Router();
const {
  getProduct,
  createProduct,
  removeProduct,
  getMockedProducts,
  getAllProducts,
  findProductById,
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
  router.delete('/products/:id', findProductById, removeProduct);

router.get('/brands', getBrands);

module.exports = router;
