import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Title is required
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image', // Assuming this is the reference to the Image collection
    required: true, // Image is required
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

