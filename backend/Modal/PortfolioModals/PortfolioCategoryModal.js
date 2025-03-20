import mongoose from "mongoose";

const PortfolioCategorySchema = new mongoose.Schema({
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
    ref: "PortfolioCategory", 
    default: null, 
  },
});

const PortfolioCategory = mongoose.model("PortfolioCategory", PortfolioCategorySchema);

export default PortfolioCategory;