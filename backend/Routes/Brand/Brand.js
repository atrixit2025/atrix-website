import express from "express";
import cors from "cors";
import Brand from "../../Modal/BrandModals/BrandModal.js";

const app = express();
app.use(cors());
app.use(express.json());

const BrandRouter = express.Router();

// Create a new brand
BrandRouter.post("/add", async (req, res) => {
  const { title, featuredImage, link } = req.body;

  if (!title || !featuredImage  ) {
    return res.status(400).json({ message: "Title, featuredImage are required" });
  }

  try {
    const newBrand = new Brand({
      title,
      FeaturedImage: featuredImage,
      link,
     
    });

    await newBrand.save();
    res.status(201).json({ message: 'Brand created successfully', Brand: newBrand });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating Brand', error: error.message });
  }
});


// Get brands
BrandRouter.get("/get", async (req, res) => {
  try {
    const brand = await Brand.find({}) // Get the brand details with the image
    // if (!brand.length) {
    //   return res.status(404).json({ message: "No brands found" });
    // }
    return res.json({ Brand: brand });
  } catch (error) {
    console.error("Error fetching Brand:", error);
    return res.status(500).json({ message: "Error fetching Brand", error: error.message });
  }
});

// Edit brand
BrandRouter.put("/edit", async (req, res) => {
  const { id, title, featuredImage, link } = req.body;

  if (!id || !title || !featuredImage  ) {
    return res.status(400).json({ message: "ID, title, featuredImage are required" });
  }

  try {
    const existingBrand = await Brand.findById(id);
    if (!existingBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // Update the brand fields
    existingBrand.title = title;
    existingBrand.FeaturedImage = featuredImage;
    existingBrand.link = link;
   

    const updatedBrand = await existingBrand.save();

    res.status(200).json({ message: "Brand updated successfully", Brand: updatedBrand });
  } catch (error) {
    console.error("Error updating Brand:", error);
    res.status(500).json({ message: "Error updating Brand", error: error.message });
  }
});


// Delete brand
BrandRouter.delete("/delete", async (req, res) => {
  const { id } = req.body;

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
      Brand: deletedBrand,
    });
  } catch (error) {
    console.error("Error deleting Brand:", error);
    res.status(500).json({
      message: "Error deleting Brand",
      error: error.message,
    });
  }
});

export default BrandRouter;
