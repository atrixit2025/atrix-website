// import React, { useEffect, useState } from "react";
// import Label from "../../components/form/Label";
// import Input from "../../components/form/input/InputField";
// import TextArea from "../../components/form/input/TextArea";
// import SelectFileInput from "../form/form-elements/SelectFileInput";

// export default function TextToImageAndImageToText({ onChange, initialData }) {
//     const [content, setContent] = useState({
//         leftText: "",
//         rightImage: null,
//         rightText: "",
//         leftImage: null
//     });

//     // Initialize with initialData
//     useEffect(() => {
//         if (initialData && initialData.length > 0) {
//             setContent({
//                 leftText: initialData.leftText || "",
//                 rightImage: initialData.rightImage || null,
//                 rightText: initialData.rightText || "",
//                 leftImage: initialData.leftImage || null
//             });
//         }
//     }, [initialData]);

//     // Notify parent of changes
//     useEffect(() => {
//         if (onChange) {
//             onChange(content);
//         }
//     }, [content,onChange]);

//     // Handler for text changes
//     const handleTextChange = (field, value) => {
//         setContent(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     // Handler for image changes
//     const handleImageChange = (field, imageFile) => {
//         setContent(prev => ({
//             ...prev,
//             [field]: imageFile
//         }));
//     };

//     return (
//         <div className="">
//             <div className="space-y-6 relative">
//                 <Label>Text to Image & Image to Text</Label>

//                 <div className="border-2 border-gray-700 rounded-xl px-4">
//                     <div className="space-y-6">
//                         <div className="mt-6">
//                             <Label htmlFor="left-text">Left Text</Label>
//                             <TextArea
//                                 id="left-text"
//                                 value={content.leftText}
//                                 onChange={(value) => handleTextChange("leftText", value)}
//                                 placeholder="Left Text"
//                             />
//                         </div>


//                         <div>
//                             <Label>Right Image</Label>
//                             <SelectFileInput
//                                 selected="Set the"
//                                 NameOffield="Image"
//                                 onImageUpload={(image) => handleImageChange("rightImage", image)}
//                                 existingImage={content.rightImage ? [content.rightImage] : []}
//                             />
//                         </div>

//                         <div>
//                             <Label>Left Image</Label>
//                             <SelectFileInput
//                                 selected="Set the"
//                                 NameOffield="Image"
//                                 onImageUpload={(image) => handleImageChange("leftImage", image)}
//                                 existingImage={content.leftImage ? [content.leftImage] : []}
//                             />
//                         </div>


//                         <div className="md:col-span-2">
//                             <Label htmlFor="right-text">Right Text</Label>
//                             <TextArea
//                                 id="right-text"
//                                 value={content.rightText}
//                                 onChange={(value) => handleTextChange("rightText", value)}
//                                 placeholder="Right Text"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect, useCallback } from "react";
import Label from "../../components/form/Label";
import TextArea from "../../components/form/input/TextArea";
import SelectFileInput from "../form/form-elements/SelectFileInput";

export default function TextToImageAndImageToText({ onChange, initialData }) {
    const normalizedInitialData = initialData ? {
        leftText: initialData.lefttext || "",
        rightImage: initialData.rightimageId || null,
        rightText: initialData.righttext || "",
        leftImage: initialData.leftimageId || null
    } : {
        leftText: "",
        rightImage: null,
        rightText: "",
        leftImage: null
    };

    const [content, setContent] = useState(normalizedInitialData);

    const handleTextChange = useCallback((field, value) => {
        setContent(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    const handleImageChange = useCallback((field, images) => {
        // console.log("Received images in handleImageChange:", images); // Debug log

        // Handle both array and single image cases
        let imageId = null;
        if (Array.isArray(images)) {
            imageId = images.length > 0 ? images[0]?.imageId || images[0] : null;
        } else if (typeof images === 'string') {
            imageId = images;
        } else if (images && images.imageId) {
            imageId = images.imageId;
        }

        // console.log("Extracted imageId:", imageId); // Debug log

        setContent(prev => ({
            ...prev,
            [field]: imageId
        }));
    }, []);
    // const handleImageChange = useCallback((field, images) => {
    //     if (!images || images.length === 0) {
    //         console.error("No images received");
    //         return;
    //     }
    //     const imageId = images[0].id;
    //     if (!imageId) {
    //         console.error("Invalid image ID received:", images);
    //         return;
    //     }
    //     setContent(prev => ({
    //         ...prev,
    //         [field]: imageId
    //     }));
    // }, []);
    // Notify parent of changes with the correct property names
    useEffect(() => {
        // console.log("Current content state:", content); // Log current state

        if (onChange) {
            const dataToSend = {
                lefttext: content.leftText,
                rightimageId: content.rightImage,
                righttext: content.rightText,
                leftimageId: content.leftImage
            };
            // console.log("Sending to parent:", dataToSend);/ // Log before sending
            onChange(dataToSend);
        }
    }, [content, onChange]);
    // console.log("Image changed:", field, images);
    // console.log("Sending to parent:", {
    //   lefttext: content.leftText,
    //   rightimageId: content.rightImage,
    //   righttext: content.rightText,
    //   leftimageId: content.leftImage
    // });

    return (
        <div className="space-y-6 relative">
            <Label>Text to Image & Image to Text</Label>
            <div className="border-2 border-gray-700 rounded-xl px-4 space-y-6">
                {/* Left Text */}
                <div className="mt-6">
                    <Label htmlFor="left-text">Left Text</Label>
                    <TextArea
                        id="left-text"
                        value={content.leftText}
                        onChange={(value) => handleTextChange("leftText", value)}
                        placeholder="Left Text"
                    />
                </div>

                {/* Right Image */}
                <div>
                    <Label>Right Image</Label>
                    <SelectFileInput
                        selected="Set the"
                        NameOffield="Image"
                        onImageUpload={(imageId) => {
                            handleImageChange('rightImage', { imageId });
                            ;
                        }}
                        existingImages={content.rightImage ? [{ id: content.rightImage }] : []}
                    />
                </div>

                {/* Left Image */}
                <div>
                    <Label>Left Image</Label>
                    <SelectFileInput
                        selected="Set the"
                        NameOffield="Image"
                        onImageUpload={(images) => handleImageChange("leftImage", images)}
                        existingImages={content.leftImage ? [{ id: content.leftImage }] : []}
                    />
                </div>

                {/* Right Text */}
                <div className="md:col-span-2">
                    <Label htmlFor="right-text">Right Text</Label>
                    <TextArea
                        id="right-text"
                        value={content.rightText}
                        onChange={(value) => handleTextChange("rightText", value)}
                        placeholder="Right Text"
                    />
                </div>
            </div>
        </div>
    );
}