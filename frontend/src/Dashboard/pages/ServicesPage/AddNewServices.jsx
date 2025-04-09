
// import React,{useContext} from "react";
// import { useLocation } from "react-router-dom";
// import GenericForm from "../../components/form/form-Add-New/GenericForm";
// import { ServicesCategoryContext } from "../../ContextApi/ServicesCategoryContextApi";
// // import { ServicesCategoryContext } from "../../ContextApi/ServicesCategoryContextApi";

// export default function AddNewServices() {
//   const location = useLocation();
//   const { services } = location.state || {};
//   const { fetchCategoryCounts } = useContext(ServicesCategoryContext );
// console.log("Services",services)
//   return (
//     <GenericForm
//       title="Add New Services"
//       editTitle="Edit Services"
//       apiEndpoint="http://localhost:5300/Services"
//       categoryEndpoint="http://localhost:5300/ServicesCategory/Services/category/get"
//       redirectPath="/Dashboard/Services"
//       contentType="Services"
//       item={services}
//       hasContentSections={true}
//       hasRichText={true}
//       initialData={services}
//       onSuccess={fetchCategoryCounts}
//     />
//   );
// }




import React, { useState, useEffect, useContext, useRef } from "react";
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
import { ServicesCategoryContext } from "../../ContextApi/ServicesCategoryContextApi";
import SelectBulk from "../../components/form/SelectBulk";
import JoditEditor from 'jodit-react';
import SelectFileInput from "../../components/form/form-elements/SelectFileInput";
import TagsInput from "../../components/form/TagsInput";
import IconsInputExample from "../../components/form/form-elements/IconsInputExample";

export default function AddNewServices() {
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [portfolioCategory, setPortfolioCategory] = useState([]);

  const { fetchCategoryCounts } = useContext(ServicesCategoryContext);
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [imageFields, setImageFields] = useState({
    image: null,
    fullImage: null,
    bigImage: null
  });
  // Single state object for form data
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    selectedCategories: [],
    selectedPortfolioCategories: [],
    tags: [],
    iconImageId: null,
    imageId: null,
  });

  const { Services } = location.state || {};

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5300/ServicesCategory/Services/category/get");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5300/PortfolioCategory/Portfolio/category/get");
        setPortfolioCategory(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Pre-fill the form if in edit mode
  useEffect(() => {
    if (Services) {
      setFormData({
        title: Services.title,
        selectedCategories: Services.category ? Services.category.split(", ") : [],
        selectedPortfolioCategories: Services.portfolioCategories || [],
        tags: Services.tags || [],
        iconImageId: Services.iconImageId || null,
        imageId: Services.FeaturedImage
      });

      // Transform contentSections to selectFields
      const transformedFields = Services.contentSections.map((section, index) => ({
        id: index + 1,
        value: {
          value: section.type, label: section.type === 'text' ? 'Text' :
            section.type === 'image' ? 'Image' :
              section.type === 'full-image' ? 'Full Image' : 'Big Image'
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
          id: section.imageId,
          name: "Existing image",
          type: section.type
        } : null
      }));

      setSelectFields(transformedFields);

      // Set image fields
      const imageFields = {};
      Services.contentSections.forEach(section => {
        if (section.type !== 'text') {
          imageFields[section.type.replace('-', '')] = section.imageId;
        }
      });
      setImageFields(imageFields);
    }
  }, [Services]);

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
    const {
      title,
      selectedCategories,
      selectedPortfolioCategories,
      tags,
      iconImageId,
      imageId
    } = formData;
    console.log("Submitting with data:", {
      title: formData.title,
      selectedCategories: formData.selectedCategories,
      selectedPortfolioCategories: formData.selectedPortfolioCategories,
      tags: formData.tags,
      iconImageId: formData.iconImageId,
      imageId: formData.imageId,
      contentSections: selectFields.map(field => ({
        type: field.value?.value,
        content: field.textContent,
        imageId: field.imageFile?.id
      }))
    });
    const contentSections = selectFields.map(field => {
      if (field.value.value === 'text') {
        return {
          type: 'text',
          content: field.textContent
        };
      } else {
        return {
          type: field.value.value,
          imageId: field.imageFile?.id || null
        };
      }
    });
    // Validate required fields
    if (!title) {
      alert("Title is required!");
      return;
    }
    if (selectedCategories.length === 0) {
      alert("At least one category must be selected!");
      return;
    }
    if (!imageId) {

      alert("Featured image is required!");
      return;
    }

    // Prepare data for submission - field names match backend
    const ServicesData = {
      title,
      category: selectedCategories.join(", "),
      portfolioCategories: selectedPortfolioCategories,
      tags: tags.filter(tag => tag.trim() !== ""),
      iconImageId,
      FeaturedImageId: imageId,
      contentSections
    };

    //     console.log("Submitting Services data:", ServicesData);
    // console.log("Final imageFields state:", imageFields);
    // console.log("Final imageFields:", {
    //   image: imageFields.image,
    //   fullImage: imageFields.fullImage,
    //   bigImage: imageFields.bigImage
    // });
    try {
      if (Services) {
        await axios.put(`http://localhost:5300/Services/edit`, {
          id: Services.id,
          ...ServicesData
        });
      } else {
        await axios.post("http://localhost:5300/Services/add", ServicesData);
      }

      await fetchCategoryCounts();
      navigate("/Dashboard/Services");
    } catch (error) {
      console.error("Error saving Services:", error);
      alert(error.response?.data?.message || "Error saving Services. Please try again.");
    }
  };



  const [selectFields, setSelectFields] = useState(() => {
    return [
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

  const handleTagsChange = (newTags) => {
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const handlePortfolioCategoryChange = (category) => {
    setFormData(prev => ({
      ...prev,
      selectedPortfolioCategories: prev.selectedPortfolioCategories.includes(category)
        ? prev.selectedPortfolioCategories.filter(cat => cat !== category)
        : [...prev.selectedPortfolioCategories, category]
    }));
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

  const handleTextChange = (id, newContent) => {
    setSelectFields(selectFields.map(field =>
      field.id === id ? { ...field, textContent: newContent } : field
    ));
  };


  const handleImageChange = (id, imageId, fieldType) => {
    setSelectFields(selectFields.map(field => {
      if (field.id === id) {
        return {
          ...field,
          imageFile: {
            id: imageId,
            url: imageId ? `http://localhost:5300/Image/get/${imageId}` : null,
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
          {Services ? "Edit Services" : "Add New Services"}
        </h1>
        <div>
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer"
            onClick={handleSubmit}
          >
            {Services ? "Update" : "Publish"}
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
            <TagsInput
              initialTags={formData.tags}
              onChange={handleTagsChange}
            />
          </div>


          {selectFields.map((field, index) => (
            <div key={field.id} className="card mb-3 border-2 px-4 py-2 rounded-xl border-gray-700">
              <div className="card-header ">
                <h4 className="card-title flex justify-between items-center mb-2">
                  Select Field
                  {/* {index + 1} */}
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

                {field.value?.value === "text" && (
                  <div className="form-group text-black ">

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
                  )}
              </div>
            </div>
          ))}

        </div>
        <div className="space-y-6">
          <div>
            <ComponentCategory title="Category" link="/CategoryServices">
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
            <IconsInputExample
              onImageUpload={(imageId) =>
                setFormData(prev => ({ ...prev, iconImageId: imageId }))
              }
              imageId={formData.iconImageId}
            />
          </ImageProvider>


          <ImageProvider>
            <FileInputExample
              onImageUpload={(imageId) =>
                setFormData(prev => ({ ...prev, imageId }))
              }
              imageId={Services?.imageId || Services?.FeaturedImage}
            />
          </ImageProvider>

          <div>
            <ComponentCategory title="Portfolio Category" link="/CategoryPortfolio">
              <div className="items-center gap-4 space-y-5">
                {portfolioCategory.map((category) => (
                  <div key={category._id} className="flex items-center gap-3">
                    <Checkbox
                      id={`portfolio-category-${category._id}`}
                      checked={formData.selectedPortfolioCategories.includes(category.Name)}
                      onChange={() => handlePortfolioCategoryChange(category.Name)}
                      label={category.Name}
                    />
                  </div>
                ))}
              </div>
            </ComponentCategory>
          </div>


        </div>


      </div>
    </div>
  );
}