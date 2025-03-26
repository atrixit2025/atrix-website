import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },

    image:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: true

    },
    updatedAt: {
        type: Date,
        default: Date.now
      }
})

const Blog = mongoose.model("Blog",BlogSchema)

export default Blog;