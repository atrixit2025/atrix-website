import React, { useState, useEffect } from "react";
import SelectBulk from "../../components/form/SelectBulk";
import SelectFileInput from "../form/form-elements/SelectFileInput";

export default function Banner({ onChange, initialData }) {
    const [selectFields, setSelectFields] = useState(() => [
        {
            id: 1,
            type: "", // "banner", "video", or "slider"
            imageId: null, // For banner/video
            sliderImages: [] // For slider type
        }
    ]);

    // Initialize with data
    useEffect(() => {
        if (initialData && initialData.length > 0) {
            setSelectFields(initialData.map((item, index) => ({
                id: index + 1,
                type: item.type || "",
                imageId: item.imageId || null,
                sliderImages: item.sliderImages || []
            })));
        }
    }, [initialData]);

    // Send formatted data to parent
    useEffect(() => {
        if (onChange) {
           // In Banner component's useEffect
const formattedData = selectFields
.filter(field => {
  if (field.type === "slider") {
    return field.sliderImages.some(img => img); // At least one image
  }
  return field.type && field.imageId;
})
.map(field => ({
  type: field.type,
  ...(field.type === "slider" ? { 
    sliderImages: field.sliderImages 
  } : { 
    imageId: field.imageId 
  })
}));
            
            onChange(formattedData);
        }
    }, [selectFields]);

    const handleTypeChange = (id, selectedOption) => {
        setSelectFields(prev => 
            prev.map(field => 
                field.id === id 
                    ? { 
                        ...field, 
                        type: selectedOption.value,
                        imageId: null,
                        sliderImages: [] 
                    } 
                    : field
            )
        );
    };

    const handleImageUpload = (id, imageId) => {
        setSelectFields(prev => 
            prev.map(field => 
                field.id === id 
                    ? { ...field, imageId } 
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
                    return { ...field, sliderImages: newSliderImages };
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
                    <div className="mb-4">
                        <SelectBulk
                            options={options}
                            value={options.find(opt => opt.value === field.type) || ""}
                            onChange={(selected) => handleTypeChange(field.id, selected)}
                        />
                    </div>

                    {field.type === "banner" && (
                        <SelectFileInput
                            NameOffield="Add Banner Image"
                            onImageUpload={(imageId) => handleImageUpload(field.id, imageId)}
                            imageId={field.imageId}
                        />
                    )}

                    {field.type === "video" && (
                        <SelectFileInput
                            NameOffield="Add Video"
                            accept="video/*"
                            onImageUpload={(imageId) => handleImageUpload(field.id, imageId)}
                            imageId={field.imageId}
                        />
                    )}

                    {field.type === "slider" && (
                        <div className="grid grid-cols-2 gap-4">
                            {[0, 1, 2, 3].map((index) => (
                                <div key={index} className="border border-gray-700 h-52 flex justify-center items-center">
                                    <SelectFileInput
                                        NameOffield={field.sliderImages[index] ? "Change" : "+"}
                                        onImageUpload={(imageId) => handleSliderImageUpload(field.id, imageId, index)}
                                        imageId={field.sliderImages[index]}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}