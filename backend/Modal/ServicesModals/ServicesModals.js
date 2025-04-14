import mongoose from "mongoose";

const contentSectionSchema = new mongoose.Schema({
    type: { type: String, enum: ['text', 'image', 'full-image', 'big-image'], required: true },
    content: { type: String },
    imageId: { type: String }
});

const servicescontentSectionSchema = new mongoose.Schema({
    type: { type: String, enum: ['content', 'gallery'], required: true },
    cardheading: { type: String },
    description: { type: String },
    imageId: { type: String }
});

const WhydoNeedSectionSchema = new mongoose.Schema({
    type: { type: String, required: false },
    cardheading: { type: String },
    description: { type: String },
});

const ProcessSectionSchema = new mongoose.Schema({
    type: { type: String, required: false },
    cardheading: { type: String },
    description: { type: String },
});

const WhyAtrixSectionSchema = new mongoose.Schema({
    type: { type: String, required: false }, 
    title: { type: String },
    description: { type: String },
});

const BannerfieldSectionSchema = new mongoose.Schema({
    type: {
        type: String, enum: ['Banner', 'video', 'sider-image'], //only one slected 
        required: true
    },
    imageId: { type: String }
});

const ServicesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Servicesquote: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    Bannerdata: [// Changed to match input data
        BannerfieldSectionSchema
    ],
    WhydoNeed: [WhydoNeedSectionSchema],
    Process: [ProcessSectionSchema],
    WhyAtrix: [WhyAtrixSectionSchema], // Changed to array
    servicescontent: [servicescontentSectionSchema],
    portfolioCategories: {
        type: [String], // Changed to array of strings
        default: []
    },
    iconImageId: {
        type: String,
        required: true
    },
    FeaturedImage: {
        type: String,
        required: true
    },
    contentSections: [contentSectionSchema],
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Services = mongoose.model("Services", ServicesSchema)

export default Services;