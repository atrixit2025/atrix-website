import express from "express";
import cors from "cors";
import PortfolioCategory from "../../Modal/PortfolioModals/PortfolioCategoryModal.js";
import mongoose from "mongoose";
const app = express();
app.use(cors());
app.use(express.json());

const PortfolioCategoryRouter = express.Router();

const generateSlug = (name) => {
  return name
    .toLowerCase() 
    .replace(/\s+/g, "-") 
    .replace(/[^\w\-]+/g, ""); 
};

PortfolioCategoryRouter.post("/Portfolio/category/add", async (req, res) => {
  const { Name, Description, Slug: customSlug, ParentCategory } = req.body;

  if (!Name || !Description) {
    return res.status(400).json({ message: "Name and Description are required" });
  }

  try {
    let slug = customSlug || generateSlug(Name);

    let slugExists = await PortfolioCategory.findOne({ Slug: slug });
    if (slugExists) {
      slug = `${slug}-${Date.now()}`;
    }

    const newPortfolioCategory = new PortfolioCategory({
      Name,
      Description,
      Slug: slug,
      ParentCategory: ParentCategory || null, 
    });

    await newPortfolioCategory.save();

    // Get the count of subcategories for this new category
    const subcategoryCount = await PortfolioCategory.countDocuments({
      ParentCategory: newPortfolioCategory._id
    });

    // Create the response object with count included
    const responseData = {
      ...newPortfolioCategory.toObject(),
      CountPortfolioCategory: subcategoryCount
    };

    res.status(201).json({ 
      message: "PortfolioCategory created successfully", 
      PortfolioCategory: responseData 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating PortfolioCategory", error: error.message });
  }
});



PortfolioCategoryRouter.get("/Portfolio/category/get", async (req, res) => {
  try {
    const categories = await PortfolioCategory.find();
    
    // Enhance categories with their counts
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const count = await PortfolioCategory.countDocuments({
          ParentCategory: category._id
        });
        return {
          ...category.toObject(),
          CountPortfolioCategory: count
        };
      })
    );

    res.status(200).json({ categories: categoriesWithCounts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
});
  
  
  PortfolioCategoryRouter.get("/Portfolio/category/name/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const Portfoliocategory = await PortfolioCategory.findOne({ Name: name });
  
      // if (!Portfoliocategory) {
      //   return res.status(404).json({ message: "PortfolioCategory not found" });
      // }
  
      res.status(200).json({ message: "PortfolioCategory fetched successfully", Portfoliocategory });
    } catch (error) {
      console.error("Error fetching Portfoliocategory:", error);
      res.status(500).json({ message: "Error fetching Portfoliocategory", error: error.message });
    }
  });
  
  // Update a Portfoliocategory by Name
  PortfolioCategoryRouter.put("/Portfolio/category/name/:name", async (req, res) => {
    const { name } = req.params;
    const { Name: newName, Description, Slug: newSlug, ParentCategory } = req.body;
  
    try {
      const Portfoliocategory = await PortfolioCategory.findOne({ Name: name });
  
      if (!Portfoliocategory) {
        return res.status(404).json({ message: "PortfolioCategory not found" });
      }
  
      if (newName) Portfoliocategory.Name = newName;
      if (Description) Portfoliocategory.Description = Description;
  
      // Validate ParentCategory
      if (ParentCategory && mongoose.Types.ObjectId.isValid(ParentCategory)) {
        Portfoliocategory.ParentCategory = ParentCategory;
      } else {
        Portfoliocategory.ParentCategory = null; // Set to null if invalid
      }
  
      if (newSlug) {
        const slugExists = await PortfolioCategory.findOne({ Slug: newSlug });
        if (slugExists && slugExists._id.toString() !== Portfoliocategory._id.toString()) {
          return res.status(400).json({ message: "Slug already exists" });
        }
        Portfoliocategory.Slug = newSlug;
      }
  
      await Portfoliocategory.save();
      res.status(200).json({ message: "PortfolioCategory updated successfully", Portfoliocategory });
    } catch (error) {
      console.error("Error updating Portfoliocategory:", error);
      res.status(500).json({ message: "Error updating Portfoliocategory", error: error.message });
    }
  });
  
  // Delete a Portfoliocategory by Name
  PortfolioCategoryRouter.delete("/Portfolio/category/name/:name", async (req, res) => {
    const { name } = req.params;
  
    try {
      // Find the category to be deleted
      const categoryToDelete = await PortfolioCategory.findOne({ Name: name });
  
      if (!categoryToDelete) {
        return res.status(404).json({ message: "PortfolioCategory not found" });
      }
  
      // Remove the reference to this category from other categories' ParentCategory fields
      await PortfolioCategory.updateMany(
        { ParentCategory: categoryToDelete._id }, // Find all categories where ParentCategory is the one being deleted
        { $set: { ParentCategory: null } } // Set their ParentCategory to null
      );
  
      // Delete the category
      await PortfolioCategory.findOneAndDelete({ Name: name });
  
      res.status(200).json({ message: "PortfolioCategory deleted successfully", categoryToDelete });
    } catch (error) {
      console.error("Error deleting Portfoliocategory:", error);
      res.status(500).json({ message: "Error deleting Portfoliocategory", error: error.message });
    }
  });


  PortfolioCategoryRouter.delete("/delete-many", async (req, res) => {
      const { ids } = req.body;
    
      if (!ids || !Array.isArray(ids)) {
          return res.status(400).json({ message: "Array of IDs is required" });
      }
    
      try {
          const result = await  PortfolioCategory.deleteMany({ _id: { $in: ids } });
    
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




  PortfolioCategoryRouter.get("/Portfolio/category/count/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Validate ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
  
      const category = await PortfolioCategory.findById(id);
      
      // if (!category) {
      //   return res.status(404).json({ message: "Category not found" });
      // }
  
      // Get subcategory count
      const subcategoryCount = await PortfolioCategory.countDocuments({
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
export default PortfolioCategoryRouter;