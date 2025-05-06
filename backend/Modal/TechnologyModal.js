import mongoose from "mongoose";

const TechnologySchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    FeaturedImage: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
      }
})

const Technology = mongoose.model("Technology",TechnologySchema)

export default Technology;