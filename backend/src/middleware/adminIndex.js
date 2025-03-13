const jwt = require("jsonwebtoken");
const Admin = require("../models/adminmodel");

const AdminAuth = async (req, res, next) => {
  try {
    const { adminToken } = req.cookies;
    if (!adminToken) {
      throw new Error("Please Login In");
    }
    const decodedObj = await jwt.verify(adminToken, "admin@Dev");
    const { _id } = decodedObj;

    const user = await Admin.findById(_id);
    if (!user) {
      throw new Error("Admin invalid");
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = AdminAuth;
