import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },

    
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const FAQ = mongoose.model("FAQ", FAQSchema)

export default FAQ;