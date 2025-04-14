import React, { useState, useEffect, useContext } from "react";
import SelectBulk from "../../components/form/SelectBulk";
import SelectFileInput from "../form/form-elements/SelectFileInput";

export default function Banner({ onChange, initialData }) {
    const [selectFields, setSelectFields] = useState(() => [
        {
            id: 1,
            value: "",
            options: [
                { value: "", label: "Select Option" },
                { value: "banner", label: "Banner" },
                { value: "video", label: "video" },
                { value: "sider-image", label: "sider-image" },
            ],
            textValue: "",
            imageFile: null, // For Banner/video
            siderImages: []  // For multiple images in 'sider-image'
        }
    ]);

    useEffect(() => {
        if (initialData && Array.isArray(initialData)) {
            const mapped = initialData.map((item, index) => ({
                id: index + 1,
                type: item.type ? { value: item.value, label: item.value } : "",
                options: [
                    { value: "", label: "Select Option" },
                    { value: "banner", label: "Banner" },
                    { value: "video", label: "video" },
                    { value: "sider-image", label: "sider-image" },
                ],
                textValue: item.textValue || "",
                imageFile: item.imageFile || null,
                siderImages: item.siderImages || [],
            }));

            setSelectFields(mapped);
        }
    }, [initialData]);

    useEffect(() => {
        if (onChange) {
            const mapped = selectFields.map(field => ({
                type: field.type || "",
                // textValue: field.textValue || "",
                imageFile: field.imageFile || null,
                siderImages: field.siderImages || []
            }));
            onChange(mapped);
        }
    }, [selectFields]);

    const handleSelectChange = (id, value) => {
        // console.log(`Field ${id} changed to:`, value);
        setSelectFields(selectFields.map(field =>
            field.id === id ? { ...field, value } : field
        ));
    };

    const handleTypeChange = (id, selectedOption) => {
        setSelectFields(prevFields =>
            prevFields.map(field =>
                field.id === id
                    ? { ...field, type: selectedOption.value, imageId: null }
                    : field
            )
        );
    };
    const handleImageUpload = (id, imageId) => {
        setSelectFields(prevFields => 
            prevFields.map(field => 
                field.id === id 
                    ? { ...field, imageId }
                    : field
            )
        );
    };
    const handleImageChange = (id, imageFile) => {
        setSelectFields(selectFields.map(field =>
            field.id === id ? { ...field, imageFile } : field
        ));
    };

    // console.log("Initial selectFields:", selectFields);
    const handleSiderImageChange = (id, files) => {
        setSelectFields(selectFields.map(field => {
            if (field.id === id) {
                // Merge new images, max 4
                const newFiles = [...field.siderImages, ...Array.from(files)].slice(0, 4);
                return { ...field, siderImages: newFiles };
            }
            return field;
        }));
    };

    const handleRemoveSiderImage = (id, index) => {
        setSelectFields(selectFields.map(field => {
            if (field.id === id) {
                const updatedImages = field.siderImages.filter((_, i) => i !== index);
                return { ...field, siderImages: updatedImages };
            }
            return field;
        }));
    };

    return (
        <div>

            <div className="">
                <div className="space-y-10">
                    {selectFields.map((field, index) => (
                        <div key={field.id} className="card mb-3 border-2 px-4 py-2 rounded-xl border-gray-700">
                            <div className="card-header ">

                            </div>
                            <div className="card-body">
                                <div className="form-group mb-4">
                                    <SelectBulk
                                        options={field.options}
                                        value={field.options.find(opt => opt.value === field.type) || ""}
                                        onChange={(selected) => handleTypeChange(field.id, selected)}
                                    />
                                </div>

                                {(field.type === "banner" || field.type === "video") && (
                                    <SelectFileInput
                                        selected="No image selected"

                                        NameOffield={`Add ${field.type === "banner" ? "Image" : "Video"}`}
                                        onImageUpload={(imageId) => handleImageUpload(field.id, imageId)}
                                        imageId={field.imageId}
                                    />
                                )}
                                {field.type === "sider-image" && (
                                    <div className="grid grid-cols-2 gap-4">
                                        {[1, 2, 3, 4].map((item) => (
                                            <div key={item} className="border border-gray-700 h-52 flex justify-center items-center">
                                                <SelectFileInput
                                                    NameOffield="+"
                                                    onImageUpload={(imageId) => handleImageUpload(field.id, imageId)}
                                                    imageId={field.imageId}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {/* {field.value?.value === "Banner" && (
                                    <div className="form-group mt-3">
                                        <SelectFileInput
                                          selected= "No image selected"
                                            NameOffield="Add Image"

                                            onImageUpload={(file) => handleImageChange(field.id, file)}
                                            existingImage={field.imageFile}
                                        />
                                    </div>
                                )}

                                {field.value?.value === "video" && (
                                    <div className="form-group mt-3">
                                        <SelectFileInput
                                          selected= "No image selected"
                                            NameOffield="Add Video"
                                            accept="video/*"
                                            onImageUpload={(file) => handleImageChange(field.id, file)}
                                            existingImage={field.imageFile}
                                        />
                                    </div>
                                )} */}

                                {/* {field.value?.value === "sider-image" && (
                                    <div className="form-group">

                                       
                                        <div className="flex flex-wrap 
                                        
                                        gap-2 mt-4">
                                            <div className="border px-2 border-gray-700 h-52 w-52 flex justify-center items-center text-center">
                                                <SelectFileInput
                                                    NameOffield="+"
                                                  

                                                    onImageUpload={(file) => handleImageChange(field.id, file)}
                                                    existingImage={field.imageFile}
                                                />
                                            </div>
                                            <div className="border px-2 border-gray-700 h-52 w-52 flex justify-center items-center text-center">
                                                <SelectFileInput
                                                    NameOffield="+"


                                                    onImageUpload={(file) => handleImageChange(field.id, file)}
                                                    existingImage={field.imageFile}
                                                />
                                            </div>
                                            <div className="border px-2 border-gray-700 h-52 w-52 flex justify-center items-center text-center">
                                                <SelectFileInput
                                                    NameOffield="+"


                                                    onImageUpload={(file) => handleImageChange(field.id, file)}
                                                    existingImage={field.imageFile}
                                                />
                                            </div>
                                            <div className="border px-2 border-gray-700 h-52 w-52 flex justify-center items-center text-center">
                                                <SelectFileInput
                                                    NameOffield="+"


                                                    onImageUpload={(file) => handleImageChange(field.id, file)}
                                                    existingImage={field.imageFile}
                                                />
                                            </div> */}
                                {/* {field.siderImages?.map((image, i) => (
                                                <div key={i} className="relative">
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={`sider ${i}`}
                                                        className="rounded-md border border-gray-300 h-32 w-full object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded-bl"
                                                        onClick={() => handleRemoveSiderImage(field.id, i)}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))} */}
                                {/* </div>
                                    </div>
                                )} */}


                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}