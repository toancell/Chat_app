const UserModel = require("../models/userModel");

const searchUser = async (req, res) => {
  try {
    const { search } = req.body;
    const searchQuery = new RegExp(search, "i","g");
    const user = await UserModel.find({
      $or: [{ name: { $regex: searchQuery } },
        { email: { $regex: searchQuery } },],
    }).limit(10);
    
    return res.status(200).json({
      data: user,
      success: true,
    });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};
module.exports = searchUser;
