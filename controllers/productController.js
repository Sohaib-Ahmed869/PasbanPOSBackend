const product = require("../models/product");

// controllers for the addition, updating and deletion of products

const productController = {
  async addProduct(req, res) {
    try {
      const newproduct = new product(req.body.product);
      if (!newproduct) {
        return res.status(400).send({ error: "Invalid data" });
      }
      //if product already exists
      console.log(newproduct.itemCode);
      const existingProduct = await product.findOne({ itemCode: newproduct.itemCode });
      if (existingProduct) {
        console.log("Product already exists");
        return res.status(410).send({ error: "Product already exists" });
      }


      await newproduct.save();
      return res.status(201).send({ newproduct });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "Failed to add product" });
    }
  },
  async getProducts(req, res) {
    try {
      const products = await product.find();
      return res.status(200).send({ products });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "Failed to fetch products" });
    }
  },
  async updateProductPrice(req, res) {
    try {
      const newPrice = req.body.price;
      const updateproduct = await product.findByIdAndUpdate(req.params.id, {
        price: newPrice,
      });
      if (!updateproduct) {
        return res.status(404).send({ error: "Product not found" });
      }
      return res.status(200).send({ updateproduct });
    } catch (error) {
      return res.status(400).send({ error: "Failed to update product" });
    }
  },
  async deleteProduct(req, res) {
    try {
      const product = await product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).send({ error: "Product not found" });
      }
      return res.status(200).send({ product });
    } catch (error) {
      return res.status(400).send({ error: "Failed to delete product" });
    }
  },
  async increaseQuantity (req, res) {
    try {
      const updateproduct = await product.findById(req.params.id);

      if (!updateproduct) {
        return res.status(404).send({ error: "Product not found" });
      }
      const quantityToNumber = parseInt(req.body.quantity);
      updateproduct.quantity += quantityToNumber;
      await updateproduct.save();
      return res.status(200).send({ updateproduct });
    } catch (error) {
      return res.status(400).send({ error: "Failed to increase quantity" });
    }
  },
};

module.exports = productController;