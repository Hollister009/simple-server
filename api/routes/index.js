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
const { getBrands, createBrand } = require('../controllers/brands.controller');
const { createImage } = require('../controllers/images.controller');

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

router.route('/brands')
  .post(createBrand)
  .get(getBrands);

router.route('/images')
  .post(createImage);

module.exports = router;
