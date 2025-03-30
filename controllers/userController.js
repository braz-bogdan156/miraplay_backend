const userService = require("../services/userService");

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};