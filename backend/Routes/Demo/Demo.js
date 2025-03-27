import express from "express";
import cors from "cors";
import Demo from "../../Modal/DemoModals/DemoModal.js";
const app = express();
app.use(cors());
app.use(express.json());

const DemoRouter = express.Router();

DemoRouter.post("/add", async (req, res) => {
  const { title, category,text, imageId ,fullImageId,bigImageId } = req.body; 
  if (!title || !category|| !imageId ) {
    return res.status(400).json({ message: "Title, category,text, and imageId are required" });
  }

  try {
    const newDemo = new Demo({
      title,
      category,
      text:text || "",
      image: imageId ,
      fullImage: fullImageId || undefined ,
      bigImage: bigImageId || undefined
    });

    await newDemo.save();
    res.status(201).json({ message: 'Demo created successfully', Demo: newDemo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating Demo', error: error.message });
  }
});

DemoRouter.get("/get", async (req, res) => {
  try {
    const demo = await Demo.find({}).populate('image'); 
    if (!demo.length) {
      return res.status(404).json({ message: "No Demos found" });
    }
    return res.json({ Demo: demo });
  } catch (error) {
    console.error("Error fetching Demo:", error);
    return res.status(500).json({ message: "Error fetching Demo", error: error.message });
  }
});


DemoRouter.put("/edit", async (req, res) => {
  const { id, title, category,text, imageId } = req.body; 

  if (!id || !title || !category ||! text|| !imageId) {
    return res.status(400).json({ message: "ID, title, category,text, and imageId are required" });
  }

  try {

    const existingDemo = await Demo.findById(id);
    if (!existingDemo) {
      return res.status(404).json({ message: "Demo not found" });
    }

    existingDemo.title = title;
    existingDemo.category = category;
    existingDemo.text = text;

    existingDemo.image = imageId;

    const updatedDemo = await existingDemo.save();

    res.status(200).json({ message: "Demo updated successfully", Demo: updatedDemo });
  } catch (error) {
    console.error("Error updating Demo:", error);
    res.status(500).json({ message: "Error updating Demo", error: error.message });
  }
});


DemoRouter.delete("/delete", async (req, res) => {
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
  
        const result = await Demo.bulkWrite(deleteOperations);
        
        return res.status(200).json({ 
          message: `${result.deletedCount} Demos deleted successfully`,
          result
        });
      } catch (error) {
        console.error("Error bulk deleting Demos:", error);
        return res.status(500).json({ message: "Error bulk deleting Demos", error: error.message });
      }
    }
  
    // Handle single delete (original functionality)
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: "Title and category are required" });
    }
  
    try {
      const deletedDemo = await Demo.findOneAndDelete({ title, category });
      if (!deletedDemo) {
        return res.status(404).json({ message: "Demo not found" });
      }
      res.status(200).json({ message: "Demo deleted successfully", Demo: deletedDemo });
    } catch (error) {
      console.error("Error deleting Demo:", error);
      res.status(500).json({ message: "Error deleting Demo", error: error.message });
    }
  });

  DemoRouter.get("/count/category", async (req, res) => {
    try {
      const Demos = await Demo.find({});
      
      // Create a map to count categories
      const categoryCounts = {};
      
      Demos.forEach(tech => {
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
      console.error("Error counting Demos by category:", error);
      res.status(500).json({ 
        message: "Error counting Demos by category", 
        error: error.message 
      });
    }
  });

export default DemoRouter;




