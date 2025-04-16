import React, { useState } from 'react'
import SelectBulk from '../form/SelectBulk';
import JoditEditorComp from '../JoditEditorComp/JoditEditorComp';
import SelectFileInput from '../form/form-elements/SelectFileInput';

const SelectField = () => {
     const [selectFields, setSelectFields] = useState(() => {
        return [
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
    <div className=''>
       {selectFields.map((field, index) => (
            <div key={field.id} className="card mb-3 border-2 px-4 py-2 rounded-xl border-gray-700">
              <div className="card-header ">
                <h4 className="card-title flex justify-between items-center mb-2">
                  Select Field
                  {/* {index + 1} */}
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

                {field.value?.value === "text" && (
                  <div className="form-group text-black ">

                    <JoditEditorComp
                      value={field.textContent || ""}
                      onChange={(newContent) => handleTextChange(field.id, newContent)}

                    />
                  </div>
                )}

                {(field.value?.value === "image" ||
                  field.value?.value === "full-image" ||
                  field.value?.value === "big-image") && (
                    <div className="form-group">
                      <SelectFileInput
                      selected="Set the "
                        NameOffield="Image"
                        onImageUpload={(imageId, imageType) =>
                          handleImageChange(field.id, imageId, imageType || field.value?.value)
                        }
                        imageId={field.imageFile?.id}
                        existingImage={field.imageFile}
                      />

                      {/* Optional: Show image type indicator */}
                      {field.imageFile?.type && (
                        <div className="mt-2 text-sm text-gray-500">
                          Image Type: {field.imageFile.type}
                        </div>
                      )}
                    </div>
                  )}
              </div>
            </div>
          ))}
    </div>
    </>
  )
}

export default SelectField
