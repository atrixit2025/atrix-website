import React, { useEffect, useState } from "react";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import SelectFileInput from "../form/form-elements/SelectFileInput";

export default function HeaderContent({ onChange, initialData }) {
    // const [centerContent, setCenterContent] = useState({
    //     centerHeading: initialData?.centerContent?.centerHeading || "",
    //     centerDescription: initialData?.centerContent?.centerDescription || ""
    // });
    const [centerContent, setCenterContent] = useState(() => ({
        centerHeading: initialData?.[0]?.centerHeading || "",
        centerDescription: initialData?.[0]?.centerDescription || ""
    }));
    
    // const [selectFields, setSelectFields] = useState(
    //     initialData?.selectFields?.length
    //         ? initialData.selectFields.map((item, index) => ({
    //             id: index + 1,
    //             heading: item.heading || "",
    //             description: item.description || "",
    //             imageId: item.imageId || null
    //         }))
    //         : [{
    //             id: 1,
    //             heading: "",
    //             description: "",
    //             imageId: null
    //         }]
    // );
    const [selectFields, setSelectFields] = useState(() => {
        if (initialData?.[0]?.headingAnddescription?.length > 0) {
            return initialData[0].headingAnddescription.map((item, index) => ({
                id: index + 1,
                heading: item.heading || "",
                description: item.description || "",
                imageId: item.imageId || null,
                existingImage: item.imageId ? {
                    id: item.imageId,
                    url: `http://localhost:5300/Image/get/${item.imageId}`
                } : null
            }));
        }
        return [{
            id: 1,
            heading: "",
            description: "",
            imageId: null,
            existingImage: null
        }];
    });


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
                imageId: null
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
        // console.log("selectedImages", selectedImages);
        // console.log("id", id);
    
        // Handle case where we get just an imageId string
        if (typeof selectedImages === 'string') {
            setSelectFields(prevFields =>
                prevFields.map(field =>
                    field.id === id ? {
                        ...field,
                        imageId: selectedImages // Use the string directly as imageId
                    } : field
                )
            );
            return;
        }
    
        // Handle case where selectedImages is not an array
        if (!Array.isArray(selectedImages)) {
            console.error("selectedImages is not an array:", selectedImages);
            return;
        }
    
        if (selectedImages.length === 0) {
            setSelectFields(prevFields =>
                prevFields.map(field =>
                    field.id === id ? {
                        ...field,
                        imageId: null
                    } : field
                )
            );
            return;
        }
    
        // Get first image and validate it
        const image = selectedImages[0];
        if (typeof image !== 'object' || image === null) {
            console.error("Invalid image data structure:", image);
            return;
        }
    
        // Handle both object format and direct ID
        const imageId = image.imageId || image;
        if (!imageId) {
            console.error("No imageId found in:", image);
            return;
        }
    
        setSelectFields(prevFields =>
            prevFields.map(field =>
                field.id === id ? {
                    ...field,
                    imageId
                } : field
            )
        );
    };


    useEffect(() => {
        if (onChange) {
            onChange([{
                centerHeading: centerContent.centerHeading,
                centerDescription: centerContent.centerDescription,
                headingAnddescription: selectFields
                    .filter(item => item.heading.trim() !== "" ||
                        item.description.trim() !== "" ||
                        item.imageId
                    )
                    .map(item => ({
                        heading: item.heading,
                        description: item.description,
                        imageId: item.imageFile?.imageId || item.imageId || null
                    }))
                    
            }]);
        }
    }, [centerContent, selectFields]);



    // console.log("Updated SelectFields:", selectFields);
    // useEffect(() => {
    //     console.log("Updated fields after image select:", selectFields);
    // }, [selectFields]);
    

    // console.log("Sending to parent:", {
    //     centerHeading: centerContent.centerHeading,
    //     centerDescription: centerContent.centerDescription,
    //     headingAnddescription: selectFields.map(item => ({
    //         heading: item.heading,
    //         description: item.description,
    //         imageId: item.imageId
    //     }))
    // });



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
                                        onImageUpload={(selectedImages) => handleImageChange(field.id, selectedImages)}
                                        imageId={field.imageId} // Pass imageId directly
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