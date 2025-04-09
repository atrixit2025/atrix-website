import express from "express";
import cors from "cors";
import Blog from "../../Modal/BlogModals/BlogModal.js";
const app = express();
app.use(cors());
app.use(express.json());

const BlogRouter = express.Router();

BlogRouter.post("/add", async (req, res) => {
  const { title, category, FeaturedImageId, contentSections } = req.body;
  // console.log("Received body:", req.body);
  if (!title || !category || !FeaturedImageId) {
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
    const newBlog = new Blog({
      title,
      category,
      FeaturedImage: FeaturedImageId,
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

    const savedBlog = await newBlog.save();
    res.status(201).json({ 
      message: 'Blog created successfully', 
      blog: savedBlog 
    });
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ 
      message: 'Error creating blog', 
      error: error.message,
      details: error.errors // This will show validation errors if any
    });
  }
});

BlogRouter.get("/get", async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('FeaturedImage', 'url'); // Assuming you have a reference
    if (!blogs.length) {
      return res.status(404).json({ message: "No Blogs found" });
    }
    
    // Map blogs to include image URLs
    const blogsWithUrls = blogs.map(blog => ({
      ...blog.toObject(),
      FeaturedImageUrl: blog.FeaturedImage?.url || null
    }));
    
    return res.json({ Blog: blogsWithUrls });
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
  const { 
    id, // Now coming from request body instead of URL params
    title, 
    category, 
    FeaturedImageId, 
    contentSections 
  } = req.body;

  // Basic validation
  if (!id) {
    return res.status(400).json({ message: "Blog ID is required in the request body" });
  }

  if (!title || !category || !FeaturedImageId) {
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
    // Find the existing blog
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Prepare update data
    const updateData = {
      title,
      category,
      FeaturedImage: FeaturedImageId,
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

    // Update the blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true } // Return the updated document
    );

    res.status(200).json({ 
      message: "Blog updated successfully", 
      blog: updatedBlog 
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ 
      message: "Error updating blog", 
      error: error.message,
      ...(error.errors && { details: error.errors })
    });
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




