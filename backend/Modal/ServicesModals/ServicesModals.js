import mongoose from "mongoose";

const HeadercontentSectionSchema = new mongoose.Schema({
    centerHeading: { type: String },
    centerDescription: { type: String },

    headingAnddescription:
        [{
            heading: { type: String },
            description: { type: String },
            imageUrl: { type: String },

        }],

});

const textandimageSectionSchema = new mongoose.Schema({
    type: { type: String, enum: ['texttoimage', 'imagetotext'], required: true },
 
        text: { type: String },
        imageUrl: { type: String }

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
    imageUrl: { type: String },
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
    FeaturedImage: {
        type: String,
        required: true
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
 
    Headercontent: [HeadercontentSectionSchema],
   
    texttoimageandimagetotext:
    [
        textandimageSectionSchema
    ],
    WhydoNeed: [WhydoNeedSectionSchema],
    Process: [ProcessSectionSchema],
    WhyAtrix: [WhyAtrixSectionSchema],
    portfolioCategories: {
        type: [String],
        default: []
    },
    Technology: [{
        title: { type: String },
        imageUrl: { type: String }
    }],
    faqCategories: {
        type: [String],
        default: []
    },
    iconImageUrl: {
        type: String,
        required: true
    },

    Cta:{
        title:{ type: String },
        description: {type: String },
    },
    Servicesquote: {
        type: String,
    },
    gallery: [{
        imageUrl: { type: String }
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Services = mongoose.model("Services", ServicesSchema)

export default Services;