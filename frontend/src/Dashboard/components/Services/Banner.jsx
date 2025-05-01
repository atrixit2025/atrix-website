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
                            imageId: item.imageId || null,
                            existingImage: item.imageId ? {
                                id: item.imageId,
                                url: `/Image/${item.imageId}`
                            } : null
                        };
                    }
                });
                setSelectFields(initializedFields);
            } else {
                setSelectFields([{
                    id: 1,
                    type: "",
                    imageId: null,
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
                  imageId: null,
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
                  imageId: field.imageId
                };
              });
            onChange(formatted);
          }
        }, 300); // Debounce update
      
        return () => clearTimeout(timeout);
      }, [selectFields, onChange]);

      
      
    

    const handleImageUpload = (id, imageId) => {
        setSelectFields(prev =>
            prev.map(field =>
                field.id === id
                    ? { 
                        ...field, 
                        imageId,
                        existingImage: {
                            id: imageId,
                            url: `http://localhost:5300/Image/get/${imageId}`
                        }
                    }
                    : field
            )
        );
    };

    const handleSliderImageUpload = (id, imageId, index) => {
        setSelectFields(prev =>
            prev.map(field => {
                if (field.id === id) {
                    const newSliderImages = [...field.sliderImages];
                    newSliderImages[index] = imageId;
                    
                    const newExistingSliderImages = [...(field.existingSliderImages || [])];
                    newExistingSliderImages[index] = {
                        id: imageId,
                        url: `http://localhost:5300/Image/get/${imageId}`
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
                                    onImageUpload={(imageId) => handleImageUpload(field.id, imageId)}
                                    imageId={field.imageId}
                                    existingImage={field.existingImage}
                                />
                            </div>
                        )}

                        {field.type === "video" && (
                            <div className="mt-4">
                                <SelectFileInput
                                    NameOffield="Add Video"
                                    accept="video/*"
                                    onImageUpload={(imageId) => handleImageUpload(field.id, imageId)}
                                    imageId={field.imageId}
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
                                            onImageUpload={(imageId) => handleSliderImageUpload(field.id, imageId, index)}
                                            imageId={field.sliderImages[index]}
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