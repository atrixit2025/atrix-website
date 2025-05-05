
import React, { useEffect, useState } from 'react'
import SelectBulk from '../form/SelectBulk';
import JoditEditorComp from '../JoditEditorComp/JoditEditorComp';
import SelectFileInput from '../form/form-elements/SelectFileInput';
import Label from '../form/Label';

const TextToImageAndImageToText = ({ onChange, initialData }) => {
    const [selectFields, setSelectFields] = useState([]);

    // Initialize state properly
    useEffect(() => {
        if (initialData && initialData.length > 0) {
            const processedData = initialData.map(item => ({
                id: item.id,
                value: {
                    value: item.type || item.value?.value || "",
                    label: item.type === "texttoimage" ? "TexttoImage" : 
                           item.type === "imagetotext" ? "ImagetoText" : ""
                },
                textContent: item.text || item.textContent || "",
                imageFile: item.imageUrl ? {
                    id: item.imageUrl,
                    url: item.imageUrl || (item.imageUrl ? `http://localhost:5300/Image/get/${item.imageUrl}` : null),
                    type: item.type || item.value?.value,
                    name: "Uploaded image"
                } : (item.imageFile || null),
                options: [
                    { value: "", label: "Select Option" },
                    { value: "texttoimage", label: "TexttoImage" },
                    { value: "imagetotext", label: "ImagetoText" },
                ]
            }));
            setSelectFields(processedData);
        } else {
            setSelectFields([{
                id: 1,
                value: "",
                options: [
                    { value: "", label: "Select Option" },
                    { value: "texttoimage", label: "TexttoImage" },
                    { value: "imagetotext", label: "ImagetoText" },
                ],
                textContent: "",
                imageFile: null
            }]);
        }
    }, [initialData]);

    // Unified state update function
    const updateState = (newFields) => {
        setSelectFields(newFields);
        if (onChange) {
            onChange(newFields);
        }
    };

    const handleImageChange = (id, imageUrl, fieldType) => {
        const updatedFields = selectFields.map(field => {
            if (field.id === id) {
                return {
                    ...field,
                    imageFile: imageUrl ? {
                        id: imageUrl,
                        url: `http://localhost:5300/Image/get/${imageUrl}`,
                        type: fieldType,
                        name: "Uploaded image"
                    } : null
                };
            }
            return field;
        });
        updateState(updatedFields);
    };

    const addSelectField = () => {
        const newId = selectFields.length > 0 ? Math.max(...selectFields.map(f => f.id)) + 1 : 1;
        const newFields = [
            ...selectFields,
            {
                id: newId,
                value: "",
                options: [
                    { value: "", label: "Select Option" },
                    { value: "texttoimage", label: "TexttoImage" },
                    { value: "imagetotext", label: "ImagetoText" },
                ],
                textContent: "",
                imageFile: null
            }
        ];
        updateState(newFields);
    };

    const handleSelectChange = (id, value) => {
        const updatedFields = selectFields.map(field =>
            field.id === id ? { ...field, value } : field
        );
        updateState(updatedFields);
    };

    const removeSelectField = (id) => {
        if (selectFields.length > 1) {
            const updatedFields = selectFields.filter(field => field.id !== id);
            updateState(updatedFields);
        }
    };

    const handleTextChange = (id, newContent) => {
        const updatedFields = selectFields.map(field =>
            field.id === id ? { ...field, textContent: newContent } : field
        );
        updateState(updatedFields);
    };
    return (
        <>
            <Label>Select Field</Label>
            <div className='border-2 px-4 py-2 rounded-xl border-gray-700 '>

                {selectFields.map((field, index) => (
                    <div key={field.id || index} className="card">


                        <div className="card-body  bg-zinc-800 rounded-xl p-4 my-4">
                            <div className="form-group   flex justify-between items-center gap-5 mb-2">
                                <div className='rounded-lg border border-gray-300 w-full '>
                                    <SelectBulk
                                        options={field.options}
                                        value={field.value}
                                        onChange={(value) => handleSelectChange(field.id, value)}
                                        className="form-control "
                                    />
                                </div>
                                <div className="flex items-center gap-5">
                                    {index > 0 && (
                                        <button
                                            onClick={() => removeSelectField(field.id)}
                                            className="text-red-500 bg-(--white)  font-bold w-8 rounded-lg  text-2xl cursor-pointer"
                                        >
                                            -
                                        </button>
                                    )}
                                    {index === selectFields.length - 1 && (
                                        <button
                                            onClick={addSelectField}
                                            className="bg-(--white) text-(--black) font-bold w-8 rounded-lg  text-2xl cursor-pointer"
                                        >
                                            +
                                        </button>
                                    )}
                                </div>
                            </div>


                            {field.value?.value === "texttoimage" && (
                                <div className="form-group  space-y-6">

                                    <Label >Text</Label>
                                    <JoditEditorComp
                                        value={field.textContent || ""}
                                        onChange={(newContent) => handleTextChange(field.id, newContent)}

                                    />
                                    <Label>Image</Label>
                                    <SelectFileInput
                                        selected="Set the image"
                                        NameOffield="Image"
                                        onfilesUpload={(imageUrl, imageType) =>
                                            handleImageChange(field.id, imageUrl, imageType || field.value?.value)
                                        }
                                        filesUrl={field.imageFile?.id}
                                        existingImage={field.imageFile ? {
                                            id: field.imageFile.id,
                                            url: field.imageFile.url,
                                            name: field.imageFile.name || "Uploaded image"
                                        } : null}
                                    />
                                </div>
                            )}

                            {field.value?.value === "imagetotext" && (
                                <div className="form-group space-y-6 ">

                                    <Label>Image</Label>
                                    <SelectFileInput
                                        selected="Set the "
                                        NameOffield="Image"
                                        onfilesUpload={(imageUrl, imageType) =>
                                            handleImageChange(field.id, imageUrl, imageType || field.value?.value)
                                        }
                                        filesUrl={field.imageFile?.id}
                                        existingImage={field.imageFile}
                                    />
                                    <Label >Text</Label>
                                    <JoditEditorComp
                                        value={field.textContent || ""}
                                        onChange={(newContent) => handleTextChange(field.id, newContent)}

                                    />

                                </div>
                            )}


                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default TextToImageAndImageToText