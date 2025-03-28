import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    text:{
        type: String,
        default: ""
    },
    FeaturedImage: {
        type: String,
        required: true
    },
    image: {
        type: String
    }, 
    fullImage: {
        type: String
    },
    bigImage: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Blog = mongoose.model("Blog", BlogSchema)

export default Blog;