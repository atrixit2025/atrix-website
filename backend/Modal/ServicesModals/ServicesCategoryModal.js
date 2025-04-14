import mongoose from "mongoose";

const ServicesCategorySchema = new mongoose.Schema({
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
    ref: "ServicesCategory", 
    default: null, 
  },
});

const ServicesCategory = mongoose.model("ServicesCategory", ServicesCategorySchema);

export default ServicesCategory;