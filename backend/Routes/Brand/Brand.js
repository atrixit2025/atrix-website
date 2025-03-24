import express from "express";
import cors from "cors";
import Brand from "../../Modal/BrandModals/BrandModal.js";

const app = express();
app.use(cors());
app.use(express.json());

const BrandRouter = express.Router();

BrandRouter.post("/add", async (req, res) => {
  const {  imageId } = req.body; 
  if ( !imageId) {
    return res.status(400).json({ message: " and imageId are required" });
  }

  try {
    const newBrand = new Brand({
 
      
      image: imageId, 
    });

    await newBrand.save();
    res.status(201).json({ message: 'Brand created successfully', Brand: newBrand });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating Brand', error: error.message });
  }
});

BrandRouter.get("/get", async (req, res) => {
  try {
    const brand = await Brand.find({}).populate('image'); 
    if (!brand.length) {
      return res.status(404).json({ message: "No technologies found" });
    }
    return res.json({ Brand: brand });
  } catch (error) {
    console.error("Error fetching Brand:", error);
    return res.status(500).json({ message: "Error fetching Brand", error: error.message });
  }
});


BrandRouter.put("/edit", async (req, res) => {
  const { id,  imageId } = req.body; 

  if (!id ||  !imageId) {
    return res.status(400).json({ message: "ID,  and imageId are required" });
  }

  try {

    const existingBrand = await Brand.findById(id);
    if (!existingBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }



    existingBrand.image = imageId;

    const updatedBrand = await existingBrand.save();

    res.status(200).json({ message: "Brand updated successfully", Brand: updatedBrand });
  } catch (error) {
    console.error("Error updating Brand:", error);
    res.status(500).json({ message: "Error updating Brand", error: error.message });
  }
});

BrandRouter.delete("/delete", async (req, res) => {
    const { id } = req.body; // Change to use id instead of image
  
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
  
    try {
      const deletedBrand = await Brand.findByIdAndDelete(id);
  
      if (!deletedBrand) {
        return res.status(404).json({ message: "Brand not found" });
      }
  
      res.status(200).json({ 
        message: "Brand deleted successfully", 
        Brand: deletedBrand 
      });
    } catch (error) {
      console.error("Error deleting Brand:", error);
      res.status(500).json({ 
        message: "Error deleting Brand", 
        error: error.message 
      });
    }
  });

export default BrandRouter;




