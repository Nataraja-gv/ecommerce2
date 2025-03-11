const validate = require("validator");
const jwt = require("jsonwebtoken");
const User = require("../models/authmodel");

const UserAuth = async (req, res,next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Please Login In");
    }

    
    const decodedObj = await jwt.verify(token, "dev@Ecommerce123");
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user invalid");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = UserAuth;
