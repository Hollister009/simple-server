const { Brands } = require('../models/brands.model');

const getBrands = async (req, res) => {
  try {
    const brands = await Brands.find().exec();

    if (brands) {
      res.json(brands);
    }

  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}

const createBrand = async (req, res) => {
  const { title, logo } = req.body;
  const brand = new Brands({ title, logo });

  try {
    const response = await brand.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getBrands,
  createBrand
};
