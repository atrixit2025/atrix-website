import React, { useEffect, useState } from "react";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import JoditEditorComp from "../JoditEditorComp/JoditEditorComp";

export default function WhyAtrix({onChange,initialData}) {
    const [selectFields, setSelectFields] = useState(() => {
        return [
            {
                id: 1,
                value: "",
                textValue: "",
                heading: "",
                // cardheading: ""
            }
        ];
    });


    useEffect(() => {
        if (initialData && initialData.length > 0) {
          setSelectFields(initialData.map((item, index) => ({
            id: index + 1,
            heading: item.heading || "",
            // cardheading: item.cardheading ||  "", // handle both spellings
            description: item.description || ""
          })));
        }
      }, [initialData]);

      useEffect(() => {
        if (onChange) {
          onChange(
            selectFields
              .map(field => ({
                heading: field.heading,
                description: field.description
              }))
              .filter(item =>
                (item.heading || "").trim() !== "" ||
                (item.description || "").trim() !== ""
              )
          );
        }
      }, [selectFields]);
      
 

      const handleTextChange = (id, newContent) => {
        setSelectFields(selectFields.map(field =>
          field.id === id ? { ...field, description: newContent } : field
        ));
      };

    const handleHeadingChange = (id, value) => {
        setSelectFields(selectFields.map(field =>
            field.id === id ? { ...field, heading: value } : field
        ));
    };

    const handlecardheadingChange = (id, value) => {
        setSelectFields(selectFields.map(field =>
            field.id === id ? { ...field, heading: value } : field
        ));
    };

    return (
        <div className="">
            <div className="">
                <div
                    className="border-2 border-gray-700 rounded-xl p-4">
                    {selectFields.map((field, index) => (
                        <div key={field.id} className="">


                            <div className="space-y-6 ">
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

                                <div>
                                    <Label htmlFor={`Heading-${field.id}`}>Heading</Label>
                                    <Input
                                        type="text"
                                        id={`Heading-${field.id}`}
                                        placeholder="Heading"
                                        value={field.heading}
                                        onChange={(e) => handleHeadingChange(field.id, e.target.value)}
                                    />
                                </div>

                                <div className="md:col-span-2    ">
                                    <Label htmlFor={`Description-${field.id}`}>Description</Label>
                                    <JoditEditorComp
                                        value={field.description || ""}
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