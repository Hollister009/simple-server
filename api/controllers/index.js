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

// POST method
const createProduct = async (req, res) => {
  const product = new Product({
    productName: req.body.name,
    description: req.body.description,
    brand: req.body.brand,
    sizes: req.body.sizes,
    colors: req.body.colors,
    images: req.body.images,
    sex: req.body.sex,
    category: req.body.category,
    season: req.body.season,
    quantity: req.body.quantity,
    price: req.body.price,
    video: req.body.video
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getMockedProducts,
  createProduct
};