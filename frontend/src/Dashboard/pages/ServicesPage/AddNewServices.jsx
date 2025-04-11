
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
import Banner from "../../components/Services/Banner";
import WhydoNeed from "../../components/Services/WhydoNeed";
import WhyAtrix from "../../components/Services/WhyAtrix";
import Process from "../../components/Services/Process";
import MoreContent from "../../components/Services/MoreContent";

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
    description: "",
    Servicesquote: "",
    text: "",
    selectedCategories: [],
    selectedPortfolioCategories: [],
    tags: [],
    iconImageId: null,
    imageId: null,
    Banner: [],
    WhydoNeed: [],
    WhyAtrix: [],
    Process: [],
    servicescontent: [],
    contentSections: []
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
        description: Services.description || "",
        Servicesquote: Services.Servicesquote || "",
        selectedCategories: Services.category ? Services.category.split(", ") : [],
        selectedPortfolioCategories: Services.portfolioCategories 
        ? Services.portfolioCategories.split(", ") 
        : [],
        tags: Services.tags || [],
        iconImageId: Services.iconImageId || null,
        imageId: Services.FeaturedImage || null,
        Banner: Services.Banner || [],
        WhydoNeed: Services.WhydoNeed || [],
        WhyAtrix: Services.WhyAtrix || [],
        Process: Services.Process || [],
        servicescontent: Services.servicescontent || []
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
      description,
      selectedCategories,
      portfolioCategories,
      tags,
      iconImageId,
      imageId,
      Banner,
      WhydoNeed,
      WhyAtrix,
      Process,
      servicescontent
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
    // Validate required fields
    if (!title || !description || selectedCategories.length === 0 || !imageId) {
      alert("Title, description, at least one category, and featured image are required!");
      return;
    }

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

    const Bannerdata = (formData.Banner || [])
    .filter(item => item.type && item.imageId) // Only include complete items
    .map(item => ({
      type: item.type,
      imageId: item.imageId
    }));
  
  console.log("Processed Bannerdata:", Bannerdata); // Verify before submission
    
   // Add these logs to verify data:
console.log("Raw Banner data from form:", formData.Banner);
    const ServicesData = {
      title,
      description,
      Servicesquote: formData.Servicesquote || "",
      category: selectedCategories.join(", "),
      portfolioCategories: formData.selectedPortfolioCategories,
      tags: tags.filter(tag => tag.trim() !== ""),
      iconImageId,
      FeaturedImageId: imageId,
      Bannerdata,
      WhydoNeed,
      WhyAtrix,
      Process,
      servicescontent: formData.servicescontent.map(item => ({
        type: item.type || 'content', 
        heading: item.heading || "",
        cardheading: item.cardheading || "",
        description: item.description || "",
        ...(item.imageId && { imageId: item.imageId })
      })),
      contentSections
    };

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

  // Banner handler
  const handleBannerChange = (bannerData) => {
    setFormData(prev => ({ ...prev, Banner: bannerData }));
  };

  // WhyDoNeed handler
  const handleWhyDoNeedChange = (whyData) => {
    setFormData(prev => ({ ...prev, WhydoNeed: whyData }));
  };

  // WhyAtrix handler
  const handleWhyAtrixChange = (atrixData) => {
    setFormData(prev => ({ ...prev, WhyAtrix: atrixData }));
  };

  // Process handler
  const handleProcessChange = (processData) => {
    setFormData(prev => ({ ...prev, Process: processData }));
  };

  // MoreContent handler
  const handleMoreContentChange = (contentData) => {
    setFormData(prev => ({ ...prev, servicescontent: contentData }));
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
            <Label htmlFor={`description-${formData.id}`}>Description</Label>
            <TextArea
              type="text"
              id={`description-${formData.id}`}
              placeholder="Description"
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
            />
          </div>


          <div>
            <Label htmlFor={`Servicesquote-${formData.id}`}>Services quote</Label>
            <TextArea
              type="text"
              id={`Servicesquote-${formData.id}`}
              placeholder="Services quote"
              value={formData.Servicesquote}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, Servicesquote: value }))
              }
            />
          </div>
          <div>
            <TagsInput
              initialTags={formData.tags}
              onChange={handleTagsChange}
            />
          </div>

          <div>
            <Label htmlFor="input"> Select Field</Label>


            <Banner onChange={handleBannerChange} initialData={Services?.Banner} />
          </div>

          <div>
            <Label>Why do you need</Label>
            <WhydoNeed onChange={handleWhyDoNeedChange} initialData={Services?.WhydoNeed} />
          </div>

          <div>
            <Label>Why Atrix</Label>
            <WhyAtrix onChange={handleWhyAtrixChange} initialData={Services?.WhyAtrix} />
          </div>

          <div>
            <Process onChange={handleProcessChange} initialData={Services?.Process} />
          </div>

          <div>
            <MoreContent onChange={handleMoreContentChange} initialData={Services?.servicescontent} />
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
                      checked={formData.selectedCategories?.includes(category.Name) || false}
                      onChange={() => handleCategoryChange(category.Name)}
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