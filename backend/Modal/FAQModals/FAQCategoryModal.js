import mongoose from "mongoose";

const FAQCategorySchema = new mongoose.Schema({
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
    ref: "FAQCategory", 
    default: null, 
  },
});

const FAQCategory = mongoose.model("FAQCategory", FAQCategorySchema);

export default FAQCategory;