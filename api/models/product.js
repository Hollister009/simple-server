const mongoose = requrie('mongoose');

const productSchema = new mongoose.Schema({
  productName: String,
  description: String,
  colors: [{
    value: String,
    url: String
  }],
  brand: String,
  sizes: [String],
  category: String,
  quantity: Number,
  price: Number,
})

module.exports = mongoose.model('Product', productSchema);