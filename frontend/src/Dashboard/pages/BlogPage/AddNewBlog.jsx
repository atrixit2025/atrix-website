import React, { useState, useEffect, useContext } from "react";
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
import { BlogCategoryContext } from "../../ContextApi/BlogCategoryContextApi";
import SelectBulk from "../../components/form/SelectBulk";
import JoditEditor from 'jodit-react';
import SelectFileInput from "../../components/form/form-elements/SelectFileInput";

export default function AddNewBlog() {
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { fetchCategoryCounts} = useContext(BlogCategoryContext);

  // Single state object for form data
  const [formData, setFormData] = useState({
    title: "",
    text: "",
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
        text: blog.text || "",
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
    const { title, text, selectedCategories, imageId } = formData;

    if (!title || selectedCategories.length === 0 || !imageId) {
      alert("Title, category, and image are required!");
      return;
    }

    const blogData = {
      title,
      text,
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
        // console.log("Payload:", payload); // Debug the payload
        const response = await axios.put(`http://localhost:5300/Blog/edit`, payload);
        // console.log("Update Response:", response.data);
      } else {
        // Create new blog
        const response = await axios.post("http://localhost:5300/Blog/add", blogData);
        // console.log("Create Response:", response.data);
      }
         await fetchCategoryCounts()
      navigate("/Dashboard/Blog");
    } catch (error) {
      console.error("Error saving blog:", error);
      if (error.response) {
        console.error("Server Response:", error.response.data);
      }
      alert("Error saving blog. Please try again.");
    }
  };


   const [selectFields, setSelectFields] = useState(() => {
      return  [
        {
          id: 1,
          value: "",
          options: [
            { value: "", label: "Select Option" },
            { value: "text", label: "Text" },
            { value: "image", label: "Image" },
            { value: "full-image", label: "Full Image" },
            { value: "big-image", label: "Big Image" }
          ],
          textValue: "",
          imageFile: null
        }
      ];
    });
  
  
  
  
    const addSelectField = () => {
      const newId = selectFields.length > 0 ? Math.max(...selectFields.map(f => f.id)) + 1 : 1;
      setSelectFields([
        ...selectFields,
        {
          id: newId,
          value: "",
          options: [
            { value: "", label: "Select Option" },
            { value: "text", label: "Text" },
            { value: "image", label: "Image" },
            { value: "full-image", label: "Full Image" },
            { value: "big-image", label: "Big Image" }
          ],
          textValue: "",
          imageFile: null
        }
      ]);
    };
  
  
    const handleSelectChange = (id, value) => {
      // console.log(`Field ${id} changed to:`, value);
      setSelectFields(selectFields.map(field =>
        field.id === id ? { ...field, value } : field
      ));
    };
  
  
    const removeSelectField = (id) => {
      if (selectFields.length > 1) {
        setSelectFields(selectFields.filter(field => field.id !== id));
      }
    };
  
    const handleTextChange = (id, textValue) => {
      setSelectFields(selectFields.map(field =>
        field.id === id ? { ...field, textValue } : field
      ));
    };
  
    const handleImageChange = (id, imageFile) => {
      setSelectFields(selectFields.map(field =>
        field.id === id ? { ...field, imageFile } : field
      ));
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
          {/* <div>
            <Label htmlFor="text">Add text</Label>
            <TextArea
              id="text"
            
            />
          </div> */}

          
          {selectFields.map((field, index) => (
            <div key={field.id} className="card mb-3 border-2 px-4 py-2 rounded-xl border-gray-700">
              <div className="card-header ">
                <h4 className="card-title flex justify-between items-center mb-2">
                  Select Field {index + 1}
                  <div className="flex items-center gap-5">
                    {/* Show minus button only if not the first field */}
                    {index > 0 && (
                      <button
                        onClick={() => removeSelectField(field.id)}
                        className="text-red-500 text-3xl mt-3"
                      >
                        -
                      </button>
                    )}
                    {/* Show plus button only on the last field */}
                    {index === selectFields.length - 1 && (
                      <button
                        onClick={addSelectField}
                        className="flex items-center gap-2 text-blue-500 mt-4"
                      >
                        <span className="text-3xl">+</span>
                      </button>
                    )}
                  </div>
                </h4>
              </div>
              <div className="card-body">
                <div className="form-group mb-3">
                  <SelectBulk
                    options={field.options}
                    value={field.value}
                    onChange={(value) => handleSelectChange(field.id, value)}
                    className="form-control"
                  />
                </div>
                {/* {console.log(`Field ${field.id} value:`, field.value)} */}
                {field.value?.value === "text" && (
                  <div className="form-group text-black ">
                    {/* <Label htmlFor={`text-input-${field.id}`}>Text Content</Label>
                    <TextArea
                      id={`text-input-${field.id}`}
                      value={field.textValue}
                      onChange={(value) => handleTextChange(field.id, value)}
                      placeholder="Enter your text content"
                    /> */}
                    <JoditEditor 
              
                    />
                  </div>
                )}

                {(field.value?.value === "image" || field.value?.value === "full-image" || field.value?.value === "big-image") && (
                  <div className="form-group">
                    {/* <Label>Image Upload</Label> */}
                    <SelectFileInput
                      onImageUpload={(file) => handleImageChange(field.id, file)}
                      existingImage={field.imageFile}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

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