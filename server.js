const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const hsCodeRoutes = require("./routes/hsCodeRoutes");
const authRoutes = require("./routes/authRoutes");
const OrderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 3005;

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/hs-codes", hsCodeRoutes);
app.use("/auth", authRoutes);
app.use("/orders", OrderRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/pasban")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.get("/", (req, res) => {
  res.send("Welcome to Pasban API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
