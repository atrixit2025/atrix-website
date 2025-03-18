import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    Description:{
        type:String,
        require:true
    },
    Slug: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
      },
})

const Category = mongoose.model("Category",CategorySchema)

export default Category;