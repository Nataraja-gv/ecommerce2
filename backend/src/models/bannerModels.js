const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  banner_images: {
    filename: { type: String, required: true },
    path: { type: String, required: true },
    contentType: { type: String, required: true },
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  status: {
    type: Boolean,
    default: true,
  },
},{timestamps:true});

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
