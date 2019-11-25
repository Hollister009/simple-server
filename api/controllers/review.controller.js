const { Review } = require("../models/review.model");

// GET method
const getReview = (req, res) => {
  res.json(req.review);
};

// GET method
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().exec();

    if (!reviews) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST method
const createReview = async (req, res) => {
  const { title, productId, createdBy, message, rating } = req.body;
  const review = new Review({ title, productId, createdBy, message, rating });

  try {
    const response = await review.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE method
const removeReview = async (req, res) => {
  const { review } = req;

  try {
    await review.remove();
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT method
const updateReview = async (req, res) => {
  const { review, body } = req;

  try {
    Object.keys(body).forEach(key => {
      review[key] = body[key];
    });

    await review.save(err => {
      if (err) {
        throw new Error(err.message);
      }
      res.status(200).json(review);
    });
  } catch (err) {
    res.status(503).json({ error: err.message });
  }
};

// middleware
async function findReviewById(req, res, next) {
  let review;
  const { id } = req.params;

  try {
    review = await Review.findById(id).exec();

    if (!review) {
      return res.status(400).json({ message: "Review not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  req.review = review;
  next();
}

module.exports = {
  getReview,
  getReviews,
  createReview,
  removeReview,
  findReviewById,
  updateReview
};
