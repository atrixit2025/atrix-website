import express from "express";
import cors from "cors";
import Services from "../../Modal/ServicesModals/ServicesModals.js";
const app = express();
app.use(cors());
app.use(express.json());

const ServicesRouter = express.Router();

ServicesRouter.post("/add", async (req, res) => {
  const { title, category, FeaturedImageId, contentSections } = req.body;
  // console.log("Received body:", req.body);
  if (!title || !category || !FeaturedImageId) {
    return res.status(400).json({ 
      message: "Title, category, and featured image are required"
    });
  }

  // Validate contentSections exists and is an array
  if (!Array.isArray(contentSections)) {
    return res.status(400).json({
      message: "contentSections must be an array",
      received: contentSections
    });
  }

  try {
    const newServices = new Services({
      title,
      category,
      FeaturedImage: FeaturedImageId,
      contentSections: contentSections.map(section => {
        // Validate each section has a type
        if (!section.type) {
          throw new Error("Each content section must have a type");
        }

        if (section.type === 'text') {
          return {
            type: 'text',
            content: section.content || "" // Default to empty string
          };
        } else {
          if (!section.imageId) {
            throw new Error(`Image section must have an imageId`);
          }
          return {
            type: section.type,
            imageId: section.imageId
          };
        }
      }),
      updatedAt: new Date()
    });

    const savedServices = await newServices.save();
    res.status(201).json({ 
      message: 'Services created successfully', 
      Services: savedServices 
    });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ 
      message: 'Error creating Services', 
      error: error.message,
      details: error.errors // This will show validation errors if any
    });
  }
});

ServicesRouter.get("/get", async (req, res) => {
  try {
    const Servicess = await Services.find({}).populate('FeaturedImage', 'url'); // Assuming you have a reference
    if (!Servicess.length) {
      return res.status(404).json({ message: "No Servicess found" });
    }
    
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
    id, // Now coming from request body instead of URL params
    title, 
    category, 
    FeaturedImageId, 
    contentSections 
  } = req.body;

  // Basic validation
  if (!id) {
    return res.status(400).json({ message: "Services ID is required in the request body" });
  }

  if (!title || !category || !FeaturedImageId) {
    return res.status(400).json({ 
      message: "Title, category, and featured image are required"
    });
  }

  // Validate contentSections if provided
  if (contentSections && !Array.isArray(contentSections)) {
    return res.status(400).json({
      message: "contentSections must be an array if provided"
    });
  }

  try {
    // Find the existing Services
    const existingServices = await Services.findById(id);
    if (!existingServices) {
      return res.status(404).json({ message: "Services not found" });
    }

    // Prepare update data
    const updateData = {
      title,
      category,
      FeaturedImage: FeaturedImageId,
      updatedAt: new Date()
    };

    // Only update contentSections if provided
    if (contentSections) {
      updateData.contentSections = contentSections.map(section => {
        if (!section.type) {
          throw new Error("Each content section must have a type");
        }

        if (section.type === 'text') {
          return {
            type: 'text',
            content: section.content || ""
          };
        } else {
          if (!section.imageId) {
            throw new Error(`Image section must have an imageId`);
          }
          return {
            type: section.type,
            imageId: section.imageId
          };
        }
      });
    }

    // Update the Services
    const updatedServices = await Services.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true } // Return the updated document
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




