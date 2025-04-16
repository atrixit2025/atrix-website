import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import FAQCategory from "../../Modal/FAQModals/FAQCategoryModal.js";
const app = express();
app.use(cors());
app.use(express.json());

const FAQCategoryRouter = express.Router();

const generateSlug = (name) => {
  return name
    .toLowerCase() 
    .replace(/\s+/g, "-") 
    .replace(/[^\w\-]+/g, ""); 
};

FAQCategoryRouter.post("/FAQ/category/add", async (req, res) => {
  const { Name, Description, Slug: customSlug, ParentCategory } = req.body;

  if (!Name || !Description) {
    return res.status(400).json({ message: "Name and Description are required" });
  }

  try {
    let slug = customSlug || generateSlug(Name);

    let slugExists = await FAQCategory.findOne({ Slug: slug });
    if (slugExists) {
      slug = `${slug}-${Date.now()}`;
    }

    const newFAQCategory = new FAQCategory({
      Name,
      Description,
      Slug: slug,
      ParentCategory: ParentCategory || null, 
    });

    await newFAQCategory.save();

    // Get the count of subcategories for this new category
    const subcategoryCount = await FAQCategory.countDocuments({
      ParentCategory: newFAQCategory._id
    });

    // Create the response object with count included
    const responseData = {
      ...newFAQCategory.toObject(),
      CountFAQCategory: subcategoryCount
    };

    res.status(201).json({ 
      message: "FAQCategory created successfully", 
      FAQCategory: responseData 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating FAQCategory", error: error.message });
  }
});



FAQCategoryRouter.get("/FAQ/category/get", async (req, res) => {
  try {
    const categories = await FAQCategory.find();
    
    // Enhance categories with their counts
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const count = await FAQCategory.countDocuments({
          ParentCategory: category._id
        });
        return {
          ...category.toObject(),
          CountFAQCategory: count
        };
      })
    );

    res.status(200).json({ categories: categoriesWithCounts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
});
  
  
  FAQCategoryRouter.get("/FAQ/category/name/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const FAQcategory = await FAQCategory.findOne({ Name: name });
  
      if (!FAQcategory) {
        return res.status(404).json({ message: "FAQCategory not found" });
      }
  
      res.status(200).json({ message: "FAQCategory fetched successfully", FAQcategory });
    } catch (error) {
      console.error("Error fetching FAQcategory:", error);
      res.status(500).json({ message: "Error fetching FAQcategory", error: error.message });
    }
  });
  
  // Update a FAQcategory by Name
  FAQCategoryRouter.put("/FAQ/category/name/:name", async (req, res) => {
    const { name } = req.params;
    const { Name: newName, Description, Slug: newSlug, ParentCategory } = req.body;
  
    try {
      const FAQcategory = await FAQCategory.findOne({ Name: name });
  
      if (!FAQcategory) {
        return res.status(404).json({ message: "FAQCategory not found" });
      }
  
      if (newName) FAQcategory.Name = newName;
      if (Description) FAQcategory.Description = Description;
  
      // Validate ParentCategory
      if (ParentCategory && mongoose.Types.ObjectId.isValid(ParentCategory)) {
        FAQcategory.ParentCategory = ParentCategory;
      } else {
        FAQcategory.ParentCategory = null; // Set to null if invalid
      }
  
      if (newSlug) {
        const slugExists = await FAQCategory.findOne({ Slug: newSlug });
        if (slugExists && slugExists._id.toString() !== FAQcategory._id.toString()) {
          return res.status(400).json({ message: "Slug already exists" });
        }
        FAQcategory.Slug = newSlug;
      }
  
      await FAQcategory.save();
      res.status(200).json({ message: "FAQCategory updated successfully", FAQcategory });
    } catch (error) {
      console.error("Error updating FAQcategory:", error);
      res.status(500).json({ message: "Error updating FAQcategory", error: error.message });
    }
  });
  
  // Delete a FAQcategory by Name
  FAQCategoryRouter.delete("/FAQ/category/name/:name", async (req, res) => {
    const { name } = req.params;
  
    try {
      // Find the category to be deleted
      const categoryToDelete = await FAQCategory.findOne({ Name: name });
  
      if (!categoryToDelete) {
        return res.status(404).json({ message: "FAQCategory not found" });
      }
  
      // Remove the reference to this category from other categories' ParentCategory fields
      await FAQCategory.updateMany(
        { ParentCategory: categoryToDelete._id }, // Find all categories where ParentCategory is the one being deleted
        { $set: { ParentCategory: null } } // Set their ParentCategory to null
      );
  
      // Delete the category
      await FAQCategory.findOneAndDelete({ Name: name });
  
      res.status(200).json({ message: "FAQCategory deleted successfully", categoryToDelete });
    } catch (error) {
      console.error("Error deleting FAQcategory:", error);
      res.status(500).json({ message: "Error deleting FAQcategory", error: error.message });
    }
  });


  FAQCategoryRouter.delete("/delete-many", async (req, res) => {
      const { ids } = req.body;
    
      if (!ids || !Array.isArray(ids)) {
          return res.status(400).json({ message: "Array of IDs is required" });
      }
    
      try {
          const result = await  FAQCategory.deleteMany({ _id: { $in: ids } });
    
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




  FAQCategoryRouter.get("/FAQ/category/count/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validate ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
  
      const category = await FAQCategory.findById(id);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      // Get subcategory count
      const subcategoryCount = await FAQCategory.countDocuments({
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
export default FAQCategoryRouter;