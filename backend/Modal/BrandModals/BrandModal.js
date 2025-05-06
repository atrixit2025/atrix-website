import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Title is required
  },
  FeaturedImage: {
    type: String,
    required: true
},
  link: {
    type: String,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Brand = mongoose.model("Brand", BrandSchema);

export default Brand;

