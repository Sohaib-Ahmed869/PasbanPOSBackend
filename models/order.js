const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNo: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  customer: {
    type: String,
    required: false,
  },
  items: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: false,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;