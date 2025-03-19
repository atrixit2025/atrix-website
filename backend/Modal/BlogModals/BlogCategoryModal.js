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
    type: mongoose.Schema.Types.ObjectId, // Reference to another BlogCategory
    ref: "BlogCategory", // Reference the same model
    default: null, // No parent by default
  },
});

const BlogCategory = mongoose.model("BlogCategory", BlogCategorySchema);

export default BlogCategory;