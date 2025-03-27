import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FileInputExample from "../../components/form/form-elements/FileInputExample";
import Button from "../../components/ui/button/Button";
import Checkbox from "../../components/form/input/Checkbox";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import ComponentCategory from "../../components/common/ComponentCategoryCard";
import { ImageProvider } from "../../ContextApi/ImageApi";
import axios from "axios";
import TextArea from "../../components/form/input/TextArea";
import { BlogCategoryContext } from "../../ContextApi/BlogCategoryContextApi";
import Select from "../../components/form/Select";
import SelectBulk from "../../components/form/SelectBulk";

export default function Demo() {
  const [selectFields, setSelectFields] = useState(() => {
    const saved = localStorage.getItem('selectFields');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        value: "",
        options: [
          { value: "", label: "Select Option" },
          { value: "text", label: "Text" },
          { value: "image", label: "Image" },
          { value: "full-image", label: "Full Image" },
          { value: "big-image", label: "Big Image" }
        ],
        textValue: "",
        imageFile: null
      }
    ];
  });


  useEffect(() => {
    localStorage.setItem('selectFields', JSON.stringify(selectFields));
  }, [selectFields]);

  const addSelectField = () => {
    const newId = selectFields.length > 0 ? Math.max(...selectFields.map(f => f.id)) + 1 : 1;
    setSelectFields([
      ...selectFields,
      {
        id: newId,
        value: "",
        options: [
          { value: "", label: "Select Option" },
          { value: "text", label: "Text" },
          { value: "image", label: "Image" },
          { value: "full-image", label: "Full Image" },
          { value: "big-image", label: "Big Image" }
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

  const handleTextChange = (id, textValue) => {
    setSelectFields(selectFields.map(field =>
      field.id === id ? { ...field, textValue } : field
    ));
  };

  const handleImageChange = (id, imageFile) => {
    setSelectFields(selectFields.map(field =>
      field.id === id ? { ...field, imageFile } : field
    ));
  };

  // console.log("Initial selectFields:", selectFields);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white/90">
          Demo
        </h1>
        <div>
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer"

          >
            Demo
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-[4fr_1fr] gap-6">
        <div className="space-y-10">
          <div>
            <Label htmlFor="input">Add Title</Label>
            <Input
              type="text"
              id="input"
              placeholder="Add Title"


            />
          </div>




          {selectFields.map((field, index) => (
            <div key={field.id} className="card mb-3 border-2 px-4 py-2 rounded-xl border-gray-700">
              <div className="card-header ">
                <h4 className="card-title flex justify-between items-center mb-2">
                  Select Field {index + 1}
                  <div className="flex items-center gap-5">
                    {/* Show minus button only if not the first field */}
                    {index > 0 && (
                      <button
                        onClick={() => removeSelectField(field.id)}
                        className="text-red-500 text-3xl mt-3"
                      >
                        -
                      </button>
                    )}
                    {/* Show plus button only on the last field */}
                    {index === selectFields.length - 1 && (
                      <button
                        onClick={addSelectField}
                        className="flex items-center gap-2 text-blue-500 mt-4"
                      >
                        <span className="text-3xl">+</span>
                      </button>
                    )}
                  </div>
                </h4>
              </div>
              <div className="card-body">
                <div className="form-group mb-3">
                  <SelectBulk
                    options={field.options}
                    value={field.value}
                    onChange={(value) => handleSelectChange(field.id, value)}
                    className="form-control"
                  />
                </div>
                {/* {console.log(`Field ${field.id} value:`, field.value)} */}
                {field.value?.value === "text" && (
                  <div className="form-group">
                    <Label htmlFor={`text-input-${field.id}`}>Text Content</Label>
                    <TextArea
                      id={`text-input-${field.id}`}
                      value={field.textValue}
                      onChange={(e) => handleTextChange(field.id, e.target.value)}
                      placeholder="Enter your text content"
                    />
                  </div>
                )}

                {(field.value?.value === "image" || field.value?.value === "full-image" || field.value?.value === "big-image") && (
                  <div className="form-group">
                    <Label>Image Upload</Label>
                    <FileInputExample
                      onImageUpload={(file) => handleImageChange(field.id, file)}
                      existingImage={field.imageFile}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}











        </div>





















        <div className="space-y-6">
          <div>
            <ComponentCategory title="Category" link="/CategoryBlog">
              <div className="items-center gap-4 space-y-5">

              </div>
            </ComponentCategory>
          </div>
          <ImageProvider>
            <FileInputExample


            />
          </ImageProvider>
        </div>
      </div>
    </div>
  );
}