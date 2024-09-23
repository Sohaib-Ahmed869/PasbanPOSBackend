const User = require("../models/user");
const jwt = require("jsonwebtoken");

//controllers for registering and logging in users

const authController = {
  async register(req, res) {
    try {
      const user = new User(req.body);
      if (!user) {
        return res.status(400).send({ error: "Invalid data" });
      }
      //check if username already exists with same role
      const existingUser = await User.findOne({
        username: user.username,
        role: user.role,
      });
      if (existingUser) {
        return res.status(400).send({ error: "User already exists" });
      }
      await user.save();
      return res.status(201).send({ user });
    } catch (error) {
      return res.status(400).send({ error: "Registration failed" });
    }
  },
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        username,
        password,
      });
      if (!user) {
        return res.status(400).send({ error: "Invalid credentials" });
      }
      const token = jwt.sign(
        { username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).send({ user, token });
    } catch (error) {
      return res.status(400).send({ error: "Login failed" });
    }
  },
};

module.exports = authController;
