import express from "express";
import cors from "cors";
import BlogCategory from "../../Modal/BlogModals/BlogCategoryModal.js";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

const BlogCategoryRouter = express.Router();

const generateSlug = (name) => {
  return name
    .toLowerCase() 
    .replace(/\s+/g, "-") 
    .replace(/[^\w\-]+/g, ""); 
};

BlogCategoryRouter.post("/blog/category/add", async (req, res) => {
    const { Name, Description, Slug: customSlug, ParentCategory } = req.body;
  
    if (!Name || !Description) {
      return res.status(400).json({ message: "Name and Description are required" });
    }
  
    try {
      let slug = customSlug || generateSlug(Name);
  
      let slugExists = await BlogCategory.findOne({ Slug: slug });
      if (slugExists) {
        slug = `${slug}-${Date.now()}`;
      }
  
      const newBlogCategory = new BlogCategory({
        Name,
        Description,
        Slug: slug,
        ParentCategory: ParentCategory || null, // Set ParentCategory if provided
      });
  
      await newBlogCategory.save();
      
      res.status(201).json({ message: "BlogCategory created successfully", BlogCategory: newBlogCategory });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating BlogCategory", error: error.message });
    }
  });



BlogCategoryRouter.get("/blog/category/get", async (req, res) => {
    try {
      const categories = await BlogCategory.find({});
      res.status(200).json({ message: "Categories fetched successfully", categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
  });
  
  
  BlogCategoryRouter.get("/blog/category/name/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const Blogcategory = await BlogCategory.findOne({ Name: name });
  
      if (!Blogcategory) {
        return res.status(404).json({ message: "BlogCategory not found" });
      }
  
      res.status(200).json({ message: "BlogCategory fetched successfully", Blogcategory });
    } catch (error) {
      console.error("Error fetching Blogcategory:", error);
      res.status(500).json({ message: "Error fetching Blogcategory", error: error.message });
    }
  });
  
  // Update a Blogcategory by Name
  BlogCategoryRouter.put("/blog/category/name/:name", async (req, res) => {
    const { name } = req.params;
    const { Name: newName, Description, Slug: newSlug, ParentCategory } = req.body;
  
    try {
      const Blogcategory = await BlogCategory.findOne({ Name: name });
  
      if (!Blogcategory) {
        return res.status(404).json({ message: "BlogCategory not found" });
      }
  
      if (newName) Blogcategory.Name = newName;
      if (Description) Blogcategory.Description = Description;
      if (ParentCategory) Blogcategory.ParentCategory = ParentCategory;
  
      if (newSlug) {
        const slugExists = await BlogCategory.findOne({ Slug: newSlug });
        if (slugExists && slugExists._id.toString() !== Blogcategory._id.toString()) {
          return res.status(400).json({ message: "Slug already exists" });
        }
        Blogcategory.Slug = newSlug;
      }
  
      await Blogcategory.save();
      res.status(200).json({ message: "BlogCategory updated successfully", Blogcategory });
    } catch (error) {
      console.error("Error updating Blogcategory:", error);
      res.status(500).json({ message: "Error updating Blogcategory", error: error.message });
    }
  });
  
  // Delete a Blogcategory by Name
  BlogCategoryRouter.delete("/blog/category/name/:name", async (req, res) => {
    const { name } = req.params;
  
    try {
      const Blogcategory = await BlogCategory.findOneAndDelete({ Name: name });
  
      if (!Blogcategory) {
        return res.status(404).json({ message: "BlogCategory not found" });
      }
  
      res.status(200).json({ message: "BlogCategory deleted successfully", Blogcategory });
    } catch (error) {
      console.error("Error deleting Blogcategory:", error);
      res.status(500).json({ message: "Error deleting Blogcategory", error: error.message });
    }
  });

  BlogCategoryRouter.delete("/delete-many", async (req, res) => {
    const { ids } = req.body;
  
    if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ message: "Array of IDs is required" });
    }
  
    try {
        const result = await BlogCategory.deleteMany({ _id: { $in: ids } });
  
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




export default BlogCategoryRouter;