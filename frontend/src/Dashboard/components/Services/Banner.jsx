// import React, { useState, useEffect } from "react";
// import SelectBulk from "../../components/form/SelectBulk";
// import SelectFileInput from "../form/form-elements/SelectFileInput";

// export default function Banner({ onChange, initialData }) {
//     const [selectFields, setSelectFields] = useState(() => [
//         {
//             id: 1,
//             type: "",
//             imageId: null,
//             sliderImages: []
//         }
//     ]);

//     useEffect(() => {
//         if (initialData && initialData.length > 0) {
//             setSelectFields(initialData.map((item, index) => ({
//                 id: index + 1,
//                 type: item.type || "",
//                 imageId: item.imageId || null,
//                 sliderImages: item.sliderImages || []
//             })));
//         }
//     }, [initialData]);


//     useEffect(() => {
//         if (onChange) {
//             const formattedData = selectFields
//                 .filter(field => {
//                     if (field.type === "slider") {
//                         return field.sliderImages.some(img => img);
//                     }
//                     return field.type && field.imageId;
//                 })
//                 .map(field => ({
//                     type: field.type,
//                     ...(field.type === "slider" ? {
//                         sliderImages: field.sliderImages
//                     } : {
//                         imageId: field.imageId
//                     })
//                 }));

//             onChange(formattedData);
//         }
//     }, [selectFields]);

//     const handleTypeChange = (id, selectedOption) => {
//         setSelectFields(prev =>
//             prev.map(field =>
//                 field.id === id
//                     ? {
//                         ...field,
//                         type: selectedOption.value,
//                         imageId: null,
//                         sliderImages: []
//                     }
//                     : field
//             )
//         );
//     };

//     const handleImageUpload = (id, imageId) => {
//         setSelectFields(prev =>
//             prev.map(field =>
//                 field.id === id
//                     ? { ...field, imageId }
//                     : field
//             )
//         );
//     };

//     const handleSliderImageUpload = (id, imageId, index) => {
//         setSelectFields(prev =>
//             prev.map(field => {
//                 if (field.id === id) {
//                     const newSliderImages = [...field.sliderImages];
//                     newSliderImages[index] = imageId;
//                     return { ...field, sliderImages: newSliderImages };
//                 }
//                 return field;
//             })
//         );
//     };

//     const options = [
//         { value: "", label: "Select Option" },
//         { value: "banner", label: "Banner" },
//         { value: "video", label: "Video" },
//         { value: "slider", label: "Image Slider" }
//     ];

//     return (
//         <div className="space-y-4">
//             {selectFields.map((field) => (
//                 <div key={field.id} className="border-2 border-gray-700 rounded-xl p-4">
//                     <div className="">
//                         <SelectBulk
//                             options={options}
//                             value={options.find(opt => opt.value === field.type) || ""}
//                             onChange={(selected) => handleTypeChange(field.id, selected)}
//                         />
//                     </div>

//                     <div className="">
//                         {field.type === "banner" && (
//                             <div className="mt-4">

//                                 <SelectFileInput
//                                     NameOffield="Add Banner Image"
//                                     onImageUpload={(imageId) => handleImageUpload(field.id, imageId)}
//                                     imageId={field.imageId}
//                                 />
//                             </div>

//                         )}

//                         {field.type === "video" && (
//                             <div className="mt-4">

//                                 <SelectFileInput
//                                     NameOffield="Add Video"
//                                     accept="video/*"
//                                     onImageUpload={(imageId) => handleImageUpload(field.id, imageId)}
//                                     imageId={field.imageId}
//                                 />
//                             </div>
//                         )}

//                         {field.type === "slider" && (


//                             <div className="grid grid-cols-2 gap-4 mt-4">
//                                 {[0, 1, 2, 3].map((index) => (
//                                     <div key={index} className="border border-gray-700 h-52 flex justify-center items-center">
//                                         <SelectFileInput
//                                             NameOffield={field.sliderImages[index] ? "Change" : "+"}
//                                             onImageUpload={(imageId) => handleSliderImageUpload(field.id, imageId, index)}
//                                             imageId={field.sliderImages[index]}
//                                         />
//                                     </div>

//                                 ))}

//                             </div>

//                         )}
//                     </div>

//                 </div>
//             ))}
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";
import SelectBulk from "../../components/form/SelectBulk";
import SelectFileInput from "../form/form-elements/SelectFileInput";

export default function Banner({ onChange, initialData }) {
    const [selectFields, setSelectFields] = useState(() => [
        {
            id: 1,
            type: "",
            imageId: null,
            sliderImages: [],
            existingImage: null
        }
    ]);

    useEffect(() => {
        if (initialData && initialData.length > 0) {
            setSelectFields(initialData.map((item, index) => {
                // Handle existing image data
                const existingImage = item.imageId ? {
                    id: item.imageId,
                    url: `http://localhost:5300/Image/get/${item.imageId}`
                } : null;

                // Handle slider images if they exist
                const sliderImages = item.sliderImages || [];
                const existingSliderImages = sliderImages.map(imgId => ({
                    id: imgId,
                    url: `http://localhost:5300/Image/get/${imgId}`
                }));

                return {
                    id: index + 1,
                    type: item.type || "",
                    imageId: item.imageId || null,
                    sliderImages: sliderImages,
                    existingImage: existingImage,
                    existingSliderImages: existingSliderImages
                };
            }));
        }
    }, [initialData]);

    useEffect(() => {
        if (onChange) {
            const formattedData = selectFields
                .filter(field => {
                    if (field.type === "slider") {
                        return field.sliderImages.some(img => img);
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
                        sliderImages: [],
                        existingImage: null,
                        existingSliderImages: []
                    }
                    : field
            )
        );
    };

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