const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validator(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Password should be strong");
      }
    },
  },
});

adminSchema.methods.getAdminJWT = async function () {
  const admin = this;
  const token = await jwt.sign({ _id: admin._id }, "admin@Dev", {
    expiresIn: "1d",
  });
  return token;
};

adminSchema.methods.validAdminPassword = async function (password) {
  const admin = this;
  const isValid = await bcrypt.compare(password, admin.password);
  return isValid;
};
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
