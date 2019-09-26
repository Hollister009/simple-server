const router = require('express').Router();
const getMockedProducts = require('../controllers').getMockedProducts;

router.get('/', (req, res) => {
  res.send('Server works fine!');
});

router.get('/products', getMockedProducts);

module.exports = router;