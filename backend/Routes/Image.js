import express from "express";
import cors from "cors";
import multer from "multer"
import Image from "../Modal/ImageModal.js";
import fs from 'fs/promises';
import path from "path";
import { fileURLToPath } from 'url';
const app = express()
app.use(cors())
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/Image')
    },
    filename: (req, file, cb) => {
      const sanitizedFilename = file.originalname.replace(/\s+/g, '_'); 
      cb(null, Date.now() + "_" + sanitizedFilename); 
  }
  })
  
  const upload = multer({ storage: storage })


  const ImageRouter = express.Router();
  
  ImageRouter.post("/add", upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
  

    const image = `/Image/${req.file.filename}`;
  
    try {
      const newImage = new Image({
        image
      });
  
      await newImage.save();
      res.status(201).json({ message: 'Image created successfully', Image: newImage });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error creating Image', error: error.message });
    }
  });



  
  ImageRouter.get("/get",async(req,res)=>{
    try {
      const image = await Image.find({})
      if (!image.length) {
        return res.status(404).json({ message: "No blogs found" });
    }
    return res.json({ Image: image });


    } catch (error) {
      console.error("Error fetching Image:", error);
      return res.status(500).json({ message: "Error fetching Image", error: error.message });
    }
  })

  
  ImageRouter.get("/get/:imageId", async (req, res) => {
    try {
      const { imageId } = req.params;
  
      // Find the image by its ID
      const image = await Image.findById(imageId);
  
      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }
  
      // Return the image data
      return res.json({ Image: image });
    } catch (error) {
      console.error("Error fetching image:", error);
      return res.status(500).json({ message: "Error fetching image", error: error.message });
    }
  }); 
  
  ImageRouter.delete("/delete", async (req, res) => {
    try {
      const { ImageUrl } = req.body;
  
 
      if (!ImageUrl) {
        return res.status(400).json({ message: "No image URL provided" });
      }
  
      const image = await Image.findOne({ image: ImageUrl });
      if (!image) {
        return res.status(404).json({ message: "Image not found in the database" });
      }
  
      const imagePath = path.join(__dirname, "..", "uploads", "Image", image.image.replace(/^\/Image\//, ''));
  

      // console.log("Image Path:", imagePath);
  
   
      try {
        await fs.access(imagePath); 
      } catch (err) {
        console.error("Image file does not exist:", imagePath);
        return res.status(404).json({ message: "Image file not found on the server" });
      }
  
      
      await fs.unlink(imagePath); 
  
      await Image.findByIdAndDelete(image._id);
  
      res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ message: "Error deleting image", error: error.message });
    }
  });
  
  


  export default ImageRouter;