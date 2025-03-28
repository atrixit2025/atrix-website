import express from "express";
import cors from "cors";
import Blog from "../../Modal/BlogModals/BlogModal.js";
const app = express();
app.use(cors());
app.use(express.json());

const BlogRouter = express.Router();

BlogRouter.post("/add", async (req, res) => {
  // console.log("Received data:", req.body); // Debug log
  
  const { title, category, text, FeaturedImageId, image, fullImage, bigImage } = req.body;
  
  if (!title || !category || !FeaturedImageId) {
    return res.status(400).json({ 
      message: "Title, category, and featured image are required",
      received: req.body 
    });
  }

  try {
    const newBlog = new Blog({
      title,
      category,
      text: text || "",
      FeaturedImage: FeaturedImageId,
      image: image || undefined,
      fullImage: fullImage || undefined,
      bigImage: bigImage || undefined
    });

    console.log("Blog to be saved:", newBlog); // Debug log
    
    const savedBlog = await newBlog.save();
    res.status(201).json({ 
      message: 'Blog created successfully', 
      blog: savedBlog 
    });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ 
      message: 'Error creating blog', 
      error: error.message 
    });
  }
});

BlogRouter.get("/get", async (req, res) => {
  try {
    const blog = await Blog.find({}).populate('image'); 
    if (!blog.length) {
      return res.status(404).json({ message: "No Blogs found" });
    }
    return res.json({ Blog: blog });
  } catch (error) {
    console.error("Error fetching Blog:", error);
    return res.status(500).json({ message: "Error fetching Blog", error: error.message });
  }
});


// BlogRouter.put("/edit", async (req, res) => {
//   const { id, title, category,text, imageId } = req.body; 

//   if (!id || !title || !category ||! text|| !imageId) {
//     return res.status(400).json({ message: "ID, title, category,text, and imageId are required" });
//   }

//   try {

//     const existingBlog = await Blog.findById(id);
//     if (!existingBlog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     existingBlog.title = title;
//     existingBlog.category = category;
//     existingBlog.text = text;

//     existingBlog.image = imageId;

//     const updatedBlog = await existingBlog.save();

//     res.status(200).json({ message: "Blog updated successfully", Blog: updatedBlog });
//   } catch (error) {
//     console.error("Error updating Blog:", error);
//     res.status(500).json({ message: "Error updating Blog", error: error.message });
//   }
// });

BlogRouter.put("/edit", async (req, res) => {
  const { id, title, category, text, FeaturedImageId, image, fullImageId, bigImageId } = req.body;

  // Required fields validation
  if (!id || !title || !category || !text || !FeaturedImageId) {
    return res.status(400).json({ message: "All required fields must be provided" });
  }

  try {
    const updateData = {
      title,
      category,
      text,
      FeaturedImage: FeaturedImageId,
      ...(image && { image }),
      ...(fullImageId && { fullImage: fullImageId }),
      ...(bigImageId && { bigImage: bigImageId })
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Error updating blog", error: error.message });
  }
});


BlogRouter.delete("/delete", async (req, res) => {
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
  
        const result = await Blog.bulkWrite(deleteOperations);
        
        return res.status(200).json({ 
          message: `${result.deletedCount} Blogs deleted successfully`,
          result
        });
      } catch (error) {
        console.error("Error bulk deleting Blogs:", error);
        return res.status(500).json({ message: "Error bulk deleting Blogs", error: error.message });
      }
    }
  
    // Handle single delete (original functionality)
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: "Title and category are required" });
    }
  
    try {
      const deletedBlog = await Blog.findOneAndDelete({ title, category });
      if (!deletedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(200).json({ message: "Blog deleted successfully", blog: deletedBlog });
    } catch (error) {
      console.error("Error deleting Blog:", error);
      res.status(500).json({ message: "Error deleting Blog", error: error.message });
    }
  });

  BlogRouter.get("/count/category", async (req, res) => {
    try {
      const Blogs = await Blog.find({});
      
      // Create a map to count categories
      const categoryCounts = {};
      
      Blogs.forEach(tech => {
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
      console.error("Error counting Blogs by category:", error);
      res.status(500).json({ 
        message: "Error counting Blogs by category", 
        error: error.message 
      });
    }
  });

export default BlogRouter;




