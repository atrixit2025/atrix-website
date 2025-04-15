import express from "express";
import cors from "cors";
import Services from "../../Modal/ServicesModals/ServicesModals.js";
const app = express();
app.use(cors());
app.use(express.json());

const ServicesRouter = express.Router();

ServicesRouter.post("/add", async (req, res) => {
  const { 
    title,
    description, // Added
    Servicesquote, // Added
    category, 
    tags, 
    portfolioCategories, 
    iconImageId, 
    FeaturedImageId,
    Bannerdata, // Added
    WhydoNeed, // Added
    Process,
    WhyAtrix, // Added
    servicescontent, // Added
    contentSections 
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
    // Sanitize all array inputs
    const sanitized = {
      portfolioCategories: validateArray(portfolioCategories, 'portfolioCategories'),
      tags: validateArray(tags, 'tags'),
      Bannerdata: validateArray(Bannerdata, 'Bannerdata'),
      WhydoNeed: validateArray(WhydoNeed, 'WhydoNeed'),
      Process: validateArray(Process, 'Process'),

      
      WhyAtrix: validateArray(WhyAtrix, 'WhyAtrix'),
      servicescontent: validateArray(servicescontent, 'servicescontent'),
      contentSections: validateArray(contentSections, 'contentSections')
    };

    // Create new service document
    const newServices = new Services({
      title,
      description,
      Servicesquote: Servicesquote || "",
      category,
      tags: sanitized.tags,
      Bannerdata: validateBannerdata(sanitized.Bannerdata),
      WhydoNeed: sanitized.WhydoNeed,
      Process: sanitized.Process,
      WhyAtrix: sanitized.WhyAtrix,
      portfolioCategories: sanitized.portfolioCategories,
      iconImageId: iconImageId || null,
      FeaturedImage: FeaturedImageId,
      servicescontent: sanitized.servicescontent.map(validateServicesContentSection),
      contentSections: sanitized.contentSections.map(validateContentSection),
      updatedAt: new Date()
    });

    // Helper function to validate content sections
    // 🔹 For contentSections
    function validateContentSection(section) {
      // Skip validation if section is empty
      if (!section) return null;
      
      // If section exists but has no type, provide a default
      if (!section.type) {
        return {
          type: 'text', // Default type
          content: section.content || ""
        };
      }
    
      const validTypes = ['text', 'image', 'full-image', 'big-image'];
      if (!validTypes.includes(section.type)) {
        throw new Error(`Invalid type for contentSection: ${section.type}`);
      }
    
      if (section.type === 'text') {
        return {
          type: section.type,
          content: section.content || ""
        };
      } else {
        if (!section.imageId) {
          throw new Error(`${section.type} section must have an imageId`);
        }
        return {
          type: section.type,
          imageId: section.imageId
        };
      }
    }

    function validateServicesContentSection(section) {
      if (!section || typeof section !== 'object') {
        throw new Error("Invalid servicescontent format");
      }
    
      const validatedSection = {};
    
      // Accept content array
      if (section.content && Array.isArray(section.content)) {
        validatedSection.content = section.content.map(item => ({
          cardheading: item.cardheading || "",
          description: item.description || ""
        }));
      }
    
      // Accept gallery array
      if (section.gallery && Array.isArray(section.gallery)) {
        validatedSection.gallery = section.gallery.map(item => {
          if (!item.imageId) throw new Error("Gallery item must have imageId");
          return { imageId: item.imageId };
        });
      }
    
      // 💡 Try to guess fallback: a flat content item
      if (!validatedSection.content && !validatedSection.gallery) {
        if (section.cardheading || section.description) {
          validatedSection.content = [
            {
              cardheading: section.cardheading || "",
              description: section.description || ""
            }
          ];
        } else {
          throw new Error("Each servicescontent item must have either content or gallery");
        }
      }
    
      return validatedSection;
    }
    
    
function validateBannerdata(bannerDataArr) {
  if (!Array.isArray(bannerDataArr)) {
    throw new Error("Bannerdata must be an array");
  }

  const allowedTypes = ['banner', 'video', 'slider'];
  const maxSliderImages = 4; // Maximum allowed slider images

  return bannerDataArr.map(item => {
    // Validate type
    if (!allowedTypes.includes(item.type)) {
      throw new Error(`Invalid Bannerdata type: ${item.type}`);
    }

    // Slider-specific validation
    if (item.type === 'slider') {
      if (!item.sliderImages || !Array.isArray(item.sliderImages)) {
        throw new Error("Slider type must have sliderImages array");
      }
      
      // Filter out empty images and limit to maximum
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
    // Banner/Video validation
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
    category,
    tags = [], // Default empty array
    portfolioCategories = [], // Default empty array
    iconImageId,
    FeaturedImageId, 
    contentSections 
  } = req.body;

  // Basic validation
  if (!id) return res.status(400).json({ message: "Services ID is required" });
  if (!title || !category || !FeaturedImageId) {
    return res.status(400).json({ 
      message: "Title, category, and featured image are required"
    });
  }

  // Ensure arrays
  const sanitizedTags = Array.isArray(tags) ? tags : [];
  const sanitizedPortfolioCategories = Array.isArray(portfolioCategories) 
    ? portfolioCategories 
    : [];

  try {
    const updateData = {
      title,
      category,
      tags: sanitizedTags,
      portfolioCategories: sanitizedPortfolioCategories,
      iconImageId: iconImageId || null,
      FeaturedImage: FeaturedImageId,
      updatedAt: new Date()
    };

    // Handle content sections if provided
    if (contentSections) {
      if (!Array.isArray(contentSections)) {
        return res.status(400).json({ message: "contentSections must be an array" });
      }
      
      updateData.contentSections = contentSections.map(section => {
        if (!section.type) throw new Error("Each section must have a type");
        
        if (section.type === 'text') {
          return { type: 'text', content: section.content || "" };
        } else {
          if (!section.imageId) throw new Error(`Image section must have an imageId`);
          return { type: section.type, imageId: section.imageId };
        }
      });
    }

    const updatedServices = await Services.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    );

    res.status(200).json({ 
      message: "Services updated successfully", 
      Services: updatedServices 
    });
  } catch (error) {
    console.error("Error updating Services:", error);
    res.status(500).json({ 
      message: "Error updating Services", 
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




