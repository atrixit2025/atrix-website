import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema({
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
        ref: 'Image',
        required: true

    },
    updatedAt: {
        type: Date,
        default: Date.now
      }
})

const Portfolio = mongoose.model("Portfolio",PortfolioSchema)

export default Portfolio;