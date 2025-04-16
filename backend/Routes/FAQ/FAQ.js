import express from "express";
import cors from "cors";
import FAQ from "../../Modal/FAQModals/FAQModal.js";
const app = express();
app.use(cors());
app.use(express.json());

const FAQRouter = express.Router();

FAQRouter.post("/add", async (req, res) => {
    const { title, category, description } = req.body;
    if (!title || !category || !description) {
    return res.status(400).json({ 
      message: "Title, category, and featured image are required"
    });
  }


  try {
    const newFAQ = new FAQ({
      title,
      category,
      description: description,
      updatedAt: new Date()
    });

    const savedFAQ = await newFAQ.save();
    res.status(201).json({ 
      message: 'FAQ created successfully', 
      FAQ: savedFAQ 
    });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ 
      message: 'Error creating FAQ', 
      error: error.message,
      details: error.errors // This will show validation errors if any
    });
  }
});

FAQRouter.get("/get", async (req, res) => {
  try {
    const FAQs = await FAQ.find({}); // Assuming you have a reference
    // if (!FAQs.length) {
    //   return res.status(404).json({ message: "No FAQs found" });
    // }
    
    // Map FAQs to include image URLs
    // const FAQsWithUrls = FAQs.map(FAQ => ({
    //   ...FAQ.toObject(),
    //   FeaturedImageUrl: FAQ.FeaturedImage?.url || null
    // }));
    
    return res.json({ FAQ: FAQs });
  } catch (error) {
    console.error("Error fetching FAQ:", error);
    return res.status(500).json({ message: "Error fetching FAQ", error: error.message });
  }
});


FAQRouter.put("/edit", async (req, res) => {
  const { 
    id, // Now coming from request body instead of URL params
    title, 
    category, 
    description,  
  } = req.body;

  // Basic validation
  if (!id) {
    return res.status(400).json({ message: "FAQ ID is required in the request body" });
  }

  if (!title || !category || !description) {
    return res.status(400).json({ 
      message: "Title, category, and featured image are required"
    });
  }



  try {
    // Find the existing FAQ
    const existingFAQ = await FAQ.findById(id);
    if (!existingFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    // Prepare update data
    const updateData = {
      title,
      category,
      description: description,
      updatedAt: new Date()
    };

    // Update the FAQ
    const updatedFAQ = await FAQ.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true } // Return the updated document
    );

    res.status(200).json({ 
      message: "FAQ updated successfully", 
      FAQ: updatedFAQ 
    });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.status(500).json({ 
      message: "Error updating FAQ", 
      error: error.message,
      ...(error.errors && { details: error.errors })
    });
  }
});


FAQRouter.delete("/delete", async (req, res) => {
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
  
        const result = await FAQ.bulkWrite(deleteOperations);
        
        return res.status(200).json({ 
          message: `${result.deletedCount} FAQs deleted successfully`,
          result
        });
      } catch (error) {
        console.error("Error bulk deleting FAQs:", error);
        return res.status(500).json({ message: "Error bulk deleting FAQs", error: error.message });
      }
    }
  
    // Handle single delete (original functionality)
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: "Title and category are required" });
    }
  
    try {
      const deletedFAQ = await FAQ.findOneAndDelete({ title, category });
      if (!deletedFAQ) {
        return res.status(404).json({ message: "FAQ not found" });
      }
      res.status(200).json({ message: "FAQ deleted successfully", FAQ: deletedFAQ });
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      res.status(500).json({ message: "Error deleting FAQ", error: error.message });
    }
  });

  FAQRouter.get("/count/category", async (req, res) => {
    try {
      const FAQs = await FAQ.find({});
      
      // Create a map to count categories
      const categoryCounts = {};
      
      FAQs.forEach(tech => {
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
      console.error("Error counting FAQs by category:", error);
      res.status(500).json({ 
        message: "Error counting FAQs by category", 
        error: error.message 
      });
    }
  });

export default FAQRouter;




