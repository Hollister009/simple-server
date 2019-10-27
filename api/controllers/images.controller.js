const { Images } = require('../models/images.model');

const getAllImages = async (req, res) => {
  try {
    const images = await Images.find({}).exec();
    res.json(images);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}

const createImage = async (req, res) => {
  const { productId, claudinaryId, productColor } = req.body;
  const images = new Images({ productId, claudinaryId, productColor });

  try {
    const response = await images.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllImages,
  createImage
};
