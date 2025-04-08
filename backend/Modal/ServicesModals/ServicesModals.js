import mongoose from "mongoose";

const contentSectionSchema = new mongoose.Schema({
    type: { type: String, enum: ['text', 'image', 'full-image', 'big-image'], required: true },
    content: { type: String }, 
    imageId: { type: String }  
  });

const ServicesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    
    FeaturedImage: {
        type: String,
        required: true
    },

    contentSections: [contentSectionSchema],
    
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Services = mongoose.model("Services", ServicesSchema)

export default Services;