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

export default function Demo() {
    const [selectFields, setSelectFields] = useState([
        { id: 1, value: "", options: [
          { value: "", label: "Select Option" },
          { value: "text", label: "Text" },
          { value: "image", label: "Image" },
          { value: "full-image", label: "Full Image" },
          { value: "big-image", label: "Big Image" }
        ] }
      ]);
    
      // Add a new select field
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
            ]
          }
        ]);
      };
    
      // Handle select field changes
      const handleSelectChange = (id, value) => {
        setSelectFields(selectFields.map(field => 
          field.id === id ? { ...field, value } : field
        ));
      };
    
      // Remove a select field
      const removeSelectField = (id) => {
        setSelectFields(selectFields.filter(field => field.id !== id));
      };
    

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

          <div>
            <Label htmlFor="description">Add Select</Label>
            <TextArea
              id="description"
            />
          </div>


          
          {selectFields.map((field) => (
        <div key={field.id} className="card mb-3">
          <div className="card-header">
            <h4 className="card-title flex justify-between">
              Select Field 
              <button 
                onClick={() => removeSelectField(field.id)}
                className="text-red-500 text-3xl"
              >
                ×
              </button>
            </h4>
          </div>
          <div className="card-body">
            <div className="form-group mb-3">
              <Select
                options={field.options}
                value={field.value}
                onChange={(value) => handleSelectChange(field.id, value)}
                className="form-control"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add New Select Field Button */}
      <button
        onClick={addSelectField}
        className="flex items-center gap-2 text-blue-500 mt-4"
      >
        <span className="text-3xl">+</span>
        Add Another Select Field
      </button>








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