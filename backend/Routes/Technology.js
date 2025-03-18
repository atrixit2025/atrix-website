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
  const { title, category, imageId } = req.body; // `imageId` is the _id of the image in the Image collection

  if (!title || !category || !imageId) {
    return res.status(400).json({ message: "Title, category, and imageId are required" });
  }

  try {
    const newTechnology = new Technology({
      title,
      category,
      image: imageId, // Reference the image by its _id
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
    const technology = await Technology.find({}).populate('image'); // Populate the image field
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
  const { id, title, category, imageId } = req.body; // Get ID and updated fields from the request body

  if (!id || !title || !category || !imageId) {
    return res.status(400).json({ message: "ID, title, category, and imageId are required" });
  }

  try {
    // Find the existing technology document by ID
    const existingTechnology = await Technology.findById(id);
    if (!existingTechnology) {
      return res.status(404).json({ message: "Technology not found" });
    }

    // Update the fields
    existingTechnology.title = title;
    existingTechnology.category = category;
    existingTechnology.image = imageId;

    // Save the updated document
    const updatedTechnology = await existingTechnology.save();

    // Return the updated document
    res.status(200).json({ message: "Technology updated successfully", technology: updatedTechnology });
  } catch (error) {
    console.error("Error updating Technology:", error);
    res.status(500).json({ message: "Error updating Technology", error: error.message });
  }
});

export default TechnologyRouter;





// import express from "express";
// import Technology from "../models/TechnologyModel.js";

// const TechnologyRouter = express.Router();

// // Add a new technology
// TechnologyRouter.post("/add", async (req, res) => {
//   const { title, category, imageId } = req.body;

//   try {
//     const newTechnology = new Technology({
//       title,
//       category,
//       imageId, // Save the imageId in the database
//     });

//     await newTechnology.save();
//     res.status(201).json({ message: "Technology created successfully", technology: newTechnology });
//   } catch (error) {
//     console.error("Error creating technology:", error);
//     res.status(500).json({ message: "Error creating technology", error: error.message });
//   }
// });

// // Update an existing technology
// TechnologyRouter.put("/edit", async (req, res) => {
//   const { id, title, category, imageId } = req.body;

//   try {
//     const updatedTechnology = await Technology.findByIdAndUpdate(
//       id,
//       { title, category, imageId }, // Update the imageId in the database
//       { new: true } // Return the updated document
//     );

//     if (!updatedTechnology) {
//       return res.status(404).json({ message: "Technology not found" });
//     }

//     res.status(200).json({ message: "Technology updated successfully", technology: updatedTechnology });
//   } catch (error) {
//     console.error("Error updating technology:", error);
//     res.status(500).json({ message: "Error updating technology", error: error.message });
//   }
// });

// // Get a technology by ID
// TechnologyRouter.get("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const technology = await Technology.findById(id);
//     if (!technology) {
//       return res.status(404).json({ message: "Technology not found" });
//     }

//     res.status(200).json({ technology });
//   } catch (error) {
//     console.error("Error fetching technology:", error);
//     res.status(500).json({ message: "Error fetching technology", error: error.message });
//   }
// });

// export default TechnologyRouter;