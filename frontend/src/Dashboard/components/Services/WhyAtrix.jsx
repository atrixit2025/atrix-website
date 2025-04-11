
import React, { useEffect, useRef, useState } from "react";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import JoditEditor from "jodit-react";

export default function WhyAtrix({onChange,initialData}) {
    const [selectFields, setSelectFields] = useState(() => {
        return [
            {
                id: 1,
                value: "",
                textValue: "",
                heading: "",
                cardheading: ""
            }
        ];
    });

      const editor = useRef(null);

    useEffect(() => {
        if (initialData && Array.isArray(initialData)) {
          setSelectFields(initialData.map((item, index) => ({
            id: index + 1,
            heading: item.heading || "",
            cardheading: item.cardheading || item.cardheding || "", // handle both spellings
            description: item.description || ""
          })));
        }
      }, [initialData]);

      useEffect(() => {
        if (onChange) {
          onChange(selectFields.map(field => ({
            heading: field.heading,
            cardheading: field.cardheading,
            description: field.description
          })));
        }
      }, [selectFields]);
 

    const handleTextChange = (id, textValue) => {
        setSelectFields(selectFields.map(field =>
            field.id === id ? { ...field, textValue } : field
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
                <div
                    className="border-2 border-gray-700 rounded-xl p-4">
                    {selectFields.map((field, index) => (
                        <div key={field.id} className="">


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor={`heading-${field.id}`}>Heading</Label>
                                    <Input
                                        type="text"
                                        id={`heading-${field.id}`}
                                        placeholder="Why do you need"
                                        value={field.heading}
                                        onChange={(e) => handleHeadingChange(field.id, e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor={`Title-${field.id}`}>Title</Label>
                                    <Input
                                        type="text"
                                        id={`Title-${field.id}`}
                                        placeholder="Title"
                                        value={field.cardheading}
                                        onChange={(e) => handlecardheadingChange(field.id, e.target.value)}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor={`Description-${field.id}`}>Description</Label>
                                    <JoditEditor
                                        ref={editor}
                                        value={field.textContent || ""}
                                        onChange={(newContent) => handleTextChange(field.id, newContent)}

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