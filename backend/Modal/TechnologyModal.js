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
    image:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'file',
        required: true

    },
    updatedAt: {
        type: Date,
        default: Date.now
      }
})

const Technology = mongoose.model("Technology",TechnologySchema)

export default Technology;