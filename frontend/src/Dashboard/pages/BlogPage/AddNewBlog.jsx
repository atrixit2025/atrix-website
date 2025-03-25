import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FileInputExample from "../../components/form/form-elements/FileInputExample";
import Button from "../../components/ui/button/Button";
import Checkbox from "../../components/form/input/Checkbox";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import ComponentCategory from "../../components/common/ComponentCategoryCard";
import { ImageProvider } from "../../ContextApi/ImageApi";
import axios from "axios";
import TextArea from "../../components/form/input/TextArea";

export default function AddNewBlog() {
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Single state object for form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    selectedCategories: [], // Default to an empty array
    imageId: null,
  });

  const { blog } = location.state || {};

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5300/BlogCategory/blog/category/get");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Pre-fill the form if in edit mode
  useEffect(() => {
    if (blog) {
      console.log("Blog data:", blog); // Debug the blog object
      setFormData({
        title: blog.name,
        description: blog.description || "",
        selectedCategories: blog.Category ? blog.Category.split(", ") : [], // Split into an array
        imageId: blog.imageId,
      });
    }
  }, [blog]);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((cat) => cat !== category) // Deselect
        : [...prev.selectedCategories, category], // Select
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const { title, description, selectedCategories, imageId } = formData;

    if (!title || selectedCategories.length === 0 || !imageId) {
      alert("Title, category, and image are required!");
      return;
    }

    const blogData = {
      title,
      description,
      category: selectedCategories.join(", "), // Join into a string
      imageId,
    };

    try {
      if (blog) {
        // Update existing blog
        const payload = {
          id: blog.id, // Ensure this is included
          ...blogData,
        };
        console.log("Payload:", payload); // Debug the payload
        const response = await axios.put(`http://localhost:5300/Blog/edit`, payload);
        console.log("Update Response:", response.data);
      } else {
        // Create new blog
        const response = await axios.post("http://localhost:5300/Blog/add", blogData);
        console.log("Create Response:", response.data);
      }

      navigate("/Dashboardblog");
    } catch (error) {
      console.error("Error saving blog:", error);
      if (error.response) {
        console.error("Server Response:", error.response.data);
      }
      alert("Error saving blog. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white/90">
          {blog ? "Edit Blog" : "Add New Blog"}
        </h1>
        <div>
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer"
            onClick={handleSubmit}
          >
            {blog ? "Update" : "Publish"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-[4fr_1fr] gap-6">
        <div className="space-y-10">
          <div>
            <Label htmlFor="input">Add Title</Label>
            <Input
              type="text"
              id="input"
              placeholder="Add Title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="description">Add Description</Label>
            <TextArea
              id="description"
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
            />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <ComponentCategory title="Category" link="/CategoryBlog">
              <div className="items-center gap-4 space-y-5">
                {categories.map((category) => (
                  <div key={category._id} className="flex items-center gap-3">
                    <Checkbox
                      id={`category-${category._id}`}
                      checked={formData.selectedCategories.includes(category.Name)} // Check if selected
                      onChange={() => handleCategoryChange(category.Name)} // Handle selection
                      label={category.Name}
                    />
                  </div>
                ))}
              </div>
            </ComponentCategory>
          </div>
          <ImageProvider>
            <FileInputExample
              onImageUpload={(imageId) =>
                setFormData((prev) => ({ ...prev, imageId }))
              }
              imageId={blog?.imageId}
            />
          </ImageProvider>
        </div>
      </div>
    </div>
  );
}