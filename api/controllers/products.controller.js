const fs = require('fs');
const path = require('path');
const { Products } = require('../models/products.model');

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
const getProduct = (req, res) => {
  res.json(req.product);
}

// POST method
const createProduct = async (req, res) => {
  const {
    title, description, brandId, category, sizes, colors, genders, seasons, imageIds, collectionIds, quantity, sellCount, price, video
  } = req.body;

  const product = new Products({
    title,
    description,
    brandId,
    category,
    sizes,
    colors,
    genders,
    seasons,
    imageIds,
    collectionIds,
    quantity,
    sellCount,
    price,
    video
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE method
const removeProduct = async (req, res) => {
  const { product } = req;

  try {
    const deletedProduct = await product.remove();
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET method
const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({}).exec();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function findProductById(req, res, next) {
  let product;
  const { id } = req.params;

  try {
    product = await Products.findById(id).exec();

    if (product === null) {
      return res.status(400).json({ message: 'Product not found'})
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  req.product = product;
  next();
};

module.exports = {
  getProduct,
  removeProduct,
  createProduct,
  getAllProducts,
  findProductById,
  getMockedProducts
};