const fs = require('fs');
const path = require('path');
const Product = require('../models/product');

// Mocked Data
const getMockedProducts = (req, res) => {
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
  res.status(200).json(fetchProducts());
};

// GET method
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).exec();
    res.json(products);
  } catch (e) {
    res.status(500).json({ message: err.message });
  }
};

// POST method
const createProduct = async (req, res) => {
  const product = new Product({
    productName: req.body.name,
    description: req.body.description,
    brand: req.body.brand,
    category: req.body.category,
    sizes: req.body.sizes,
    colors: req.body.colors,
    genders: req.body.genders,
    season: req.body.season,
    images: req.body.images,
    collection: req.body.collection,
    quantity: req.body.quantity,
    sellCount: req.body.sellCount,
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
  createProduct,
  getAllProducts
};