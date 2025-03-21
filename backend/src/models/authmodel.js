const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const AuthSchema = new mongoose.Schema({
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
  photo_url: {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
  },
  address: {
    type: String,
  },
  orderList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

AuthSchema.methods.getJWT = async function () {
  const  user = this;
  const token = await jwt.sign({ _id: user._id }, "dev@Ecommerce123", {
    expiresIn: "1d",
  });
  return token;
};

AuthSchema.methods.validatePassword = async function (password) {
  const user = this;
   const validPassword = await bcrypt.compare(password, user.password);
  return validPassword
}

const User = mongoose.model("users", AuthSchema);

module.exports = User;
