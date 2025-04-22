import express from "express";
import cors from "cors";
import Category from "../Modal/CategoryModal.js";

const app = express();
app.use(cors());
app.use(express.json());

const CategoryRouter = express.Router();

const generateSlug = (name) => {
  return name
    .toLowerCase() 
    .replace(/\s+/g, "-") 
    .replace(/[^\w\-]+/g, ""); 
};

CategoryRouter.post("/add", async (req, res) => {
  const { Name, Description, Slug: customSlug } = req.body; 

  if (!Name || !Description) {
    return res.status(400).json({ message: "Name and Description are required" });
  }

  try {
    let slug = customSlug || generateSlug(Name); 

    let slugExists = await Category.findOne({ Slug: slug });
    if (slugExists) {
      slug = `${slug}-${Date.now()}`;
    }

    const newCategory = new Category({
      Name,
      Description,
      Slug: slug, 
    });

    await newCategory.save();
    res.status(201).json({ message: "Category created successfully", Category: newCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating Category", error: error.message });
  }
});



CategoryRouter.get("/get", async (req, res) => {
    try {
      const categories = await Category.find({});
      res.status(200).json({ message: "Categories fetched successfully", categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
  });
  
  
  CategoryRouter.get("/name/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const category = await Category.findOne({ Name: name });
  
      // if (!category) {
      //   return res.status(404).json({ message: "Category not found" });
      // }
  
      res.status(200).json({ message: "Category fetched successfully", category });
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ message: "Error fetching category", error: error.message });
    }
  });
  
  // Update a category by Name
  CategoryRouter.put("/name/:name", async (req, res) => {
    const { name } = req.params;
    const { Name: newName, Description, Slug: newSlug } = req.body;
  
    try {
      const category = await Category.findOne({ Name: name });
  
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      if (newName) category.Name = newName;
      if (Description) category.Description = Description;
  
      if (newSlug) {
        const slugExists = await Category.findOne({ Slug: newSlug });
        if (slugExists && slugExists._id.toString() !== category._id.toString()) {
          return res.status(400).json({ message: "Slug already exists" });
        }
        category.Slug = newSlug;
      }
  
      await category.save();
      res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ message: "Error updating category", error: error.message });
    }
  });
  
  // Delete a category by Name
  CategoryRouter.delete("/name/:name", async (req, res) => {
    const { name } = req.params;
  
    try {
      const category = await Category.findOneAndDelete({ Name: name });
  
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.status(200).json({ message: "Category deleted successfully", category });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ message: "Error deleting category", error: error.message });
    }
  });



  CategoryRouter.delete("/delete-many", async (req, res) => {
        const { ids } = req.body;
      
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: "Array of IDs is required" });
        }
      
        try {
            const result = await  Category.deleteMany({ _id: { $in: ids } });
      
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

 
export default CategoryRouter;