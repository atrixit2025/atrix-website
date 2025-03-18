import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
 
    image:{
        type:String,
        require:true
    },

})

const Image = mongoose.model("Image",ImageSchema)

export default Image;