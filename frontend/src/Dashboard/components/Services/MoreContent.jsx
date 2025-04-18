import React, { useEffect, useState } from "react";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import SelectBulk from "../../components/form/SelectBulk";
import GalleryComp from "../Gallery/GalleryComp";

export default function MoreContent({ onChange, initialData }) {
  const [selectFields, setSelectFields] = useState([
    {
      id: 1,
      type: "",
      options: [
        { value: "", label: "Select Option" },
        { value: "content", label: "Content" },
        { value: "gallery", label: "Gallery" },
      ],
      description: "",
      cardheading: "",
      galleryImages: [] // Changed from imageFile to galleryImages array
    }
  ]);

  const [contentselectFields, setContentSelectFields] = useState(() => {
    return [
      {
        id: 1,
        value: "",
        description: "",
        cardheading: ""
      }
    ];
  });

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      const mappedFields = initialData.map((item, index) => ({
        id: index + 1,
        type: item.type,
        options: [
          { value: "", label: "Select Option" },
          { value: "content", label: "Content" },
          { value: "gallery", label: "Gallery" }
        ],
        description: item.description || "",
        cardheading: item.cardheading || "",
        galleryImages: item.galleryImages || [] // Initialize with empty array
      }));
      setSelectFields(mappedFields);
    }
  }, [initialData]);

  useEffect(() => {
    if (onChange) {
      const mapped = selectFields.map(field => {
        if (field.type === "content") {
          return {
            type: "content",
            contents: contentselectFields.map(f => ({
              cardheading: f.cardheading,
              description: f.description
            }))
          };
        } else if (field.type === "gallery") {
          return {
            type: "gallery",
            galleryImages: field.galleryImages.filter(img => img) // Filter out any null values
          };
        }
        return null;
      }).filter(Boolean);
  
      onChange(mapped);
    }
  }, [selectFields, contentselectFields]);

  const getFilteredOptions = (currentType) => {
    const baseOptions = [
      { value: "", label: "Select Option" },
      { value: "content", label: "Content" },
      { value: "gallery", label: "Gallery" },
    ];
    
    if (!currentType) return baseOptions;
    
    if (currentType === "content") {
      return [
        { value: "", label: "Select Option" },
        { value: "gallery", label: "Gallery" },
      ];
    }
    
    return [
      { value: "", label: "Select Option" },
      { value: "content", label: "Content" },
    ];
  };

  const addSelectField = () => {
    const newId = selectFields.length > 0 ? Math.max(...selectFields.map(f => f.id)) + 1 : 1;
    setSelectFields([
      ...selectFields,
      {
        id: newId,
        type: "",
        options: getFilteredOptions(""), 
        description: "",
        cardheading: "",
        galleryImages: []
      }
    ]);
  };

  const contentaddSelectField = () => {
    const newId = contentselectFields.length > 0 ? Math.max(...contentselectFields.map(f => f.id)) + 1 : 1;
    setContentSelectFields([
      ...contentselectFields,
      {
        id: newId,
        value: "",
        description: "",
        cardheading: ""
      }
    ]);
  };

  const contentremoveSelectField = (id) => {
    if (contentselectFields.length > 1) {
      setContentSelectFields(contentselectFields.filter(field => field.id !== id));
    }
  };

  const handleSelectChange = (id, value) => {
    setSelectFields(selectFields.map(field => {
      if (field.id === id) {
        return { 
          ...field, 
          type: value.value,
          options: getFilteredOptions(value.value),
          galleryImages: value.value === "gallery" ? [] : field.galleryImages
        };
      }
      return field;
    }));
  };

  const handleContentDescriptionChange = (id, value) => {
    setContentSelectFields(contentselectFields.map(field =>
      field.id === id ? { ...field, description: value } : field
    ));
  };

  const handlecardheadingChange = (id, value) => {
    setContentSelectFields(contentselectFields.map(field =>
      field.id === id ? { ...field, cardheading: value } : field
    ));
  };

  // Handle adding images to gallery
  const handleAddImage = (id, file) => {
    setSelectFields(selectFields.map(field => {
      if (field.id === id && field.type === "gallery") {
        return {
          ...field,
          galleryImages: [...field.galleryImages, file]
        };
      }
      return field;
    }));
  };

  // Handle removing images from gallery
  const handleRemoveImage = (id, imageIndex) => {
    setSelectFields(selectFields.map(field => {
      if (field.id === id && field.type === "gallery") {
        return {
          ...field,
          galleryImages: field.galleryImages.filter((_, index) => index !== imageIndex)
        };
      }
      return field;
    }));
  };

  const removeSelectField = (id) => {
    if (selectFields.length > 1) {
      setSelectFields(selectFields.filter(field => field.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10"></div>
      <div className="">
        <Label>Services Content</Label>
        <div className="space-y-10">
          {selectFields.map((field, index) => (
            <div key={field.id} className="card mb-3 border-2 px-4 py-2 rounded-xl border-gray-700">
              <div className="card-header">
                <h4 className="card-title flex justify-between items-center mb-2">
                  Select Field
                  <div className="flex items-center gap-5">
                    {index > 0 && (
                      <button onClick={() => removeSelectField(field.id)} className="text-red-500 text-3xl mt-3">
                        -
                      </button>
                    )}
                    {index === selectFields.length - 1 && (
                      <button onClick={addSelectField} className="flex items-center gap-2 text-blue-500 mt-4">
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
                    value={field.options.find(opt => opt.value === field.type) || field.options[0]}
                    onChange={(value) => handleSelectChange(field.id, value)}
                    className="form-control"
                  />
                </div>

                {field.type === "content" && (
                  contentselectFields.map((contentField, index) => (
                    <div key={contentField.id} className="mb-3">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-medium">
                          Field {index + 1}
                        </h4>
                        <div className="flex gap-2">
                          {index > 0 && (
                            <button
                              onClick={() => contentremoveSelectField(contentField.id)}
                              className="text-red-500 text-2xl cursor-pointer"
                            >
                              -
                            </button>
                          )}
                          {index === contentselectFields.length - 1 && (
                            <button
                              onClick={contentaddSelectField}
                              className="text-blue-500 text-2xl cursor-pointer"
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-6">
                        <div>
                          <Label htmlFor={`card-heading-${contentField.id}`}>Heading</Label>
                          <Input
                            type="text"
                            id={`card-heading-${contentField.id}`}
                            placeholder="Card Heading"
                            value={contentField.cardheading}
                            onChange={(e) => handlecardheadingChange(contentField.id, e.target.value)}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label htmlFor={`description-${contentField.id}`}>Description</Label>
                          <TextArea
                            id={`description-${contentField.id}`}
                            value={contentField.description}
                            onChange={(value) => handleContentDescriptionChange(contentField.id, value)}
                            placeholder="Enter your text content"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {field.type === "gallery" && (
                  <div className="mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">

                    <div className="relative  w-full  rounded-md">
                        <GalleryComp
                        selected="Set the image"
                          NameOffield="+ Add Image"
                          onImageUpload={(file) => handleAddImage(field.id, file)}
                          existingImage={null}
                        />
                      </div>
                      {/* Existing images */}
                      {field.galleryImages.map((image, imgIndex) => (
                        <div key={imgIndex} className="relative w-full rounded-md">

                          
                          <GalleryComp
                            NameOffield="More ADD"
                            onImageUpload={(file) => {
                              // Replace the existing image
                              setSelectFields(selectFields.map(f => {
                                if (f.id === field.id) {
                                  const newImages = [...f.galleryImages];
                                  newImages[imgIndex] = file;
                                  return { ...f, galleryImages: newImages };
                                }
                                return f;
                              }));
                            }}
                            existingImage={image}
                          />
                          {/* <button
                            onClick={() => handleRemoveImage(field.id, imgIndex)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            ×
                          </button> */}
                        </div>
                      ))}
                      
                      {/* Add new image button */}
                      
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}