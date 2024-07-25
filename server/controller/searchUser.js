const UserModel = require("../models/userModel");

const searchUser = async (req, res) => {
  try {
    const { search } = req.body;
    const searchQuery = new RegExp(search, "ig");
    const user = await UserModel.find({
      $or: [{ name: searchQuery }, { email: searchQuery }],
    }).limit(10);
    return res.status(200).json({
      data: user,
    });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
module.exports = searchUser;
