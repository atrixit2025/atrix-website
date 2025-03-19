import express from "express";
import cors from "cors";
import Blog from "../../Modal/BlogModals/BlogModal.js";
const app = express();
app.use(cors());
app.use(express.json());

const BlogRouter = express.Router();

BlogRouter.post("/add", async (req, res) => {
  const { title, category,description, imageId } = req.body; 
  if (!title || !category ||! description|| !imageId) {
    return res.status(400).json({ message: "Title, category,description, and imageId are required" });
  }

  try {
    const newBlog = new Blog({
      title,
      category,
      description,
      image: imageId, 
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', Blog: newBlog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating Blog', error: error.message });
  }
});

BlogRouter.get("/get", async (req, res) => {
  try {
    const blog = await Blog.find({}).populate('image'); 
    if (!blog.length) {
      return res.status(404).json({ message: "No technologies found" });
    }
    return res.json({ Blog: blog });
  } catch (error) {
    console.error("Error fetching Blog:", error);
    return res.status(500).json({ message: "Error fetching Blog", error: error.message });
  }
});


BlogRouter.put("/edit", async (req, res) => {
  const { id, title, category,description, imageId } = req.body; 

  if (!id || !title || !category || description|| !imageId) {
    return res.status(400).json({ message: "ID, title, category,description, and imageId are required" });
  }

  try {

    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    existingBlog.title = title;
    existingBlog.category = category;
    existingBlog.description = description;

    existingBlog.image = imageId;

    const updatedBlog = await existingBlog.save();

    res.status(200).json({ message: "Blog updated successfully", Blog: updatedBlog });
  } catch (error) {
    console.error("Error updating Blog:", error);
    res.status(500).json({ message: "Error updating Blog", error: error.message });
  }
});

BlogRouter.delete("/delete", async (req, res) => {
  const { title, category, description,} = req.body;

  if (!title || !category ||!description) {
    return res.status(400).json({ message: "Title and category description,are required" });
  }

  try {
    const deletedBlog = await Blog.findOneAndDelete({ title, category, description});

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully", Blog: deletedBlog });
  } catch (error) {
    console.error("Error deleting Blog:", error);
    res.status(500).json({ message: "Error deleting Blog", error: error.message });
  }
});

export default BlogRouter;




