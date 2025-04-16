import mongoose from "mongoose";

const contentSectionSchema = new mongoose.Schema({
    type: { type: String, enum: ['text', 'image', 'full-image', 'big-image'], required: true },
    content: { type: String },
    imageId: { type: String }
});

const servicescontentSectionSchema = new mongoose.Schema({
    content:
    [{
        cardheading: { type: String },
        description: { type: String },
    }],
    gallery: [{
        imageId: { type: String }
    }]
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
    heading: { type: String },
    description: { type: String },
});

const BannerfieldSectionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['banner', 'video', 'slider'],
        required: true
    },
    imageId: { type: String }, // For single images (banner/video)
    sliderImages: [{ type: String }] // Array for slider images
}, { _id: true }); // Ensure each gets its own _id
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
    Bannerdata: [BannerfieldSectionSchema],
    WhydoNeed: [WhydoNeedSectionSchema],
    Process: [ProcessSectionSchema],
    WhyAtrix: [WhyAtrixSectionSchema], // Changed to array
    servicescontent: [servicescontentSectionSchema],
    portfolioCategories: {
        type: [String], // Changed to array of strings
        default: []
    },
    faqCategories: {
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