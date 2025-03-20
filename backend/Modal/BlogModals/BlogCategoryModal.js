import mongoose from "mongoose";

const BlogCategorySchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  ParentCategory: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "BlogCategory", 
    default: null, 
  },
});

const BlogCategory = mongoose.model("BlogCategory", BlogCategorySchema);

export default BlogCategory;