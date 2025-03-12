const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
    
  },
  category_photo_url: {
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
},{ timestamps: true });


const Category = mongoose.model("Category",categorySchema)

module.exports= Category;