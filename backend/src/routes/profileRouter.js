const express = require("express");
const UserAuth = require("../middleware");
const validateProfileData = require("../utils/validProfileData");
const multer = require("multer");
const User = require("../models/authmodel");

const profileRoute = express.Router();
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

profileRoute.get("/profile/view", UserAuth, async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      res.json({ message: "User Profile Details", data: user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

profileRoute.patch(
  "/profile/edit",
  UserAuth,
  upload.single("photo_url"),
  async (req, res) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res
          .status(400)
          .json({ message: "Invalid request, body is empty" });
      }

      if (!validateProfileData(req)) {
        return res.status(400).json({ message: "Invalid  field Edit request" });
      }
      const user = req.user;
      let photoUrl = null;
      if (req.file) {
        photoUrl = {
          filename: req.file.filename,
          path: `uploads/${req.file.filename}` ,
          contentType: req.file.mimetype,
        };
      }

      
      const updatedData = {
        name: req.body.name || user.name, 
        address: req.body.address || user.address,  
        photo_url: photoUrl|| user.photo_url, 
      };

       
      const updatedUser = await User.findByIdAndUpdate(user._id, updatedData,{
        new:true
      });

      res.status(200).json({
        message: "Profile updated successfully",
        data: updatedUser,  
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = profileRoute;
