import express from "express";
import cors from "cors";
import PortfolioCategory from "../../Modal/PortfolioModals/PortfolioCategoryModal.js";

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
      res.status(201).json({ message: "PortfolioCategory created successfully", PortfolioCategory: newPortfolioCategory });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating PortfolioCategory", error: error.message });
    }
  });



PortfolioCategoryRouter.get("/Portfolio/category/get", async (req, res) => {
    try {
      const categories = await PortfolioCategory.find({});
      res.status(200).json({ message: "Categories fetched successfully", categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
  });
  
  
  PortfolioCategoryRouter.get("/Portfolio/category/name/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const Portfoliocategory = await PortfolioCategory.findOne({ Name: name });
  
      if (!Portfoliocategory) {
        return res.status(404).json({ message: "PortfolioCategory not found" });
      }
  
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
      if (ParentCategory) Portfoliocategory.ParentCategory = ParentCategory;
  
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
      const Portfoliocategory = await PortfolioCategory.findOneAndDelete({ Name: name });
  
      if (!Portfoliocategory) {
        return res.status(404).json({ message: "PortfolioCategory not found" });
      }
  
      res.status(200).json({ message: "PortfolioCategory deleted successfully", Portfoliocategory });
    } catch (error) {
      console.error("Error deleting Portfoliocategory:", error);
      res.status(500).json({ message: "Error deleting Portfoliocategory", error: error.message });
    }
  });
export default PortfolioCategoryRouter;