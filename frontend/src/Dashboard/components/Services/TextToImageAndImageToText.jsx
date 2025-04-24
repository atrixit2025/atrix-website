import React, { useState } from 'react'
import SelectBulk from '../form/SelectBulk';
import JoditEditorComp from '../JoditEditorComp/JoditEditorComp';
import SelectFileInput from '../form/form-elements/SelectFileInput';
import Label from '../form/Label';

const TextToImageAndImageToText = () => {
    const [selectFields, setSelectFields] = useState(() => {
        return [
            {
                id: 1,
                value: "",
                options: [
                    { value: "", label: "Select Option" },
                    { value: "texttoimage", label: "TexttoImage" },
                    { value: "imagetotext", label: "ImagetoText" },

                ],
                textValue: "",
                imageFile: null
            }
        ];
    });




    const addSelectField = () => {
        const newId = selectFields.length > 0 ? Math.max(...selectFields.map(f => f.id)) + 1 : 1;
        setSelectFields([
            ...selectFields,
            {
                id: newId,
                value: "",
                options: [
                    { value: "", label: "Select Option" },
                    { value: "texttoimage", label: "TexttoImage" },
                    { value: "imagetotext", label: "ImagetoText" },
                ],
                textValue: "",
                imageFile: null
            }
        ]);
    };
    const handleSelectChange = (id, value) => {
        // console.log(`Field ${id} changed to:`, value);
        setSelectFields(selectFields.map(field =>
            field.id === id ? { ...field, value } : field
        ));
    };


    const removeSelectField = (id) => {
        if (selectFields.length > 1) {
            setSelectFields(selectFields.filter(field => field.id !== id));
        }
    };

    const handleTextChange = (id, newContent) => {
        setSelectFields(selectFields.map(field =>
            field.id === id ? { ...field, textContent: newContent } : field
        ));
    };


    const handleImageChange = (id, imageId, fieldType) => {
        setSelectFields(selectFields.map(field => {
            if (field.id === id) {
                return {
                    ...field,
                    imageFile: {
                        id: imageId,
                        url: imageId ? `http://localhost:5300/Image/get/${imageId}` : null,
                        type: fieldType,
                        name: "Uploaded image"
                    }
                };
            }
            return field;
        }));
    };
    return (
        <>
            <Label>Select Field</Label>
            <div className='border-2 px-4 py-2 rounded-xl border-gray-700 '>

                {selectFields.map((field, index) => (
                    <div key={field.id} className="card  ">


                        <div className="card-body  bg-zinc-800 rounded-xl p-4">
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
                                        selected="Set the "
                                        NameOffield="Image"
                                        onImageUpload={(imageId, imageType) =>
                                            handleImageChange(field.id, imageId, imageType || field.value?.value)
                                        }
                                        imageId={field.imageFile?.id}
                                        existingImage={field.imageFile}
                                    />
                                </div>
                            )}

                            {field.value?.value === "imagetotext" && (
                                <div className="form-group space-y-6 ">

                                    <Label>Image</Label>
                                    <SelectFileInput
                                        selected="Set the "
                                        NameOffield="Image"
                                        onImageUpload={(imageId, imageType) =>
                                            handleImageChange(field.id, imageId, imageType || field.value?.value)
                                        }
                                        imageId={field.imageFile?.id}
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
