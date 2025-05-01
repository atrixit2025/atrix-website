// import mongoose from "mongoose";

// const ImageSchema = new mongoose.Schema({
 
//     image:{
//         type:String,
//         require:true
//     },

// })

// const Image = mongoose.model("Image",ImageSchema)

// export default Image;


import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    file: {
      type: String,
      required: true
    },
    type: { 
      type: String, 
      enum: ['image', 'video'], 
      required: true 
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

const file = mongoose.model("file",fileSchema)

export default file;