import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
 
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

const Brand = mongoose.model("Brand",BrandSchema)

export default Brand;