const User = require("../models/user");

//controllers for getting cashiers, updating user, and deleting user

const userController = {
  async getCashiers(req, res) {
    try {
      const users = await User.find({ role: "cashier" });
      return res.status(200).send({ users });
    } catch (error) {
      return res.status(400).send({ error: "Failed to fetch users" });
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      return res.status(200).send({ user });
    } catch (error) {
      return res.status(400).send({ error: "Failed to update user" });
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      return res.status(200).send({ user });
    } catch (error) {
      return res.status(400).send({ error: "Failed to delete user" });
    }
  },
};

module.exports = userController;
