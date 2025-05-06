import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FileInputExample from "../form-elements/FileInputExample";
import Button from "../../ui/button/Button";
import Checkbox from "../input/Checkbox";
import Label from "../Label";
import Input from "../input/InputField";
import ComponentCategory from "../../common/ComponentCategoryCard";
import axios from "axios";
import SelectBulk from "../SelectBulk";
import JoditEditor from 'jodit-react';
import SelectFileInput from "../form-elements/SelectFileInput";
import { BlogCategoryContext } from "../../../ContextApi/BlogCategoryContextApi";
import { PortfolioCategoryContext } from "../../../ContextApi/PortfolioCategoryContextApi";

import { ImageProvider } from "../../../ContextApi/ImageApi";
import { TechnologyCategoryContext } from "../../../ContextApi/CategoryContextApi";
import { ServicesCategoryContext } from "../../../ContextApi/ServicesCategoryContextApi";

const GenericForm = ({
  title,
  editTitle,
  apiEndpoint,
  categoryEndpoint,
  redirectPath,


  hasContentSections = true,
  hasRichText = true,
  contentType = 'blog' || 'portfolio' || 'technology' || 'services',
  onSuccess,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const editor = useRef(null);
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState('');
  const [imageFields, setImageFields] = useState({});
  const [selectFields, setSelectFields] = useState([{
    id: 1,
    value: "",
    options: [
      { value: "", label: "Select Option" },
      { value: "text", label: "Text" },
      { value: "image", label: "Image" },
      { value: "full-image", label: "Full Image" },
      { value: "big-image", label: "Big Image" }
    ],
    textContent: "",
    imageFile: null
  }]);

  const { item } = location.state || {};
  const CategoryContext = contentType === 'blog' || 'portfolio' || 'technology' || 'services' ?
    useContext(BlogCategoryContext) :
    useContext(PortfolioCategoryContext);
  useContext(TechnologyCategoryContext);
  useContext(ServicesCategoryContext);

  const { fetchCategoryCounts } = CategoryContext || {};

  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    selectedCategories: [],
    imageUrl: null, // Changed from imageId to imageUrl
  });

  // Fetch categories
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

  // Pre-fill form in edit mode
  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || item.name || "",
        selectedCategories: item.category ? item.category.split(", ") : [],
        imageUrl: item.FeaturedImage || item.imageUrl || null, // Use URL instead of ID
      });

      console.log("Item in edit mode:", item);

      // Update content sections initialization
      if (hasContentSections) {
        const initialFields = item.contentSections?.length > 0
          ? item.contentSections.map((section, index) => ({
            id: index + 1,
            value: {
              value: section.type,
              label: section.type.charAt(0).toUpperCase() + section.type.slice(1)
            },
            options: [
              { value: "", label: "Select Option" },
              { value: "text", label: "Text" },
              { value: "image", label: "Image" },
              { value: "full-image", label: "Full Image" },
              { value: "big-image", label: "Big Image" }
            ],
            textContent: section.type === 'text' ? section.content : "",
            imageFile: section.type !== 'text' ? {
              url: section.imageUrl, // Use URL instead of ID
              name: "Existing image",
              type: section.type
            } : null
          }))
          : [/* ... */];

        setSelectFields(initialFields);
      }
    }
  }, [item, hasContentSections]);

  // Handlers
  const handleCategoryChange = (category) => {
    setFormData(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter(cat => cat !== category)
        : [...prev.selectedCategories, category],
    }));
  };

  const handleSubmit = async () => {
    const { title, selectedCategories, imageUrl } = formData;

    if (!title || selectedCategories.length === 0 || !imageUrl) {
      alert("Title, category, and image are required!");
      return;
    }

    const payload = {
      title,
      category: selectedCategories.join(", "),
      featuredImage: imageUrl, // Send URL instead of ID
      ...(hasContentSections && {
        contentSections: selectFields.map(field => ({
          type: field.value.value,
          ...(field.value.value === 'text' ? { content: field.textContent } :
            { imageUrl: field.imageFile?.url || null }) // Send URL instead of ID
        }))
      }
      )
    };
    console.log("Payload to be sent:", JSON.stringify(payload, null, 2));

    // Add ID to payload if in edit mode
    if (item?.id) {
      payload.id = item.id;
    }

    try {
      const response = item
        ? await axios.put(`${apiEndpoint}/edit`, payload)
        : await axios.post(`${apiEndpoint}/add`, payload);

      if (fetchCategoryCounts) await fetchCategoryCounts();
      if (onSuccess) await onSuccess();
      navigate(redirectPath);
    } catch (error) {
      console.error("Error saving item:", {
        error: error.response?.data || error.message,
        payload: payload
      });
      alert(error.response?.data?.message || "Error saving. Please try again.");
    }
  };

  // Content section handlers
  const addSelectField = () => {
    const newId = selectFields.length > 0 ? Math.max(...selectFields.map(f => f.id)) + 1 : 1;
    setSelectFields([...selectFields, {
      id: newId,
      value: "",
      options: [
        { value: "", label: "Select Option" },
        { value: "text", label: "Text" },
        { value: "image", label: "Image" },
        { value: "full-image", label: "Full Image" },
        { value: "big-image", label: "Big Image" }
      ],
      textContent: "",
      imageFile: null
    }]);
  };

  const removeSelectField = (id) => {
    if (selectFields.length > 1) {
      setSelectFields(selectFields.filter(field => field.id !== id));
    }
  };

  const handleSelectChange = (id, value) => {
    setSelectFields(selectFields.map(field =>
      field.id === id ? { ...field, value } : field
    ));
  };

  const handleTextChange = (id, newContent) => {
    setSelectFields(selectFields.map(field =>
      field.id === id ? { ...field, textContent: newContent } : field
    ));
  };
  const handleImageChange = (id, imageUrl, fieldType) => {
    setSelectFields(selectFields.map(field => {
      if (field.id === id) {
        return {
          ...field,
          imageFile: {
            url: imageUrl, // Store URL directly
            type: fieldType,
            name: "Uploaded image"
          }
        };
      }
      return field;
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white/90">
          {item ? editTitle : title}
        </h1>
        <div>
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer"
            onClick={handleSubmit}
          >
            {item ? "Update" : "Publish"}
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
                setFormData(prev => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          {hasContentSections && selectFields.map((field, index) => (
            <div key={field.id} className="card mb-3 border-2 px-4 py-2 rounded-xl border-gray-700">
              <div className="card-header">
                <h4 className="card-title flex justify-between items-center mb-2">
                  Content Section
                  <div className="flex items-center gap-5">
                    {index > 0 && (
                      <button
                        onClick={() => removeSelectField(field.id)}
                        className="text-red-500 text-3xl mt-3"
                      >
                        -
                      </button>
                    )}
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

                {field.value?.value === "text" && (
                  <div className="form-group text-black">

                    <JoditEditor
                      ref={editor}
                      value={field.textContent || ""}
                      onChange={(newContent) => handleTextChange(field.id, newContent)}
                    />

                  </div>
                )}

                {(field.value?.value === "image" ||
                  field.value?.value === "full-image" ||
                  field.value?.value === "big-image") && (
                    <div className="form-group">
                      <SelectFileInput
                        NameOffield="Image"
                        onImageUpload={(imageId, imageType) =>
                          handleImageChange(field.id, imageId, imageType || field.value?.value)
                        }
                        imageId={field.imageFile?.id}
                        existingImage={field.imageFile}
                      />

                      {/* Optional: Show image type indicator */}
                      {field.imageFile?.type && (
                        <div className="mt-2 text-sm text-gray-500">
                          Image Type: {field.imageFile.type}
                        </div>
                      )}
                    </div>
                  )}         </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <ComponentCategory title="Category" link={`/Dashboard/Category${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`}>
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
              Componenttitle="Featured Image"
              h1="Featured Image"
              SetButtonName=" Set Featured Image"
              setName=" Set Featured Image "
              onfilesUpload={(imageUrl) =>  // Changed to receive URL instead of ID
                setFormData(prev => ({ ...prev, imageUrl }))
              }
              filesUrl={item?.FeaturedImage || item?.imageUrl || item?.featuredImageUrl}
            />
          </ImageProvider>
        </div>
      </div>
    </div>
  );
};

export default GenericForm;