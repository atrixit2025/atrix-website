import React, { useEffect, useState } from "react";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import SelectFileInput from "../form/form-elements/SelectFileInput";

export default function HeaderContent({ onChange, initialData }) {
    const [centerContent, setCenterContent] = useState({
        centerHeading: initialData?.centerContent?.centerHeading || "",
        centerDescription: initialData?.centerContent?.centerDescription || ""
    });

    const [selectFields, setSelectFields] = useState(
        initialData?.selectFields?.length
            ? initialData.selectFields.map((item, index) => ({
                id: index + 1,
                heading: item.heading || "",
                description: item.description || "",
                imageFile: item.imageFile || null
            }))
            : [{
                id: 1,
                heading: "",
                description: "",
                imageFile: null
            }]
    );




    // Notify parent of changes
    // useEffect(() => {
    //     if (onChange) {
    //         onChange({
    //             centerContent,
    //             selectFields: selectFields.filter(item =>
    //                 item.heading.trim() !== "" || item.description.trim() !== "" || item.imageFile
    //             )
    //         });
    //     }
    // }, [centerContent, selectFields]);
    useEffect(() => {
        if (onChange) {
            onChange([{
                centerHeading: centerContent.centerHeading,
                centerDescription: centerContent.centerDescription,
                headingAnddescription: selectFields.filter(item =>
                    item.heading.trim() !== "" || item.description.trim() !== "" || item.imageFile
                ).map(item => ({
                    heading: item.heading,
                    description: item.description,
                    imageId: item.imageFile?.imageId || null // This is important
                }))
            }]);
        }
    }, [centerContent, selectFields]);
    

    // Center content handlers
    const handleCenterHeadingChange = (e) => {
        setCenterContent(prev => ({
            ...prev,
            centerHeading: e.target.value
        }));
    };

    const handleCenterDescriptionChange = (value) => {
        setCenterContent(prev => ({
            ...prev,
            centerDescription: value
        }));
    };

    // Card content handlers (keep your existing functions)
    const addSelectField = () => {
        const newId = selectFields.length > 0 ? Math.max(...selectFields.map(f => f.id)) + 1 : 1;
        setSelectFields([
            ...selectFields,
            {
                id: newId,
                heading: "",
                description: "",
                imageFile: null
            }
        ]);
    };

    const removeSelectField = (id) => {
        if (selectFields.length > 1) {
            setSelectFields(selectFields.filter(field => field.id !== id));
        }
    };

    const handleTextChange = (id, description) => {
        setSelectFields(selectFields.map(field =>
            field.id === id ? { ...field, description } : field
        ));
    };

    const handleHeadingChange = (id, value) => {
        setSelectFields(selectFields.map(field =>
            field.id === id ? { ...field, heading: value } : field
        ));
    };
    const handleImageChange = (id, selectedImages) => {
        if (!Array.isArray(selectedImages) || selectedImages.length === 0) {
            // User may have removed the image, so reset the field
            setSelectFields(prevFields =>
                prevFields.map(field =>
                    field.id === id ? { ...field, imageFile: null } : field
                )
            );
            return;
        }
    
        const image = selectedImages[0];
        setSelectFields(prevFields =>
            prevFields.map(field =>
                field.id === id ? { ...field, imageFile: image } : field
            )
        );
    };
    
    



    return (
        <div className="">
            <div className="space-y-6 relative">
                <Label>Header Content</Label>

                <div className="border-2 border-gray-700 rounded-xl px-4">
                    {/* Center Content Section */}
                    <div className="space-y-6">
                        <div className="mt-6">
                            <Label htmlFor="center-heading">Center Heading</Label>
                            <Input
                                type="text"
                                id="center-heading"
                                placeholder="Center Heading"
                                value={centerContent.centerHeading}
                                onChange={handleCenterHeadingChange}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Label htmlFor="center-description">Center Description</Label>
                            <TextArea
                                id="center-description"
                                value={centerContent.centerDescription}
                                onChange={handleCenterDescriptionChange}
                                placeholder="Center Description"
                            />
                        </div>
                    </div>

                    {/* Card Content Sections */}
                    {selectFields.map((field, index) => (
                        <div key={field.id} className="">
                            <div className="space-y-6 bg-zinc-800 rounded-xl p-4 my-4">
                                <div className="">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor={`heading-${field.id}`}>Heading</Label>
                                        <div className="flex items-center mb-4">
                                            <div className="flex gap-2">
                                                {index > 0 && (
                                                    <button
                                                        onClick={() => removeSelectField(field.id)}
                                                        className="text-red-500 bg-white font-bold w-8 rounded-lg text-2xl cursor-pointer"
                                                    >
                                                        -
                                                    </button>
                                                )}
                                                {index === selectFields.length - 1 && (
                                                    <button
                                                        onClick={addSelectField}
                                                        className="bg-white text-black font-bold w-8 rounded-lg text-2xl cursor-pointer"
                                                    >
                                                        +
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <Input
                                        type="text"
                                        id={`heading-${field.id}`}
                                        placeholder="Heading"
                                        value={field.heading}
                                        onChange={(e) => handleHeadingChange(field.id, e.target.value)}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor={`description-${field.id}`}>Description</Label>
                                    <TextArea
                                        id={`description-${field.id}`}
                                        value={field.description}
                                        onChange={(value) => handleTextChange(field.id, value)}
                                        placeholder="Enter your text content"
                                    />
                                </div>


                                <div>
                                    <Label>Image</Label>
                                    <SelectFileInput
                                        selected="Set the"
                                        NameOffield="Image"
                                        onImageUpload={(selectedImages) =>
                                            handleImageChange(field.id, selectedImages)
                                        }
                                        imageId={field.imageFile?.id}
                                        existingImages={field.imageFile ? [field.imageFile] : []}
                                    />

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}