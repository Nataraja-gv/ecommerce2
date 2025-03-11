const express = require("express");
const multer = require("multer");
const Category = require("../models/category");

const categoryRouter = express.Router();

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

categoryRouter.post(
  "/category/new",
  uploads.single("category_photo_url"),
  async (req, res) => {
    try {
      const { category_name } = req.body;

      if (!category_name) {
        return res.status(400).json({ message: "Category name is required" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Category photo is required" });
      }

      // Check if category already exists
      const verifyCategory = await Category.findOne({ category_name });
      if (verifyCategory) {
        return res.status(400).json({ message: "Category already exists" });
      }

      // Save the category with the uploaded file
      const categoryData = new Category({
        category_name,
        category_photo_url: {
          filename: req.file.filename,
          path: `uploads/${req.file.filename}`,
          contentType: req.file.mimetype,
        },
      });

      const response = await categoryData.save();
      res.json({ message: "Category added", data: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

categoryRouter.get("/category/all", async (req, res) => {
  try {
    const all_category = await Category.find();
    res.json({ message: "All category Details", data: all_category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

categoryRouter.patch(
  "/category/edit",
  uploads.single("category_photo_url"),
  async (req, res) => {
    try {
      const { category_name } = req.body;
      if (!category_name) {
        return res.status(400).json({ message: "Category name is required" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Category photo is required" });
      }
      const _id = req.query._id;

      const categoryById = await Category.findById({ _id });
      if (!categoryById) {
        return res.status(400).json({ message: "Invalid ID" });
      }
     

      let photoUrl = null;
      if (req.file) {
        photoUrl = {
          filename: req.file.filename,
          path: `uploads/${req.file.filename}`,
          contentType: req.file.mimetype,
        };
      }

      const data = {
        category_name: req.body.category_name,
        category_photo_url: photoUrl,
      };

      const updateCategory = await Category.findByIdAndUpdate(
        { _id: categoryById._id },
        data,
        {
          new: true,
        }
      );
      res.json({ message: "category updated", data: updateCategory });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = categoryRouter;
