const User = require("../models/user");

exports.getAllUsers = async () => {
  return await User.find();
};

exports.createUser = async () => {
  const user = new User({
    username: "testUser",
    password: "testPassword",
    email: "dbsd@db.dfhd",
  });
  return await user.save();
};
