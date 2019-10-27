const { Images } = require('../models/images.model');

// GET method
const getAllImages = async (req, res) => {
  try {
    const images = await Images.find({}).exec();
    res.json(images);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}

// POST method
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

// GET method
const getImageById = (req, res) => {
  const { imageRecord } = req;
  res.send(imageRecord);
}

// GET method
const getImagesByParams = async (req, res) => {
  // TODO:
  // 1. find how to parse request query parameters
  // 2. read doc on mongoose querying
  // 3. return correct response
  // 4. produce correct route
  // 5. document route with swagger
}

// middleware
async function findImageRecord(req, res, next) {
  let imageRecord;
  const { id } = req;

  try {
    imageRecord = await Images.findById(id).exec();

    if (imageRecord === null) {
      res.status(400).json({ message: 'No image record was wound!'});
    }
  } catch(err) {
    res.status(500).json({ message: err.message });
  }

  req.imageRecord = imageRecord;
  next();
}

module.exports = {
  getImageById,
  createImage,
  getAllImages,
  findImageRecord
};
