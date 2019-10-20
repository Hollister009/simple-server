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

module.exports = {
  getBrands
};
