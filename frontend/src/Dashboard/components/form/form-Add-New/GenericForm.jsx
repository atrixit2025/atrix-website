import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImageProvider } from "../../../ContextApi/ImageApi";
import FileInputExample from "../form-elements/FileInputExample";
import ComponentCategory from "../../common/ComponentCategoryCard";
import Checkbox from "../input/Checkbox";
import Input from "../input/InputField";
import Label from "../Label";
import Button from "../../ui/button/Button";
import axios from "axios";


const GenericForm = ({
  // Props to customize the form
  title,
  editTitle,
  apiEndpoint,
  categoryEndpoint,
  redirectPath,
  categoryLink,
  initialData,
  onSuccess,
}) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    selectedCategories: [],
    imageId: null,
  });
  

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(categoryEndpoint);
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [categoryEndpoint]);

  // Pre-fill form if in edit mode
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.name || "",
        selectedCategories: initialData.Category ? initialData.Category.split(", ") : [],
        imageId: initialData.imageId || null,
      });
    }
  }, [initialData]);

  const handleCategoryChange = (category) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((cat) => cat !== category)
        : [...prev.selectedCategories, category],
    }));
  };

  const handleSubmit = async () => {
    const { title, selectedCategories, imageId } = formData;

    if (!title || selectedCategories.length === 0 || !imageId) {
      alert("Title, category, and image are required!");
      return;
    }

    const payload = {
      title,
      category: selectedCategories.join(", "),
      imageId,
      ...(initialData?.id && { id: initialData.id }), // Include ID if editing
    };

    try {
      if (initialData) {
        await axios.put(`${apiEndpoint}/edit`, payload);
      } else {
        await axios.post(`${apiEndpoint}/add`, payload);
      }
      if (onSuccess) {
        await onSuccess();
      }
      navigate(redirectPath);
    } catch (error) {
      console.error("Error saving data:", error);
      alert(`Error saving data. Please try again. ${error.response?.data?.message || ""}`);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white/90">
          {initialData ? editTitle : title}
        </h1>
        <div>
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer"
            onClick={handleSubmit}
          >
            {initialData ? "Update" : "Publish"}
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
        </div>
        <div className="space-y-6">
          <div>
            <ComponentCategory title="Category" link={categoryLink}>
              <div className="items-center gap-4 space-y-5">
                {categories.map((category) => (
                  <div key={category._id} className="flex items-center gap-3">
                    <Checkbox
                      id={`category-${category._id}`}
                      checked={formData.selectedCategories.includes(category.Name)}
                      onChange={() => handleCategoryChange(category.Name)}
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
              imageId={initialData?.imageId}
            />
          </ImageProvider>
        </div>
      </div>
    </div>
  );
};

export default GenericForm;