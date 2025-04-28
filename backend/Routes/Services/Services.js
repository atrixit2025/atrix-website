import express from "express";
import cors from "cors";
import Services from "../../Modal/ServicesModals/ServicesModals.js";
const app = express();
app.use(cors());
app.use(express.json());

const ServicesRouter = express.Router();

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")       // spaces to dashes
    .replace(/[^\w\-]+/g, "");  // remove non-word characters
};


ServicesRouter.post("/add", async (req, res) => {
  const {
    title,
    Slug: customSlug,
    description,
    Servicesquote,
    category,
    tags,
    portfolioCategories,
    faqCategories,
    Technology ,
    iconImageId,
    FeaturedImageId,
    Bannerdata,
    WhydoNeed,
    Process,
    WhyAtrix,
    Headercontent, 
    texttoimageandimagetotext,
    Cta ,
    gallery,       
  } = req.body;


  // Enhanced validation
  if (!title || !description || !category || !FeaturedImageId) {
    return res.status(400).json({
      message: "Title, description, category, and featured image are required"
    });
  }

  // Validate content arrays
  const validateArray = (arr, fieldName) => {
    if (arr && !Array.isArray(arr)) {
      throw new Error(`${fieldName} must be an array if provided`);
    }
    return Array.isArray(arr) ? arr : [];
  };

  try {
    let slug = customSlug || generateSlug(title);
    let slugExists = await Services.findOne({ Slug: slug });
    
    if (slugExists) {
      slug = `${slug}-${Date.now()}`;
    }
    
    
    const sanitized = {
      portfolioCategories: validateArray(portfolioCategories, 'portfolioCategories'),
      faqCategories: validateArray(faqCategories, 'faqCategories'),
      tags: validateArray(tags, 'tags'),
      Bannerdata: validateArray(Bannerdata, 'Bannerdata'),
      WhydoNeed: validateArray(WhydoNeed, 'WhydoNeed'),
      Process: validateArray(Process, 'Process'),


      WhyAtrix: validateArray(WhyAtrix, 'WhyAtrix'),
      Headercontent: validateHeadercontent(validateArray(Headercontent, 'Headercontent')),
      gallery: validateGallery(validateArray(gallery, 'gallery'))
    };
    const validateCta = (cta) => {
      return {
        title: cta?.title || '',
        description: cta?.description || ''
      };
    };
  
    const validateTechnology = (data) => {
      if (!Array.isArray(data)) return [];
    
      return data.map(item => ({
        title: item.title || '',
        imageId: item.imageId || null
      }));
    };
  
    const validateTextToImage = (data) => {
      if (!Array.isArray(data)) return [];
      
      return data.map(item => ({
        type: ['texttoimage', 'imagetotext'].includes(item.type) ? item.type : 'texttoimage',
        text: item.text || '',
        imageId: item.imageId || null
      })).filter(item => item.text || item.imageId);
    };
    // Create new service document
    const newServices = new Services({
      title,
      Slug: slug, 
      description,
      Servicesquote: Servicesquote || "",
      category,
      tags: sanitized.tags,
      Bannerdata: validateBannerdata(sanitized.Bannerdata),
      WhydoNeed: sanitized.WhydoNeed,
      Process: sanitized.Process,
      WhyAtrix: sanitized.WhyAtrix,
      portfolioCategories: sanitized.portfolioCategories,
      faqCategories: sanitized.faqCategories,
      iconImageId: iconImageId || null,
      FeaturedImage: FeaturedImageId,
      Headercontent: sanitized.Headercontent, 
      texttoimageandimagetotext: validateTextToImage(texttoimageandimagetotext),
      Technology: validateTechnology(Technology),
      Cta: validateCta(Cta),

      gallery: sanitized.gallery,           
      updatedAt: new Date()
    });
    
    

    function validateBannerdata(bannerDataArr) {
      if (!Array.isArray(bannerDataArr)) {
        throw new Error("Bannerdata must be an array");
      }

      const allowedTypes = ['banner', 'video', 'slider'];
      const maxSliderImages = 4;

      return bannerDataArr.map(item => {
        if (!allowedTypes.includes(item.type)) {
          throw new Error(`Invalid Bannerdata type: ${item.type}`);
        }


        if (item.type === 'slider') {
          if (!item.sliderImages || !Array.isArray(item.sliderImages)) {
            throw new Error("Slider type must have sliderImages array");
          }


          const validImages = item.sliderImages
            .filter(img => img && typeof img === 'string')
            .slice(0, maxSliderImages);

          if (validImages.length === 0) {
            throw new Error("Slider must have at least one valid image");
          }

          return {
            type: item.type,
            sliderImages: validImages
          };
        }

        else {
          if (!item.imageId || typeof item.imageId !== 'string') {
            throw new Error(`${item.type} type must have a valid imageId`);
          }
          return {
            type: item.type,
            imageId: item.imageId
          };
        }
      });
    }
    

    function validateHeadercontent(headerContentArr) {
      if (headerContentArr.length > 1) {
        throw new Error("Only one Headercontent section allowed");
      }

      if (headerContentArr.length === 0) {
        return [];
      }

      const content = headerContentArr[0];

      return [{
        centerHeading: content.centerHeading || "",
        centerDescription: content.centerDescription || "",
        headingAnddescription: validateHeadingDescription(content.headingAnddescription || [])
      }];
    }

    function validateHeadingDescription(items) {
      if (!Array.isArray(items)) {
        throw new Error("headingAnddescription must be an array");
      }

      return items.map(item => ({
        heading: item.heading || "",
        description: item.description || "",
        imageId: item.imageId || null
      }));
    }



    function validateGallery(galleryArr) {
     
      if (!Array.isArray(galleryArr)) {
        throw new Error("Gallery must be an array");
      }
    
      return galleryArr.map(img => ({
        imageId: img.imageId || ""
      }));
    }
    


    const savedServices = await newServices.save();
    res.status(201).json({
      message: 'Service created successfully',
      service: savedServices
    });

  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({
      message: 'Error creating service',
      error: error.message,
      ...(error.errors && { details: error.errors })
    });
  }
});

ServicesRouter.get("/get", async (req, res) => {
  try {
    const Servicess = await Services.find({}).populate('FeaturedImage', 'url'); // Assuming you have a reference
    // if (!Servicess.length) {
    //   return res.status(404).json({ message: "No Services found" });
    // }

    // Map Servicess to include image URLs
    const ServicessWithUrls = Servicess.map(Services => ({
      ...Services.toObject(),
      FeaturedImageUrl: Services.FeaturedImage?.url || null
    }));

    return res.json({ Services: ServicessWithUrls });
  } catch (error) {
    console.error("Error fetching Services:", error);
    return res.status(500).json({ message: "Error fetching Services", error: error.message });
  }
});


// ServicesRouter.put("/edit", async (req, res) => {
//   const { id, title, category,text, imageId } = req.body; 

//   if (!id || !title || !category ||! text|| !imageId) {
//     return res.status(400).json({ message: "ID, title, category,text, and imageId are required" });
//   }

//   try {

//     const existingServices = await Services.findById(id);
//     if (!existingServices) {
//       return res.status(404).json({ message: "Services not found" });
//     }

//     existingServices.title = title;
//     existingServices.category = category;
//     existingServices.text = text;

//     existingServices.image = imageId;

//     const updatedServices = await existingServices.save();

//     res.status(200).json({ message: "Services updated successfully", Services: updatedServices });
//   } catch (error) {
//     console.error("Error updating Services:", error);
//     res.status(500).json({ message: "Error updating Services", error: error.message });
//   }
// });

ServicesRouter.put("/edit", async (req, res) => {
  const {
    id,
    title,
    Slug: customSlug,
    description,
    Servicesquote,
    category,
    tags,
    portfolioCategories,
    faqCategories,
    Technology,
    iconImageId,
    FeaturedImageId,
    Bannerdata,
    WhydoNeed,
    Process,
    WhyAtrix,
    Headercontent,
    gallery,
    Cta,
    texttoimageandimagetotext
  } = req.body;

  // Basic validation - only ID is absolutely required
  if (!id) {
    return res.status(400).json({ message: "Service ID is required" });
  }

  try {
    // Get the existing service
    const existingService = await Services.findById(id);
    if (!existingService) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Reuse your validation functions from the add route
    const validateArray = (arr, fieldName) => {
      if (arr && !Array.isArray(arr)) {
        throw new Error(`${fieldName} must be an array if provided`);
      }
      return Array.isArray(arr) ? arr : undefined; // Return undefined if not provided
    };

    // Prepare update data - only update what's provided
    const updateData = {
      title: title !== undefined ? title : existingService.title,
      Slug: customSlug !== undefined ? customSlug : existingService.Slug,
      description: description !== undefined ? description : existingService.description,
      Servicesquote: Servicesquote !== undefined ? Servicesquote : existingService.Servicesquote,
      category: category !== undefined ? category : existingService.category,
      tags: tags !== undefined ? validateArray(tags, 'tags') : existingService.tags,
      portfolioCategories: portfolioCategories !== undefined 
        ? validateArray(portfolioCategories, 'portfolioCategories') 
        : existingService.portfolioCategories,
      faqCategories: faqCategories !== undefined 
        ? validateArray(faqCategories, 'faqCategories') 
        : existingService.faqCategories,
      iconImageId: iconImageId !== undefined ? iconImageId : existingService.iconImageId,
      FeaturedImage: FeaturedImageId !== undefined ? FeaturedImageId : existingService.FeaturedImage,
      Cta: Cta !== undefined ? Cta : existingService.Cta,
      updatedAt: new Date()
    };

    // Handle complex fields if provided
    if (Bannerdata !== undefined) {
      updateData.Bannerdata = validateBannerdata(validateArray(Bannerdata, 'Bannerdata'));
    }
    if (WhydoNeed !== undefined) {
      updateData.WhydoNeed = validateArray(WhydoNeed, 'WhydoNeed');
    }
    if (Process !== undefined) {
      updateData.Process = validateArray(Process, 'Process');
    }
    if (WhyAtrix !== undefined) {
      updateData.WhyAtrix = validateArray(WhyAtrix, 'WhyAtrix');
    }
    if (Headercontent !== undefined) {
      updateData.Headercontent = validateHeadercontent(validateArray(Headercontent, 'Headercontent'));
    }
    if (gallery !== undefined) {
      updateData.gallery = validateGallery(validateArray(gallery, 'gallery'));
    }
    if (texttoimageandimagetotext !== undefined) {
      updateData.texttoimageandimagetotext = validateTextToImage(texttoimageandimagetotext);
    }
    if (Technology !== undefined) {
      updateData.Technology = validateTechnology(Technology);
    }


    function validateTechnology(data) {
      if (!data) return undefined;
      
      if (!Array.isArray(data)) {
        throw new Error("Technology must be an array");
      }
    
      return data.map(item => ({
        _id: item._id ,
        title: item.title || "",
        imageId: item.imageId || null
      }));
    }
   
    function validateBannerdata(bannerDataArr) {
      if (!Array.isArray(bannerDataArr)) {
        throw new Error("Bannerdata must be an array");
      }

      const allowedTypes = ['banner', 'video', 'slider'];
      const maxSliderImages = 4;

      return bannerDataArr.map(item => {
        if (!allowedTypes.includes(item.type)) {
          throw new Error(`Invalid Bannerdata type: ${item.type}`);
        }


        if (item.type === 'slider') {
          if (!item.sliderImages || !Array.isArray(item.sliderImages)) {
            throw new Error("Slider type must have sliderImages array");
          }


          const validImages = item.sliderImages
            .filter(img => img && typeof img === 'string')
            .slice(0, maxSliderImages);

          if (validImages.length === 0) {
            throw new Error("Slider must have at least one valid image");
          }

          return {
            type: item.type,
            sliderImages: validImages
          };
        }

        else {
          if (!item.imageId || typeof item.imageId !== 'string') {
            throw new Error(`${item.type} type must have a valid imageId`);
          }
          return {
            type: item.type,
            imageId: item.imageId
          };
        }
      });
    }
    

    function validateHeadercontent(headerContentArr) {
      if (headerContentArr.length > 1) {
        throw new Error("Only one Headercontent section allowed");
      }

      if (headerContentArr.length === 0) {
        return [];
      }

      const content = headerContentArr[0];

      return [{
        centerHeading: content.centerHeading || "",
        centerDescription: content.centerDescription || "",
        headingAnddescription: validateHeadingDescription(content.headingAnddescription || [])
      }];
    }

    function validateHeadingDescription(items) {
      if (!Array.isArray(items)) {
        throw new Error("headingAnddescription must be an array");
      }

      return items.map(item => ({
        heading: item.heading || "",
        description: item.description || "",
        imageId: item.imageId || null
      }));
    }



    function validateGallery(galleryArr) {
     
      if (!Array.isArray(galleryArr)) {
        throw new Error("Gallery must be an array");
      }
    
      return galleryArr.map(img => ({
        imageId: img.imageId || ""
      }));
    }
    

    function validateTextToImage(data) {
      if (!data) return [];
      if (!Array.isArray(data)) {
        throw new Error("texttoimageandimagetotext must be an array");
      }
    
      return data.map(item => {
        if (!item.type && !(item.value && item.value.value)) {
          throw new Error("Each item must have a type");
        }
    
        return {
          type: item.type || item.value.value,
          text: item.text || item.textContent || "",
          imageId: item.imageId || (item.imageFile ? item.imageFile.id : null)
        };
      }).filter(item => item.type); // Remove items without type
    }
    // Perform the update
    const updatedService = await Services.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Service updated successfully",
      service: updatedService
    });

  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({
      message: "Error updating service",
      error: error.message,
      ...(error.errors && { details: error.errors })
    });
  }
});


ServicesRouter.delete("/delete", async (req, res) => {
  const { titles, categories } = req.body;

  // Handle bulk delete
  if (Array.isArray(titles) && Array.isArray(categories)) {
    if (titles.length === 0 || categories.length === 0) {
      return res.status(400).json({ message: "Titles and categories arrays cannot be empty" });
    }
    if (titles.length !== categories.length) {
      return res.status(400).json({ message: "Titles and categories arrays must be the same length" });
    }

    try {
      const deleteOperations = titles.map((title, index) => ({
        deleteOne: {
          filter: { title, category: categories[index] }
        }
      }));

      const result = await Services.bulkWrite(deleteOperations);

      return res.status(200).json({
        message: `${result.deletedCount} Servicess deleted successfully`,
        result
      });
    } catch (error) {
      console.error("Error bulk deleting Servicess:", error);
      return res.status(500).json({ message: "Error bulk deleting Servicess", error: error.message });
    }
  }

  // Handle single delete (original functionality)
  const { title, category } = req.body;
  if (!title || !category) {
    return res.status(400).json({ message: "Title and category are required" });
  }

  try {
    const deletedServices = await Services.findOneAndDelete({ title, category });
    if (!deletedServices) {
      return res.status(404).json({ message: "Services not found" });
    }
    res.status(200).json({ message: "Services deleted successfully", Services: deletedServices });
  } catch (error) {
    console.error("Error deleting Services:", error);
    res.status(500).json({ message: "Error deleting Services", error: error.message });
  }
});

ServicesRouter.get("/count/category", async (req, res) => {
  try {
    const Servicess = await Services.find({});

    // Create a map to count categories
    const categoryCounts = {};

    Servicess.forEach(tech => {
      const categories = tech.category.split(", ");
      categories.forEach(cat => {
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      });
    });

    // Convert to array format
    const result = Object.keys(categoryCounts).map(category => ({
      category,
      count: categoryCounts[category]
    }));

    res.status(200).json({ categoryCounts: result });
  } catch (error) {
    console.error("Error counting Servicess by category:", error);
    res.status(500).json({
      message: "Error counting Servicess by category",
      error: error.message
    });
  }
});

export default ServicesRouter;




