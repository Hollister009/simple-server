const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: String,
  productId: String,
  createdBy: String,
  message: String,
  rating: Number,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model('Review', reviewSchema);