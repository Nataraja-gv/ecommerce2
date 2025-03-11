const express = require("express");
const User = require("../models/authmodel");
const bcrypt = require("bcrypt");
const multer = require(`multer`);
const validate = require("validator");
const ValidationSignUp = require("../utils/ValidationSignup");
const UserAuth = require("../middleware");

const authRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + " -" + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

authRouter.post(
  "/auth/signup",
  upload.single("photo_url"),
  async (req, res) => {
    try {
      ValidationSignUp(req);
      const { name, email, password, address } = req.body;
      const user = await User.findOne({ email });

      if (user) {
        return res.status(400).json("User already exists");
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: passwordHash,
        address,
        photo_url: {
          filename: req.file.filename,
          path: `uploads/${req.file.filename}`,
          contentType: req.file.mimetype,
        },
      });
      const response = await newUser.save();
      const token = await response.getJWT();
      res.cookie("token", token);
      res
        .status(201)
        .json({ message: "User created successfully", data: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

authRouter.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validate.isEmail(email)) {
      throw new Error("invalid email");
    }
    const LoggedInUser = await User.findOne({ email });
    if (!LoggedInUser) {
      throw new Error("User not found. Please sign up.");
    }

    const isPasswordValid = await LoggedInUser.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error(" Invalid login credentials");
    }

    const token = await LoggedInUser.getJWT();
    res.cookie("token", token);

    res.json({ message: "login sucessfully", data: LoggedInUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

authRouter.post("/auth/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout succesfully");
});

module.exports = authRouter;
