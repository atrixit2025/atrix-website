import React, { useState, useEffect, useRef } from "react";
import SelectBulk from "../../components/form/SelectBulk";
import SelectFileInput from "../form/form-elements/SelectFileInput";

export default function Banner({ onChange, initialData }) {
    const [selectFields, setSelectFields] = useState(() => [
        {
            id: 1,
            value: "",
            options: [
                { value: "", label: "Select Option" },
                { value: "Banner", label: "Banner" },
                { value: "video", label: "video" },
                { value: "sider-image", label: "sider-image" },
            ],
            imageFile: null,
            siderImages: []
        }
    ]);

    const prevBannerData = useRef();

    // Initialize with existing data
    useEffect(() => {
        if (initialData && Array.isArray(initialData)) {
            const mapped = initialData.map((item, index) => ({
                id: index + 1,
                value: item.type ? { value: item.type, label: item.type } : "",
                options: [
                    { value: "", label: "Select Option" },
                    { value: "Banner", label: "Banner" },
                    { value: "video", label: "video" },
                    { value: "sider-image", label: "sider-image" },
                ],
                imageFile: item.imageId ? { id: item.imageId } : null,
                siderImages: item.type === "sider-image" && item.imageId ? [{ id: item.imageId }] : []
            }));
            setSelectFields(mapped);
            prevBannerData.current = initialData;
        }
    }, [initialData]);

    // Send data to parent when fields change
    useEffect(() => {
        if (onChange) {
            const bannerData = selectFields.map(field => {
                if (field.value?.value === "sider-image") {
                    return {
                        type: "sider-image",
                        imageId: field.siderImages[0]?.id || null
                    };
                }
                return {
                    type: field.value?.value || "",
                    imageId: field.imageFile?.id || null
                };
            }).filter(item => item.type);
            
            // Only update if data changed
            if (JSON.stringify(bannerData) !== JSON.stringify(prevBannerData.current)) {
                onChange(bannerData);
                prevBannerData.current = bannerData;
            }
        }
    }, [selectFields, onChange]);

    const handleSelectChange = (id, value) => {
        setSelectFields(selectFields.map(field =>
            field.id === id ? { 
                ...field, 
                value,
                imageFile: null, // Reset image when type changes
                siderImages: []  // Reset sider images when type changes
            } : field
        ));
    };

    // const handleImageChange = (id, imageFile) => {
    //     setSelectFields(selectFields.map(field => {
    //         if (field.id !== id) return field;
            
    //         if (field.value?.value === "sider-image") {
    //             return {
    //                 ...field,
    //                 siderImages: imageFile ? [imageFile] : []
    //             };
    //         }
    //         return {
    //             ...field,
    //             imageFile
    //         };
    //     }));
    // };
    // In your Banner component
const handleImageChange = (id, imageFile) => {
    setSelectFields(selectFields.map(field => {
      if (field.id !== id) return field;
      
      return {
        ...field,
        imageFile: imageFile ? { id: imageFile.id } : null
      };
    }));
  };

    return (
        <div className="space-y-10">
            {selectFields.map((field, index) => (
                <div key={field.id} className="card mb-3 border-2 px-4 py-2 rounded-xl border-gray-700">
                    <div className="card-body">
                        <div className="form-group">
                            <SelectBulk
                                options={field.options}
                                value={field.value}
                                onChange={(value) => handleSelectChange(field.id, value)}
                                className="form-control"
                            />
                        </div>

                        {field.value?.value === "Banner" && (
                            <div className="form-group mt-3">
                                <SelectFileInput
                                    NameOffield="Add Banner Image"
                                    onImageUpload={(file) => handleImageChange(field.id, file)}
                                    existingImage={field.imageFile}
                                />
                            </div>
                        )}

                        {field.value?.value === "video" && (
                            <div className="form-group mt-3">
                                <SelectFileInput
                                    NameOffield="Add Video"
                                    accept="video/*"
                                    onImageUpload={(file) => handleImageChange(field.id, file)}
                                    existingImage={field.imageFile}
                                />
                            </div>
                        )}

                        {field.value?.value === "sider-image" && (
                            <div className="form-group mt-3">
                                <SelectFileInput
                                    NameOffield="Add Sider Image"
                                    onImageUpload={(file) => handleImageChange(field.id, file)}
                                    existingImage={field.siderImages[0]}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}