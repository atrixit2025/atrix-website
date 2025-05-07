import mongoose from "mongoose";

const contentSectionSchema = new mongoose.Schema({
    type: { type: String, enum: ['text', 'image', 'full-image', 'big-image'], required: true },
    content: { type: String }, 
    imageUrl: { type: String }  
  });

const PortfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    Slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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

const Portfolio = mongoose.model("Portfolio", PortfolioSchema)

export default Portfolio;