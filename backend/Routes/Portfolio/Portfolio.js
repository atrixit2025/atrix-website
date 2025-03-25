import express from "express";
import cors from "cors";
import Portfolio from "../../Modal/PortfolioModals/PortfolioModals.js";
const app = express();
app.use(cors());
app.use(express.json());

const PortfolioRouter = express.Router();

PortfolioRouter.post("/add", async (req, res) => {
  const { title, category, imageId } = req.body; 
  if (!title || !category || !imageId) {
    return res.status(400).json({ message: "Title, category, and imageId are required" });
  }

  try {
    const newPortfolio = new Portfolio({
      title,
      category,
      
      image: imageId, 
    });

    await newPortfolio.save();
    res.status(201).json({ message: 'Portfolio created successfully', Portfolio: newPortfolio });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating Portfolio', error: error.message });
  }
});

PortfolioRouter.get("/get", async (req, res) => {
  try {
    const portfolio = await Portfolio.find({}).populate('image'); 
    if (!portfolio.length) {
      return res.status(404).json({ message: "No technologies found" });
    }
    return res.json({ Portfolio: portfolio });
  } catch (error) {
    console.error("Error fetching Portfolio:", error);
    return res.status(500).json({ message: "Error fetching Portfolio", error: error.message });
  }
});


PortfolioRouter.put("/edit", async (req, res) => {
  const { id, title, category, imageId } = req.body; 

  if (!id || !title || !category || !imageId) {
    return res.status(400).json({ message: "ID, title, category, and imageId are required" });
  }

  try {

    const existingPortfolio = await Portfolio.findById(id);
    if (!existingPortfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    existingPortfolio.title = title;
    existingPortfolio.category = category;

    existingPortfolio.image = imageId;

    const updatedPortfolio = await existingPortfolio.save();

    res.status(200).json({ message: "Portfolio updated successfully", Portfolio: updatedPortfolio });
  } catch (error) {
    console.error("Error updating Portfolio:", error);
    res.status(500).json({ message: "Error updating Portfolio", error: error.message });
  }
});

PortfolioRouter.delete("/delete", async (req, res) => {
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
  
        const result = await Portfolio.bulkWrite(deleteOperations);
        
        return res.status(200).json({ 
          message: `${result.deletedCount} technologies deleted successfully`,
          result
        });
      } catch (error) {
        console.error("Error bulk deleting technologies:", error);
        return res.status(500).json({ message: "Error bulk deleting technologies", error: error.message });
      }
    }
  
    // Handle single delete (original functionality)
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: "Title and category are required" });
    }
  
    try {
      const deletedPortfolio = await Portfolio.findOneAndDelete({ title, category });
      if (!deletedPortfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      res.status(200).json({ message: "Portfolio deleted successfully", portfolio: deletedPortfolio });
    } catch (error) {
      console.error("Error deleting Portfolio:", error);
      res.status(500).json({ message: "Error deleting Portfolio", error: error.message });
    }
  });

export default PortfolioRouter;




