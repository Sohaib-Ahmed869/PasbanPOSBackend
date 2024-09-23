const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.post("/", productController.addProduct);
router.get("/", productController.getProducts);
router.put("/:id", productController.updateProductPrice);
router.delete("/:id", productController.deleteProduct);
router.put("/quantity/:id", productController.increaseQuantity);

module.exports = router;
