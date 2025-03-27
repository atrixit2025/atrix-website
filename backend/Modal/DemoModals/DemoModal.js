import mongoose from "mongoose";

const DemoSchema = new mongoose.Schema({
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
    text:{
        type:String,
        require:false
    },
    fullImage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: false

    },
    bigImage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: false

    },
    updatedAt: {
        type: Date,
        default: Date.now
      }
})

const Demo = mongoose.model("Demo",DemoSchema)

export default Demo;