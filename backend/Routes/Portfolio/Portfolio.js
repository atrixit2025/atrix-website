import express from "express";
import cors from "cors";
import Portfolio from "../../Modal/PortfolioModals/PortfolioModals.js";
const app = express();
app.use(cors());
app.use(express.json());

const PortfolioRouter = express.Router();

PortfolioRouter.post("/add", async (req, res) => {
  const { title, category, featuredImage, contentSections } = req.body;
  // console.log("Received body:", req.body);
  if (!title || !category || !featuredImage) {
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
    const newPortfolio = new Portfolio({
      title,
      category,
      FeaturedImage: featuredImage,
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

    const savedPortfolio = await newPortfolio.save();
    res.status(201).json({ 
      message: 'Portfolio created successfully', 
      Portfolio: savedPortfolio 
    });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ 
      message: 'Error creating Portfolio', 
      error: error.message,
      details: error.errors // This will show validation errors if any
    });
  }
});

PortfolioRouter.get("/get", async (req, res) => {
  try {
    const portfolios = await Portfolio.find({}).populate('FeaturedImage', 'url'); // Assuming you have a reference
    // if (!portfolios.length) {
    //   return res.status(404).json({ message: "No portfolios found" });
    // }
    
    // Map portfolios to include image URLs
    const portfoliosWithUrls = portfolios.map(portfolio => ({
      ...portfolio.toObject(),
      FeaturedImageUrl: portfolio.FeaturedImage?.url || null
    }));
    
    return res.json({ Portfolio: portfoliosWithUrls });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return res.status(500).json({ message: "Error fetching portfolio", error: error.message });
  }
});


PortfolioRouter.put("/edit", async (req, res) => {
  const { 
    id, // Now coming from request body instead of URL params
    title, 
    category, 
    featuredImage, 
    contentSections 
  } = req.body;

  // Basic validation
  if (!id) {
    return res.status(400).json({ message: "Portfolio ID is required in the request body" });
  }

  if (!title || !category || !featuredImage) {
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
    // Find the existing Portfolio
    const existingPortfolio = await Portfolio.findById(id);
    if (!existingPortfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // Prepare update data
    const updateData = {
      title,
      category,
      FeaturedImage: featuredImage,
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

    // Update the Portfolio
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true } // Return the updated document
    );

    res.status(200).json({ 
      message: "Portfolio updated successfully", 
      Portfolio: updatedPortfolio 
    });
  } catch (error) {
    console.error("Error updating Portfolio:", error);
    res.status(500).json({ 
      message: "Error updating Portfolio", 
      error: error.message,
      ...(error.errors && { details: error.errors })
    });
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


    PortfolioRouter.get("/count/category", async (req, res) => {
      try {
        const Portfolios = await Portfolio.find({});
        
        // Create a map to count categories
        const categoryCounts = {};
        
        Portfolios.forEach(tech => {
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
        console.error("Error counting Portfolios by category:", error);
        res.status(500).json({ 
          message: "Error counting Portfolios by category", 
          error: error.message 
        });
      }
    });


    PortfolioRouter.get("/count", async (req, res) => {
        try {
          const totalPortfolios = await Portfolio.countDocuments({});
          res.status(200).json({ count: totalPortfolios });
        } catch (error) {
          console.error("Error counting Portfolios:", error);
          res.status(500).json({ 
            message: "Error counting Portfolios", 
            error: error.message 
          });
        }
      });

export default PortfolioRouter;




