const fs = require('fs');
const path = require('path');
const Product = require('../models/product');

// Mocked Data
const getMockedProducts = (req, res) => {
  res.status(200).json(fetchProducts());
};

const fetchProducts = () => {
  const filePath = path.resolve('static','products.json');
  const encoding = 'utf-8';

  try {
    const products = fs.readFileSync(filePath, encoding);
    return JSON.parse(products);
  } catch (e) {
    return { message: e };
  }
};

// TODO: Create route to add New Products
const createProduct = (req, res) => {
  const product = new Product({});
}

module.exports = {
  getMockedProducts
};