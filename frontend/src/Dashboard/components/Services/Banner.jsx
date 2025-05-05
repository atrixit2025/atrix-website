import React, { useState, useEffect, useRef } from "react";
import SelectBulk from "../../components/form/SelectBulk";
import SelectFileInput from "../form/form-elements/SelectFileInput";

export default function Banner({ onChange, initialData }) {
    const [selectFields, setSelectFields] = useState([]);

    const lastInitHash = useRef("");

    useEffect(() => {
        const currentHash = JSON.stringify(initialData); // You could optimize this with a real hash
        if (currentHash !== lastInitHash.current) {
            lastInitHash.current = currentHash;
    
            if (initialData && initialData.length > 0) {
                const initializedFields = initialData.map((item, index) => {
                    if (item.type === "slider") {
                        return {
                            id: index + 1,
                            type: item.type,
                            sliderImages: item.sliderImages || [],
                            existingSliderImages: (item.sliderImages || []).map(imgId => ({
                                id: imgId,
                                url: `/Image/${imgId}`
                            }))
                        };
                    } else {
                        return {
                            id: index + 1,
                            type: item.type,
                            imageUrl: item.imageUrl || null,
                            existingImage: item.imageUrl ? {
                                id: item.imageUrl,
                                url: `/Image/${item.imageUrl}`
                            } : null
                        };
                    }
                });
                setSelectFields(initializedFields);
            } else {
                setSelectFields([{
                    id: 1,
                    type: "",
                    imageUrl: null,
                    sliderImages: [],
                    existingImage: null,
                    existingSliderImages: []
                }]);
            }
        }
    }, [initialData]);
    

    const handleTypeChange = (id, selectedOption) => {
        setSelectFields(prev =>
          prev.map(field =>
            field.id === id
              ? {
                  ...field,
                  type: selectedOption.value,
                  imageUrl: null,
                  sliderImages: [],
                  existingImage: null,
                  existingSliderImages: []
                }
              : field
          )
        );
      };
      
      // ✅ Add this useEffect to handle updates safely
      useEffect(() => {
        const timeout = setTimeout(() => {
          if (onChange) {
            const formatted = selectFields
              .filter(field => field.type)
              .map(field => {
                if (field.type === "slider") {
                  return {
                    type: field.type,
                    sliderImages: field.sliderImages.filter(img => img)
                  };
                }
                return {
                  type: field.type,
                  imageUrl: field.imageUrl
                };
              });
            onChange(formatted);
          }
        }, 300); // Debounce update
      
        return () => clearTimeout(timeout);
      }, [selectFields, onChange]);

      
      
    

    const handleImageUpload = (id, imageUrl) => {
        setSelectFields(prev =>
            prev.map(field =>
                field.id === id
                    ? { 
                        ...field, 
                        imageUrl,
                        existingImage: {
                            id: imageUrl,
                            url: `http://localhost:5300/${imageUrl}`
                        }
                    }
                    : field
            )
        );
    };

    const handleSliderImageUpload = (id, imageUrl, index) => {
        setSelectFields(prev =>
            prev.map(field => {
                if (field.id === id) {
                    const newSliderImages = [...field.sliderImages];
                    newSliderImages[index] = imageUrl;
                    
                    const newExistingSliderImages = [...(field.existingSliderImages || [])];
                    newExistingSliderImages[index] = {
                        id: imageUrl,
                        url: `http://localhost:5300/${imageUrl}`
                    };

                    return { 
                        ...field, 
                        sliderImages: newSliderImages,
                        existingSliderImages: newExistingSliderImages
                    };
                }
                return field;
            })
        );
    };

    const options = [
        { value: "", label: "Select Option" },
        { value: "banner", label: "Banner" },
        { value: "video", label: "Video" },
        { value: "slider", label: "Image Slider" }
    ];

    return (
        <div className="space-y-4">
            {selectFields.map((field) => (
                <div key={field.id} className="border-2 border-gray-700 rounded-xl p-4">
                    <div className="">
                        <SelectBulk
                            options={options}
                            value={options.find(opt => opt.value === field.type) || ""}
                            onChange={(selected) => handleTypeChange(field.id, selected)}
                        />
                    </div>

                    <div className="">
                        {field.type === "banner" && (
                            <div className="mt-4">
                                <SelectFileInput
                                    NameOffield="Add Banner Image"
                                    onfilesUpload={(imageUrl) => handleImageUpload(field.id, imageUrl)}
                                    filesUrl={field.imageUrl}
                                    existingImage={field.existingImage}
                                />
                            </div>
                        )}

                        {field.type === "video" && (
                            <div className="mt-4">
                                <SelectFileInput
                                    NameOffield="Add Video"
                                    accept="video/*"
                                    onfilesUpload={(imageUrl) => handleImageUpload(field.id, imageUrl)}
                                    filesUrl={field.imageUrl}
                                    existingImage={field.existingImage}
                                />
                            </div>
                        )}

                        {field.type === "slider" && (
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {[0, 1, 2, 3].map((index) => (
                                    <div key={index} className="border border-gray-700 h-52 flex justify-center items-center">
                                        <SelectFileInput
                                            NameOffield={field.sliderImages[index] ? "Change" : "+"}
                                            onfilesUpload={(imageUrl) => handleSliderImageUpload(field.id, imageUrl, index)}
                                            filesUrl={field.sliderImages[index]}
                                            existingImage={field.existingSliderImages?.[index]}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}