const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const Banner = require("../models/bannerModels");
const Category = require("../models/categorymodel");
const AdminAuth = require("../middleware/adminIndex");

const BannerRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + " -" + file.originalname;
    cb(null, filename);
  },
});

const uploads = multer({ storage: storage });

BannerRouter.post(
  "/banner/new",
  AdminAuth,
  uploads.single("banner_images"),
  async (req, res) => {
    try {
      const { category, status } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "Banner image is required" });
      }

      if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      const BannerDetails = new Banner({
        banner_images: {
          filename: req.file.filename,
          path: `http://localhost:7777/uploads/${req.file.filename}`,
          contentType: req.file.mimetype,
        },
        category,
        status,
      });

      const response = await BannerDetails.save();
      res.json({ message: "Banner added", data: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

BannerRouter.patch(
  "/banner/edit",
  AdminAuth,
  uploads.single("banner_images"),
  async (req, res) => {
    try {
      const { category, status, banner_images } = req.body;
     if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      const _id = req.query._id;
      const BannerId = await Banner.findById({ _id });
      if (!BannerId) {
        return res.status(400).json({ message: " Banner Invalid ID" });
      }

      if(!status){
        return res.status(400).json({ message: "status required" });
       }

      let photoUrl = BannerId.banner_images;
      if (req.file) {
        photoUrl = {
          filename: req.file.filename,
          path: `http://localhost:7777/uploads/${req.file.filename}`,
          contentType: req.file.mimetype,
        };
      } else if (banner_images) {
        photoUrl = JSON.parse(banner_images);
      }

      const data = {
        banner_images: photoUrl,
        category,
        status,
      };

      const responseData = await Banner.findByIdAndUpdate(
        { _id: BannerId._id },
        data,
        { new: true }
      );
      res.json({ message: "updated banner", data: responseData });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

BannerRouter.get("/banner/all", AdminAuth, async (req, res) => {
  try {
    const allBanner = await Banner.find().populate("category");
    res.json({ message: "All Banner details ", data: allBanner });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = BannerRouter;
