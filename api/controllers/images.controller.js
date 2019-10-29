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
  res.json(imageRecord);
}

// PUT method
const updateImage = async (req, res) => {
  const { imageRecord, body } = req;

  try {
    Object.keys(body).forEach(key => {
      imageRecord[key] = body[key];
    });

    await imageRecord.save(err => {
      if (err) {
        throw new Error(err.message, err.status, 'Update Image record');
      }
    });

    res.status(200).json(imageRecord);
  } catch(err) {
    res.status(503).json({ message: err.message });
  }
};

// DELETE method
const removeImage = async (req, res) => {
  const { imageRecord } = req;

  try {
    await imageRecord.remove();
    res.status(200).json(imageRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// middleware
async function findImageRecord(req, res, next) {
  let imageRecord;
  const { id } = req.params;

  try {
    imageRecord = await Images.findById(id).exec();

    if (!imageRecord) {
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
  updateImage,
  removeImage,
  getAllImages,
  findImageRecord
};
