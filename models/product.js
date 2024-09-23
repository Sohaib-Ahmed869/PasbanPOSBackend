const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  itemCode: {
    type: String,
    required: true,
  },
  hsCode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sp0: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;