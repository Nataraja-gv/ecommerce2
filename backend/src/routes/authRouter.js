const express = require("express");
const User = require("../models/authmodel");
const bcrypt = require("bcrypt");
const multer = require(`multer`);
 
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
      const { name, email, password, address } = req.body;
      if (!name || !email || !password || !address) {
        return res.status(400).json({ message: "All fields are required" });
      }

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
       const token =await response.getJWT();
       res.cookie("token",token)
      res.status(201).json({ message: "User created successfully", response });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

module.exports = authRouter;
