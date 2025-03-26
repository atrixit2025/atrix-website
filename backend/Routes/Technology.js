// import express from "express";
// import cors from "cors";
// import multer from "multer"
// import Technology from "../Modal/TechnologyModal.js";

// const app = express()
// app.use(cors())
// app.use(express.json())


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads/technology')
//     },
//     filename: (req, file, cb) => {
//       const sanitizedFilename = file.originalname.replace(/\s+/g, '_'); 
//       cb(null, Date.now() + "_" + sanitizedFilename); 
//   }
//   })
  
//   const upload = multer({ storage: storage })


//   const TechnologyRouter = express.Router();
  
//   TechnologyRouter.post("/add", upload.single('filename'), async (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }
  
//     const { title,category } = req.body;
//     const image = `/technology/${req.file.filename}`;
  
//     try {
//       const newTechnology = new Technology({
//         title,
//         category,
//         image
//       });
  
//       await newTechnology.save();
//       res.status(201).json({ message: 'Technology created successfully', technology: newTechnology });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: 'Error creating Technology', error: error.message });
//     }
//   });



  
//   TechnologyRouter.get("/get",async(req,res)=>{
//     try {
//       const technology = await Technology.find({})
//       if (!technology.length) {
//         return res.status(404).json({ message: "No blogs found" });
//     }
//     return res.json({ Technology: technology });


//     } catch (error) {
//       console.error("Error fetching Technology:", error);
//       return res.status(500).json({ message: "Error fetching Technology", error: error.message });
//     }
//   })

//   export default TechnologyRouter;











import express from "express";
import cors from "cors";
import Technology from "../Modal/TechnologyModal.js";

const app = express();
app.use(cors());
app.use(express.json());

const TechnologyRouter = express.Router();

TechnologyRouter.post("/add", async (req, res) => {
  const { title, category, imageId } = req.body; 
  if (!title || !category || !imageId) {
    return res.status(400).json({ message: "Title, category, and imageId are required" });
  }

  try {
    const newTechnology = new Technology({
      title,
      category,
      image: imageId, 
    });

    await newTechnology.save();
    res.status(201).json({ message: 'Technology created successfully', technology: newTechnology });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating Technology', error: error.message });
  }
});

TechnologyRouter.get("/get", async (req, res) => {
  try {
    const technology = await Technology.find({}).populate('image'); 
    if (!technology.length) {
      return res.status(404).json({ message: "No technologies found" });
    }
    return res.json({ Technology: technology });
  } catch (error) {
    console.error("Error fetching Technology:", error);
    return res.status(500).json({ message: "Error fetching Technology", error: error.message });
  }
});


TechnologyRouter.put("/edit", async (req, res) => {
  const { id, title, category, imageId } = req.body; 

  if (!id || !title || !category || !imageId) {
    return res.status(400).json({ message: "ID, title, category, and imageId are required" });
  }

  try {

    const existingTechnology = await Technology.findById(id);
    if (!existingTechnology) {
      return res.status(404).json({ message: "Technology not found" });
    }

    existingTechnology.title = title;
    existingTechnology.category = category;
    existingTechnology.image = imageId;

    const updatedTechnology = await existingTechnology.save();

    res.status(200).json({ message: "Technology updated successfully", technology: updatedTechnology });
  } catch (error) {
    console.error("Error updating Technology:", error);
    res.status(500).json({ message: "Error updating Technology", error: error.message });
  }
});

TechnologyRouter.delete("/delete", async (req, res) => {
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

      const result = await Technology.bulkWrite(deleteOperations);
      
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
    const deletedTechnology = await Technology.findOneAndDelete({ title, category });
    if (!deletedTechnology) {
      return res.status(404).json({ message: "Technology not found" });
    }
    res.status(200).json({ message: "Technology deleted successfully", technology: deletedTechnology });
  } catch (error) {
    console.error("Error deleting Technology:", error);
    res.status(500).json({ message: "Error deleting Technology", error: error.message });
  }
});

TechnologyRouter.get("/count/category", async (req, res) => {
  try {
    const technologies = await Technology.find({});
    
    // Create a map to count categories
    const categoryCounts = {};
    
    technologies.forEach(tech => {
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
    console.error("Error counting technologies by category:", error);
    res.status(500).json({ 
      message: "Error counting technologies by category", 
      error: error.message 
    });
  }
});


export default TechnologyRouter;




