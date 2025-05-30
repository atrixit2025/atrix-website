 import React, { useEffect, useState } from "react";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";

export default function Process({onChange,initialData}) {
   const [selectFields, setSelectFields] = useState(() => {
        return [
            {
                id: 1,
                value: "",
                description: "",
                // heading: "",
                cardheading: ""
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
                description: "",
                // heading: "",
                cardheading: ""
            }
        ]);
    };
    useEffect(() => {
        if (initialData && initialData.length > 0) {
            setSelectFields(initialData.map((item, index) => ({
                id: index + 1,
                cardheading: item.cardheading || "",
                description: item.description || ""
            })));
        }
    }, [initialData]);

    
    useEffect(() => {
        if (onChange) {
            onChange(selectFields.map(field => ({
                cardheading: field.cardheading,
                description: field.description
            })).filter(item => 
                item.cardheading.trim() !== "" || 
                item.description.trim() !== ""
            ))
        }
    }, [selectFields]);


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

    const handlecardheadingChange = (id, value) => {
        setSelectFields(selectFields.map(field =>
            field.id === id ? { ...field, cardheading: value } : field
        ));
    };

    return (
        <div className="">
            <div className="space-y-6 ">
                            <Label>Process</Label>
                
                <div 
                className="border-2 border-gray-700 rounded-xl px-4">
                {selectFields.map((field, index) => (
                    <div key={field.id} className="">
                      
                        
                        <div className=" space-y-6 bg-zinc-800 rounded-xl p-4 my-4">
                                {/* <div>
                                    <Label htmlFor={`heading-${field.id}`}>Heading</Label>
                                    <Input
                                        type="text"
                                        id={`heading-${field.id}`}
                                        placeholder="Why do you need"
                                        value={field.heading}
                                        onChange={(e) => handleHeadingChange(field.id, e.target.value)}
                                    />
                                </div> */}

                                <div className="">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor={`card-heading-${field.id}`}>Card Heading</Label>
                                        <div className="flex  items-center mb-4">
                                            <div className="flex gap-2 ">
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
                                    </div>
                                <Input
                                    type="text"
                                    id={`card-heading-${field.id}`}
                                    placeholder="Card Heading"
                                    value={field.cardheading}
                                    onChange={(e) => handlecardheadingChange(field.id, e.target.value)}
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
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}