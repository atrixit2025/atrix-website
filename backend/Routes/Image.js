// import express from "express";
// import cors from "cors";
// import multer from "multer"
// import Image from "../Modal/ImageModal.js";
// import fs from 'fs/promises';
// import path from "path";
// import { fileURLToPath } from 'url';
// const app = express()
// app.use(cors())
// app.use(express.json())

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads/Image')
//     },
//     filename: (req, file, cb) => {
//       const sanitizedFilename = file.originalname.replace(/\s+/g, '_'); 
//       cb(null, Date.now() + "_" + sanitizedFilename); 
//   }
//   })
  
//   const upload = multer({ storage: storage })


//   const ImageRouter = express.Router();
  
//   ImageRouter.post("/add", upload.single('file'), async (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }
  

//     const image = `/Image/${req.file.filename}`;
  
//     try {
//       const newImage = new Image({
//         image
//       });
  
//       await newImage.save();
//       res.status(201).json({ message: 'Image created successfully', Image: newImage });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: 'Error creating Image', error: error.message });
//     }
//   });



  
//   ImageRouter.get("/get",async(req,res)=>{
//     try {
//       const image = await Image.find({})
//       if (!image.length) {
//         return res.status(404).json({ message: "No blogs found" });
//     }
//     return res.json({ Image: image });


//     } catch (error) {
//       console.error("Error fetching Image:", error);
//       return res.status(500).json({ message: "Error fetching Image", error: error.message });
//     }
//   })


//   ImageRouter.get("/:imageId", async (req, res) => {
//     try {
//       const { imageId } = req.params;
  
//       const imageDoc = await Image.findById(imageId);
//       if (!imageDoc) {
//         return res.status(404).json({ message: "Image not found in database" });
//       }
  
//       const imagePath = path.join(__dirname, "..", "uploads", "Image", imageDoc.image.replace(/^\/Image\//, ''));
  
//       // Check if file exists
//       try {
//         await fs.access(imagePath);
//       } catch (err) {
//         return res.status(404).json({ message: "Image file not found on server" });
//       }
  
//       // Send the file
//       res.sendFile(imagePath);
//     } catch (error) {
//       console.error("Error serving image:", error);
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
//   });
  

  
//   ImageRouter.get("/get/:imageId", async (req, res) => {
//     try {
//       const { imageId } = req.params;
  
//       // Find the image by its ID
//       const image = await Image.findById(imageId);
  
//       if (!image) {
//         return res.status(404).json({ message: "Image not found" });
//       }
  
//       // Return the image data
//       return res.json({ Image: image });
//     } catch (error) {
//       console.error("Error fetching image:", error);
//       return res.status(500).json({ message: "Error fetching image", error: error.message });
//     }
//   }); 
  
//   ImageRouter.delete("/delete", async (req, res) => {
//     try {
//       const { ImageUrl } = req.body;
  
 
//       if (!ImageUrl) {
//         return res.status(400).json({ message: "No image URL provided" });
//       }
  
//       const image = await Image.findOne({ image: ImageUrl });
//       if (!image) {
//         return res.status(404).json({ message: "Image not found in the database" });
//       }
  
//       const imagePath = path.join(__dirname, "..", "uploads", "Image", image.image.replace(/^\/Image\//, ''));
  

//       // console.log("Image Path:", imagePath);
  
   
//       try {
//         await fs.access(imagePath); 
//       } catch (err) {
//         console.error("Image file does not exist:", imagePath);
//         return res.status(404).json({ message: "Image file not found on the server" });
//       }
  
      
//       await fs.unlink(imagePath); 
  
//       await Image.findByIdAndDelete(image._id);
  
//       res.status(200).json({ message: "Image deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting image:", error);
//       res.status(500).json({ message: "Error deleting image", error: error.message });
//     }
//   });
  
  


//   export default ImageRouter;


import express from "express";
import cors from "cors";
import multer from "multer"
// import Image from "../Modal/ImageModal.js";
import fs from 'fs/promises';
import path from "path";
import { fileURLToPath } from 'url';
import file from "../Modal/ImageModal.js"; // Assuming you have a model for the files
const app = express()
app.use(cors())
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Store videos and images in separate directories
    const dest = file.mimetype.startsWith('video/') ? './uploads/Videos' : './uploads/Image';
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = file.originalname.replace(/\s+/g, '_'); 
    cb(null, Date.now() + "_" + sanitizedFilename); 
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/svg+xml',
      'video/mp4'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  }
});
  

  const ImageRouter = express.Router();
  
  ImageRouter.post("/add", upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
  
    const fileType = req.file.mimetype.startsWith('video') ? 'video' : 'image';
    const filePath = `/${fileType === 'video' ? 'Videos' : 'Image'}/${req.file.filename}`;
  
    try {
      const newFile = new file({
        file: filePath,
        type: fileType
      });
  
      await newFile.save();
      res.status(201).json({ 
        message: 'File uploaded successfully', 
        file: newFile 
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
  });

 
  ImageRouter.get("/get", async (req, res) => {
    try {
      const files = await file.find({});
  
      if (!files.length) {
        return res.status(404).json({ message: "No files found" });
      }
  
      // Build full URLs
      const host = req.protocol + "://" + req.get("host");
      const updatedFiles = files.map(file => ({
        _id: file._id,
        type: file.type,
        file: host + file.file,
        createdAt: file.createdAt
      }));
  
      return res.json({ files: updatedFiles });
    } catch (error) {
      console.error("Error fetching files:", error);
      return res.status(500).json({ message: "Error fetching files", error: error.message });
    }
  });
  


  ImageRouter.get("/:fileId", async (req, res) => {
    try {
      const { fileId } = req.params;
      const fileDoc = await file.findById(fileId);
      
      if (!fileDoc) {
        return res.status(404).json({ message: "File not found in database" });
      }
  
      // Get the filename from the stored path
      const filename = fileDoc.file.split('/').pop(); // Gets "1746122109194_ATRIX_COMPRESS_540.mp4"
      
      const filePath = path.join(
        __dirname, 
        "..", 
        "uploads", 
        fileDoc.type === 'video' ? "Videos" : "Image",
        filename
      );
  
      // Check if file exists
      try {
        await fs.access(filePath);
      } catch (err) {
        return res.status(404).json({ 
          message: "File not found on server",
          details: `Looking for: ${filePath}`
        });
      }
  
      // Set appropriate Content-Type header
      if (fileDoc.type === 'video') {
        res.set('Content-Type', 'video/mp4');
      } else {
        // Determine actual image type from extension
        const ext = path.extname(filename).toLowerCase();
        const contentType = {
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.gif': 'image/gif',
          '.svg': 'image/svg+xml'
        }[ext] || 'application/octet-stream';
        
        res.set('Content-Type', contentType);
      }
  
      // Send the file
      res.sendFile(filePath);
    } catch (error) {
      console.error("Error serving file:", error);
      res.status(500).json({ 
        message: "Server error", 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });
  

  
  ImageRouter.get("/get/:fileId", async (req, res) => {
    try {
      const { fileId } = req.params;
      const fileDoc = await file.findById(fileId);
      
      if (!fileDoc) {
        return res.status(404).json({ message: "File not found in database" });
      }
  
      // Return in format frontend expects
      return res.json({ 
        file: {
          _id: fileDoc._id,
          file: fileDoc.file, // Using 'image' to match frontend
          type: fileDoc.type
        }
      });
    } catch (error) {
      console.error("Error fetching file:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  
  
  
  ImageRouter.delete("/delete", async (req, res) => {
    try {
      const { fileUrl } = req.body; // Changed from ImageUrl to fileUrl to match your model
  
      if (!fileUrl) {
        return res.status(400).json({ message: "No file URL provided" });
      }
  
      // Find the file in database
      const fileDoc = await file.findOne({ file: fileUrl }); // Using 'file' field instead of 'image'
      if (!fileDoc) {
        return res.status(404).json({ message: "File not found in the database" });
      }
  
      // Construct proper file path based on type
      const filePath = path.join(
        __dirname, 
        "..", 
        "uploads", 
        fileDoc.type === 'video' ? "Videos" : "Image",
        fileDoc.file.split('/').pop() // Get filename from path
      );
  
      // Check if file exists
      try {
        await fs.access(filePath);
      } catch (err) {
        console.error("File does not exist:", filePath);
        return res.status(404).json({ message: "File not found on the server" });
      }
  
      // Delete file from filesystem
      await fs.unlink(filePath);
  
      // Delete record from database
      await file.findByIdAndDelete(fileDoc._id);
  
      res.status(200).json({ 
        message: "File deleted successfully",
        deletedFile: {
          _id: fileDoc._id,
          file: fileDoc.file,
          type: fileDoc.type
        }
      });
    } catch (error) {
      console.error("Error deleting file:", error);
      res.status(500).json({ 
        message: "Error deleting file", 
        error: error.message 
      });
    }
  });
  


  export default ImageRouter;