const fs = require('fs');
const path = require('path');

const { Products } = require('../models/products.model');
const { multipleSearchQuery, rangeQuery } = require('../utils/recomposeQuery');
const { PRODUCT_FILTER_QUERY, RANGE_QUERY, ID_QUERY } = require('../constant/queryTypes');
const { getProductFilterPipeline, getPaginationPipeline } = require('../utils/pipelines');

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

  if (Array.isArray(sizes)) {
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
    await product.remove();
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET method
const getProductFilter = (query) => {
  let filter = {};

  Object.keys(query).forEach((item) => {
    const isFilterQuery = PRODUCT_FILTER_QUERY.includes(item);
    if (!isFilterQuery) return;

    const isRangeQuery = RANGE_QUERY.includes(item);
    const isIdQuery = ID_QUERY.includes(item);
    const param = isRangeQuery ? rangeQuery(query[item]) : multipleSearchQuery(item, query[item], isIdQuery);

    filter = Object.assign(filter, param);
  });

  return filter;
}

// GET method
const getProducts = async (req, res) => {
  const filter = getProductFilter(req.query);
  const { page, limit } = req.query;
  const pageParam = page ? parseInt(page, 10) : 0;
  const limitParam = limit ? parseInt(limit, 10) : 20;

  const aggregationPipeline = getProductFilterPipeline(filter);
  const paginationPipeline = getPaginationPipeline(pageParam, limitParam);

  try {
    const products = await Products.aggregate([...aggregationPipeline, ...paginationPipeline]).exec();
    const count = await Products.aggregate([...aggregationPipeline, { $count: "count" }]).exec();

    if (!products || !count) {
      res.status(404).json({ error: "Not found" })
    }

    res.json({ products, count: count[0].count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// middleware
async function findProductById(req, res, next) {
  let product;
  const { id } = req.params;

  try {
    product = await Products.findById(id).exec();

    if (!product) {
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
  getProducts,
  updateProduct,
  removeProduct,
  findProductById,
  getMockedProducts
};
