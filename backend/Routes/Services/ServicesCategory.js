import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import ServicesCategory from "../../Modal/ServicesModals/ServicesCategoryModal.js";
const app = express();
app.use(cors());
app.use(express.json());

const ServicesCategoryRouter = express.Router();

const generateSlug = (name) => {
  return name
    .toLowerCase() 
    .replace(/\s+/g, "-") 
    .replace(/[^\w\-]+/g, ""); 
};

ServicesCategoryRouter.post("/Services/category/add", async (req, res) => {
  const { Name, Description, Slug: customSlug, ParentCategory } = req.body;

  if (!Name || !Description) {
    return res.status(400).json({ message: "Name and Description are required" });
  }

  try {
    let slug = customSlug || generateSlug(Name);

    let slugExists = await ServicesCategory.findOne({ Slug: slug });
    if (slugExists) {
      slug = `${slug}-${Date.now()}`;
    }

    const newServicesCategory = new ServicesCategory({
      Name,
      Description,
      Slug: slug,
      ParentCategory: ParentCategory || null, 
    });

    await newServicesCategory.save();

    // Get the count of subcategories for this new category
    const subcategoryCount = await ServicesCategory.countDocuments({
      ParentCategory: newServicesCategory._id
    });

    // Create the response object with count included
    const responseData = {
      ...newServicesCategory.toObject(),
      CountServicesCategory: subcategoryCount
    };

    res.status(201).json({ 
      message: "ServicesCategory created successfully", 
      ServicesCategory: responseData 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating ServicesCategory", error: error.message });
  }
});



ServicesCategoryRouter.get("/Services/category/get", async (req, res) => {
  try {
    const categories = await ServicesCategory.find();
    
    // Enhance categories with their counts
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const count = await ServicesCategory.countDocuments({
          ParentCategory: category._id
        });
        return {
          ...category.toObject(),
          CountServicesCategory: count
        };
      })
    );

    res.status(200).json({ categories: categoriesWithCounts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
});
  
  
  ServicesCategoryRouter.get("/Services/category/name/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const Servicescategory = await ServicesCategory.findOne({ Name: name });
  
      // if (!Servicescategory) {
      //   return res.status(404).json({ message: "ServicesCategory not found" });
      // }
  
      res.status(200).json({ message: "ServicesCategory fetched successfully", Servicescategory });
    } catch (error) {
      console.error("Error fetching Servicescategory:", error);
      res.status(500).json({ message: "Error fetching Servicescategory", error: error.message });
    }
  });
  
  // Update a Servicescategory by Name
  ServicesCategoryRouter.put("/Services/category/name/:name", async (req, res) => {
    const { name } = req.params;
    const { Name: newName, Description, Slug: newSlug, ParentCategory } = req.body;
  
    try {
      const Servicescategory = await ServicesCategory.findOne({ Name: name });
  
      if (!Servicescategory) {
        return res.status(404).json({ message: "ServicesCategory not found" });
      }
  
      if (newName) Servicescategory.Name = newName;
      if (Description) Servicescategory.Description = Description;
  
      // Validate ParentCategory
      if (ParentCategory && mongoose.Types.ObjectId.isValid(ParentCategory)) {
        Servicescategory.ParentCategory = ParentCategory;
      } else {
        Servicescategory.ParentCategory = null; // Set to null if invalid
      }
  
      if (newSlug) {
        const slugExists = await ServicesCategory.findOne({ Slug: newSlug });
        if (slugExists && slugExists._id.toString() !== Servicescategory._id.toString()) {
          return res.status(400).json({ message: "Slug already exists" });
        }
        Servicescategory.Slug = newSlug;
      }
  
      await Servicescategory.save();
      res.status(200).json({ message: "ServicesCategory updated successfully", Servicescategory });
    } catch (error) {
      console.error("Error updating Servicescategory:", error);
      res.status(500).json({ message: "Error updating Servicescategory", error: error.message });
    }
  });
  
  // Delete a Servicescategory by Name
  ServicesCategoryRouter.delete("/Services/category/name/:name", async (req, res) => {
    const { name } = req.params;
  
    try {
      // Find the category to be deleted
      const categoryToDelete = await ServicesCategory.findOne({ Name: name });
  
      if (!categoryToDelete) {
        return res.status(404).json({ message: "ServicesCategory not found" });
      }
  
      // Remove the reference to this category from other categories' ParentCategory fields
      await ServicesCategory.updateMany(
        { ParentCategory: categoryToDelete._id }, // Find all categories where ParentCategory is the one being deleted
        { $set: { ParentCategory: null } } // Set their ParentCategory to null
      );
  
      // Delete the category
      await ServicesCategory.findOneAndDelete({ Name: name });
  
      res.status(200).json({ message: "ServicesCategory deleted successfully", categoryToDelete });
    } catch (error) {
      console.error("Error deleting Servicescategory:", error);
      res.status(500).json({ message: "Error deleting Servicescategory", error: error.message });
    }
  });


  ServicesCategoryRouter.delete("/delete-many", async (req, res) => {
      const { ids } = req.body;
    
      if (!ids || !Array.isArray(ids)) {
          return res.status(400).json({ message: "Array of IDs is required" });
      }
    
      try {
          const result = await  ServicesCategory.deleteMany({ _id: { $in: ids } });
    
          if (result.deletedCount === 0) {
              return res.status(404).json({ message: "No categories found to delete" });
          }
    
          res.status(200).json({ 
              message: `${result.deletedCount} categories deleted successfully`,
              deletedCount: result.deletedCount
          });
      } catch (error) {
          console.error("Bulk delete error:", error);
          res.status(500).json({ 
              message: "Bulk delete failed", 
              error: error.message 
          });
      }
  });




  ServicesCategoryRouter.get("/Services/category/count/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validate ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
  
      const category = await ServicesCategory.findById(id);
      
      // if (!category) {
      //   return res.status(404).json({ message: "Category not found" });
      // }
  
      // Get subcategory count
      const subcategoryCount = await ServicesCategory.countDocuments({
        ParentCategory: id
      });
  
      res.status(200).json({
        success: true,
        subcategoryCount
      });
    } catch (error) {
      console.error("Error getting category count:", error);
      res.status(500).json({ 
        success: false,
        message: "Error getting category count", 
        error: error.message 
      });
    }
  });
export default ServicesCategoryRouter;