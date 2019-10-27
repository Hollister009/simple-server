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
  const { body, body: { sizes } } = req;
  let updatedSizes;

  if (sizes) {
    updatedSizes = sizes.map(s => {;
      if (typeof s === 'string') {
        return s.toLowerCase();
      }
      return s;
    });
  }

  const product = new Products({
    ...body,
    sizes: updatedSizes || sizes
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT method
const updateProduct = async (req, res) => {
  const { product, body } = req;

  try {
    product.updatedAt = Date.now();

    Object.keys(body)
      .forEach(key => {
        if (key !== 'createdAt' && key !== 'updatedAt') {
          product[key] = body[key];
        }
      });

    await product.save(err => {
      if (err) {
        throw new Error(err.message, err.status, 'Update Product');
      }
      res.status(200).json(product);
    })

  } catch (err) {
    res.status(503).json({ error: err.message })
  }
}

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
  createProduct,
  updateProduct,
  removeProduct,
  getAllProducts,
  findProductById,
  getMockedProducts
};