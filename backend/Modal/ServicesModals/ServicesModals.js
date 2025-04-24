import mongoose from "mongoose";

const HeadercontentSectionSchema = new mongoose.Schema({
    centerHeading: { type: String },
    centerDescription: { type: String },

    headingAnddescription:
        [{
            heading: { type: String },
            description: { type: String },
            imageId: { type: String },

        }],

});

const textandimageSectionSchema = new mongoose.Schema({
    type: { type: String, enum: ['texttoimage', 'imagetotext'], required: true },
 
        text: { type: String },
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
    heading: { type: String },
    description: { type: String },
});

const BannerfieldSectionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['banner', 'video', 'slider'],
        required: true
    },
    imageId: { type: String },
    sliderImages: [{ type: String }]
}, { _id: true });




const ServicesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    Slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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
    WhyAtrix: [WhyAtrixSectionSchema],
    Headercontent: [HeadercontentSectionSchema],
    gallery: [{
        imageId: { type: String }
    }],
    texttoimageandimagetotext:
    [
        textandimageSectionSchema
    ],
    portfolioCategories: {
        type: [String],
        default: []
    },
    Technology: [{
        title: { type: String },
        imageId: { type: String }
    }],
    faqCategories: {
        type: [String],
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
    Cta:{
        title:{ type: String },
        description: {type: String },
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Services = mongoose.model("Services", ServicesSchema)

export default Services;