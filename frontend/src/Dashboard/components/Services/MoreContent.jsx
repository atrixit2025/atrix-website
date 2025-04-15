import React, { useEffect, useState } from "react";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import SelectBulk from "../../components/form/SelectBulk";
import SelectFileInput from "../form/form-elements/SelectFileInput";

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
      imageFile: null
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
const [galleryselectFields, setGallerySelectFields] = useState(() => {
  return Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    imageFile: null
  }));
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
        imageFile: item.imageFile || null
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
            galleryImages: galleryselectFields.map(f => ({
              imageFile: f.imageFile
            })).filter(img => img.imageFile) // filter out empty ones
          };
        }
        return null;
      }).filter(Boolean);
  
      onChange(mapped);
    }
  }, [selectFields, contentselectFields, galleryselectFields]);
  
  const getFilteredOptions = (currentType) => {
    const baseOptions = [
      { value: "", label: "Select Option" },
      { value: "content", label: "Content" },
      { value: "gallery", label: "Gallery" },
    ];
    
    // If no type selected yet, show all options
    if (!currentType) return baseOptions;
    
    // If content selected, show only gallery
    if (currentType === "content") {
      return [
        { value: "", label: "Select Option" },
        { value: "gallery", label: "Gallery" },
      ];
    }
    
    // If gallery selected, show only content
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
        options: getFilteredOptions(""), // Initial options for new field
        description: "",
        cardheading: "",
        imageFile: null
      }
    ]);
  };


 
  const galleryaddSelectField = () => {
    const newIdStart = galleryselectFields.length > 0 ? Math.max(...galleryselectFields.map(f => f.id)) + 1 : 1;
    const newFields = Array.from({ length: 4 }, (_, i) => ({
      id: newIdStart + i,
      imageFile: null
    }));
    setGallerySelectFields(prev => [...prev, ...newFields]);
  };
  const galleryremoveSelectField = () => {
    if (galleryselectFields.length > 4) {
      setGallerySelectFields(prev => prev.slice(0, -4));
    }
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
        // Update options for all fields to reflect current selections
        options: getFilteredOptions(value.value)
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

  const handleImageChange = (id, imageFile) => {
    setGallerySelectFields(galleryselectFields.map(field =>
      field.id === id ? { ...field, imageFile } : field
    ));
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

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       

                              <div>
                                  <Label htmlFor={`card-heading-${contentField.id}`}>Card Heading</Label>
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
                                      onChange={(value) => handleContentDescriptionChange(contentField.id,value)}
                                      placeholder="Enter your text content"
                                  />
                              </div>
                          </div>
                      </div>
                  ))
              )}

                {field.type === "gallery" && (
                  <div className="mb-4">
                           <div className="flex justify-end items-center gap-2 mb-4">
                      <div className="mt-4 flex justify-center">
                        <button
                          onClick={galleryremoveSelectField}
                          className="text-red-500 text-2xl cursor-pointer px-4 py-2 border border-red-500 rounded-lg hover:bg-red-100"
                        >
                          - 
                        </button>
                      </div>
                      <div className="mt-4 flex justify-center">
                        <button
                          onClick={galleryaddSelectField}
                          className="text-blue-500 text-2xl cursor-pointer px-4 py-2 border border-blue-500 rounded-lg hover:bg-blue-100"
                        >
                          + 
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {galleryselectFields.map((galleryField) => (
                        <div key={galleryField.id}>
                          <div className="relative border px-2 border-gray-700 h-52 w-full flex justify-center items-center text-center rounded-md">
                            <SelectFileInput
                              NameOffield="+"
                              onImageUpload={(file) => handleImageChange(galleryField.id, file)}
                              existingImage={galleryField.imageFile}
                            />
                          </div>


                        </div>
                      ))}
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