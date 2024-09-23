const Order = require("../models/order");
const product = require("../models/product");

// controllers for adding, getting and deleting orders

const orderController = {
  async addOrder(req, res) {
    try {
      console.log(req.body);
      const order = new Order(req.body.order);
      if (!order) {
        return res.status(400).send({ error: "Invalid data" });
      }
      //get the highest order number
      const highestOrder = await Order.findOne().sort({ orderNo: -1 });
      let orderNo = 1;
      if (highestOrder) {
        orderNo = highestOrder.orderNo + 1;
      }
      order.orderNo = orderNo;
      order.orderDate = new Date();

      //decrease the quantity of the products
      for (let i = 0; i < order.items.length; i++) {
        const item = order.items[i];
        const productItem = await product.findOne({ itemCode: item.itemCode });
        if (!productItem) {
          return res.status(404).send({ error: "Product not found" });
        }
        productItem.quantity -= item.quantity;
        if (productItem.quantity < 0) {
          return res.status(400).send({ error: "Not enough quantity" });
        }
        await productItem.save();
      }

      await order.save();
      return res.status(201).send({ order });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "Failed to add order" });
    }
  },
  async getOrders(req, res) {
    try {
      const orders = await Order.find();
      return res.status(200).send({ orders });
    } catch (error) {
      return res.status(400).send({ error: "Failed to fetch orders" });
    }
  },
  async deleteOrder(req, res) {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).send({ error: "Order not found" });
      }
      return res.status(200).send({ order });
    } catch (error) {
      return res.status(400).send({ error: "Failed to delete order" });
    }
  },
};

module.exports = orderController;
