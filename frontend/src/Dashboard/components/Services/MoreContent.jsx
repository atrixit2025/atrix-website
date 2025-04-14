// import React, { useEffect, useState } from "react";
// import Label from "../../components/form/Label";
// import Input from "../../components/form/input/InputField";
// import TextArea from "../../components/form/input/TextArea";
// import SelectBulk from "../../components/form/SelectBulk";
// import SelectFileInput from "../form/form-elements/SelectFileInput";

// export default function MoreContent({onChange,initialData}) {
//     const [selectFields, setSelectFields] = useState(() => {

//         return [
//             {
//                 id: 1,
//                 value: "",
//                 options: [
//                     { value: "", label: "Select Option" },
//                     { value: "content", label: "Content" },
//                     { value: "gallery", label: "Gallery" },
//                 ],
//                 description: "",
//                 imageFile: null
//             }
//         ];
//     });


//     useEffect(() => {
//         if (initialData && Array.isArray(initialData)) {
//           const mappedFields = initialData.map((item, index) => ({
//             id: index + 1,
//             value: item.value ? { value: item.value, label: item.value } : "",
//             options: [
//               { value: "", label: "Select Option" },
//               { value: "content", label: "Content" },
//               { value: "gallery", label: "Gallery" }
//             ],
//             description: item.description || "",
//             imageFile: item.imageFile || null,
//             // heading: item.heading || "",
//             cardheading: item.cardheading || ""
//           }));
      
//           setSelectFields(mappedFields);
      
//           // Optional: if there's "content" data, set content fields too
//           const contentFields = mappedFields.filter(f => f.value.value === "content").map((item, index) => ({
//             id: index + 1,
//             // heading: item.heading || "",
//             cardheading: item.cardheading || "",
//             description: item.description || ""
//           }));
      
//           if (contentFields.length) setContentSelectFields(contentFields);
      
//           // Same for gallery
//           const galleryFields = mappedFields.filter(f => f.value.value === "gallery").map((item, index) => ({
//             id: index + 1,
//             imageFile: item.imageFile || null
//           }));
      
//           if (galleryFields.length) setGallerySelectFields(galleryFields);
//         }
//       }, [initialData]);

//       useEffect(() => {
//         if (onChange) {
//           const mapped = selectFields.map(field => ({
//             value: field.value?.value || "",
//             description: field.description,
//             // heading: field.heading || "",
//             cardheading: field.cardheading || "",
//             imageFile: field.imageFile || null
//           }));
//           onChange(mapped);
//         }
//       }, [selectFields]);
      

//     const addSelectField = () => {
//         const newId = selectFields.length > 0 ? Math.max(...selectFields.map(f => f.id)) + 1 : 1;
//         setSelectFields([
//             ...selectFields,
//             {
//                 id: newId,
//                 value: "",
//                 options: [
//                     { value: "", label: "Select Option" },
//                     { value: "content", label: "Content" },
//                     { value: "gallery", label: "Gallery" },
//                 ],
//                 description: "",
//                 imageFile: null
//             }
//         ]);
//     };


//     const [contentselectFields, setContentSelectFields] = useState(() => {
//         return [
//             {
//                 id: 1,
//                 value: "",
//                 description: "",
//                 // heading: "",
//                 cardheading: ""
//             }
//         ];
//     });

//     const contentaddSelectField = () => {
//         const newId = contentselectFields.length > 0 ? Math.max(...contentselectFields.map(f => f.id)) + 1 : 1;
//         setContentSelectFields([
//             ...contentselectFields,
//             {
//                 id: newId,
//                 value: "",
//                 description: "",
//                 // heading: "",
//                 cardheading: ""
//             }
//         ]);
//     };

//     const contentremoveSelectField = (id) => {
//         if (contentselectFields.length > 1) {
//             setContentSelectFields(contentselectFields.filter(field => field.id !== id));
//         }
//     };

//     const [galleryselectFields, setGallerySelectFields] = useState(() => {
//         return [
//             {
//                 id: 1,
//                 imageFile: null
//             }
//         ];
//     });

//     const galleryaddSelectField = () => {
//         const newId = galleryselectFields.length > 0 ? Math.max(...galleryselectFields.map(f => f.id)) + 1 : 1;
//         setGallerySelectFields([
//             ...galleryselectFields,
//             {
//                 id: newId,
//                 imageFile: null
//             }
//         ]);
//     };

//     const galleryremoveSelectField = (id) => {
//         if (galleryselectFields.length > 1) {
//             setGallerySelectFields(galleryselectFields.filter(field => field.id !== id));
//         }
//     };
//     const handleSelectChange = (id, value) => {
//         setSelectFields(selectFields.map(field =>
//             field.id === id ? { ...field, value } : field
//         ));
//     };


//     const removeSelectField = (id) => {
//         if (selectFields.length > 1) {
//             setSelectFields(selectFields.filter(field => field.id !== id));
//         }
//     };
//     const handleContentDescriptionChange = (id, value) => {
//         setContentSelectFields(contentselectFields.map(field =>
//             field.id === id ? { ...field, description: value } : field
//         ));
//     };
    
//     const handleHeadingChange = (id, value) => {
//         setContentSelectFields(contentselectFields.map(field =>
//             field.id === id ? { ...field, heading: value } : field
//         ));
//     };
    
//     const handlecardheadingChange = (id, value) => {
//         setContentSelectFields(contentselectFields.map(field =>
//             field.id === id ? { ...field, cardheading: value } : field
//         ));
//     };


//     const handleImageChange = (id, imageFile) => {
//         setSelectFields(selectFields.map(field =>
//             field.id === id ? { ...field, imageFile } : field
//         ));
//     };

//     // console.log("Initial selectFields:", selectFields);

//     return (
//         <div>
//             <div className="flex justify-between items-center mb-10">

//             </div>
//             <div className="">
//                 <Label >Services Content</Label>

//                 <div className="space-y-10">
//                     {selectFields.map((field, index) => (
//                         <div key={field.id} className="card mb-3 border-2 px-4 py-2 rounded-xl border-gray-700">
//                             <div className="card-header ">
//                                 <h4 className="card-title flex justify-between items-center mb-2">
//                                     Select Field
//                                     <div className="flex items-center gap-5">
//                                         {/* Show minus button only if not the first field */}
//                                         {index > 0 && (
//                                             <button
//                                                 onClick={() => removeSelectField(field.id)}
//                                                 className="text-red-500 text-3xl mt-3"
//                                             >
//                                                 -
//                                             </button>
//                                         )}
//                                         {/* Show plus button only on the last field */}
//                                         {index === selectFields.length - 1 && (
//                                             <button
//                                                 onClick={addSelectField}
//                                                 className="flex items-center gap-2 text-blue-500 mt-4"
//                                             >
//                                                 <span className="text-3xl">+</span>
//                                             </button>
//                                         )}
//                                     </div>
//                                 </h4>
//                             </div>
//                             <div className="card-body">
//                                 <div className="form-group mb-3">
//                                     <SelectBulk
//                                         options={field.options}
//                                         value={field.value}
//                                         onChange={(value) => handleSelectChange(field.id, value)}
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 {field.value?.value === "content" && (
//                                     contentselectFields.map((contentField, index) => (
//                                         <div key={contentField.id} className="mb-3">
//                                             <div className="flex justify-between items-center mb-4">
//                                                 <h4 className="text-lg font-medium">
//                                                     Field {index + 1}
//                                                 </h4>
//                                                 <div className="flex gap-2">
//                                                     {index > 0 && (
//                                                         <button
//                                                             onClick={() => contentremoveSelectField(contentField.id)}
//                                                             className="text-red-500 text-2xl cursor-pointer"
//                                                         >
//                                                             -
//                                                         </button>
//                                                     )}
//                                                     {index === contentselectFields.length - 1 && (
//                                                         <button
//                                                             onClick={contentaddSelectField}
//                                                             className="text-blue-500 text-2xl cursor-pointer"
//                                                         >
//                                                             +
//                                                         </button>
//                                                     )}
//                                                 </div>
//                                             </div>

//                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                                 {/* <div>
//                                                     <Label htmlFor={`heading-${contentField.id}`}>Heading</Label>
//                                                     <Input
//                                                         type="text"
//                                                         id={`heading-${contentField.id}`}
//                                                         placeholder="Why do you need"
//                                                         value={contentField.heading}
//                                                         onChange={(e) => handleHeadingChange(contentField.id, e.target.value)}
//                                                     />
//                                                 </div> */}

//                                                 <div>
//                                                     <Label htmlFor={`card-heading-${contentField.id}`}>Card Heading</Label>
//                                                     <Input
//                                                         type="text"
//                                                         id={`card-heading-${contentField.id}`}
//                                                         placeholder="Card Heading"
//                                                         value={contentField.cardheading}
//                                                         onChange={(e) => handlecardheadingChange(contentField.id, e.target.value)}
//                                                     />
//                                                 </div>

//                                                 <div className="md:col-span-2">
//                                                     <Label htmlFor={`description-${contentField.id}`}>Description</Label>
//                                                     <TextArea
//                                                         id={`description-${contentField.id}`}
//                                                         value={contentField.description}
//                                                         onChange={(value) => handleContentDescriptionChange(contentField.id,value)}
//                                                         placeholder="Enter your text content"
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))
//                                 )}

//                                 <div className="">
//                                     {(field.value?.value === "gallery") && (
//                                         galleryselectFields.map((galleryField, index) => (
//                                             <div key={galleryField.id} className="mb-3">
//                                                 <div className="flex justify-between items-center mb-4">

//                                                     <div className="flex gap-2">
//                                                         {index > 0 && (
//                                                             <button
//                                                                 onClick={() => galleryremoveSelectField(galleryField.id)}
//                                                                 className="text-red-500 text-2xl cursor-pointer"
//                                                             >
//                                                                 -
//                                                             </button>
//                                                         )}
//                                                         {index === galleryselectFields.length - 1 && (
//                                                             <button
//                                                                 onClick={galleryaddSelectField}
//                                                                 className="text-blue-500 text-2xl cursor-pointer"
//                                                             >
//                                                                 +
//                                                             </button>
//                                                         )}
//                                                     </div>
//                                                 </div>

//                                                 <div className="border px-2 border-gray-700 h-52 w-52 flex justify-center items-center text-center">
//                                                     <SelectFileInput
//                                                         NameOffield="+"


//                                                         onImageUpload={(file) => handleImageChange(field.id, file)}
//                                                         existingImage={field.imageFile}
//                                                     />
//                                                 </div>
//                                             </div>

//                                         ))

//                                     )}
//                                 </div>

//                             </div>
//                         </div>
//                     ))}

//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useEffect, useState } from "react";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import SelectBulk from "../../components/form/SelectBulk";
import SelectFileInput from "../form/form-elements/SelectFileInput";

export default function MoreContent({ onChange, initialData }) {
  const [selectFields, setSelectFields] = useState([
    {
      id: 1,
      type: "", // "content" or "gallery"
      cardheading: "",
      description: "",
      imageId: null
    }
  ]);

  // Initialize with data
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setSelectFields(initialData.map((item, index) => ({
        id: index + 1,
        type: item.type || "",
        cardheading: item.cardheading || "",
        description: item.description || "",
        imageId: item.imageId || null
      })));
    }
  }, [initialData]);

  // Send data to parent
  useEffect(() => {
    if (onChange) {
      onChange(selectFields.map(field => ({
        type: field.type,
        cardheading: field.cardheading,
        description: field.description,
        imageId: field.imageId
      })).filter(item => 
        item.type && // Must have a type
        (item.type === 'content' ? 
          (item.cardheading || item.description) : 
          item.imageId)
      ));
    }
  }, [selectFields]);

  const addField = () => {
    const newId = selectFields.length > 0 ? 
      Math.max(...selectFields.map(f => f.id)) + 1 : 1;
    setSelectFields([
      ...selectFields,
      {
        id: newId,
        type: "",
        cardheading: "",
        description: "",
        imageId: null
      }
    ]);
  };

  const removeField = (id) => {
    if (selectFields.length > 1) {
      setSelectFields(selectFields.filter(field => field.id !== id));
    }
  };

  const handleTypeChange = (id, value) => {
    setSelectFields(selectFields.map(field => 
      field.id === id ? { 
        ...field, 
        type: value.value, // Changed to value.value to match SelectBulk
        // Reset fields when type changes
        cardheading: value.value === 'content' ? field.cardheading : "",
        description: value.value === 'content' ? field.description : "",
        imageId: value.value === 'gallery' ? field.imageId : null
      } : field
    ));
  };

  // Fixed handleContentChange function
  const handleContentChange = (id, fieldName, value) => {
    setSelectFields(selectFields.map(field => 
      field.id === id ? { ...field, [fieldName]: value } : field
    ));
  };

  const handleImageUpload = (id, imageId) => {
    setSelectFields(selectFields.map(field => 
      field.id === id ? { ...field, imageId } : field
    ));
  };

  return (
    <div className="space-y-4">
      {selectFields.map((field) => (
        <div key={field.id} className="border-2 border-gray-700 rounded-xl p-4">
          <div className="mb-4">
            <Label>Content Type</Label>
            <SelectBulk
              options={[
                { value: "", label: "Select Option" },
                { value: "content", label: "Content" },
                { value: "gallery", label: "Gallery" }
              ]}
              value={field.type ? 
                { value: field.type, label: field.type === 'content' ? 'Content' : 'Gallery' } 
                : ""
              }
              onChange={(value) => handleTypeChange(field.id, value)}
            />
          </div>

          {/* Content Fields - Only show if type is content */}
          {field.type === "content" && (
            <>
              <div className="mb-4">
                <Label>Card Heading</Label>
                <Input
                  value={field.cardheading}
                  onChange={(e) => 
                    handleContentChange(field.id, 'cardheading', e.target.value)
                  }
                  placeholder="Enter card heading"
                />
              </div>
              <div className="mb-4">
                <Label>Description</Label>
                <TextArea
                  value={field.description}
                  onChange={(value) => 
                    handleContentChange(field.id, 'description', value)
                  }
                  placeholder="Enter description"
                />
              </div>
            </>
          )}

          {/* Gallery Field - Only show if type is gallery */}
          {field.type === "gallery" && (
            <div className="mb-4">
              <Label>Gallery Image</Label>
              <div className="border border-gray-700 h-52 flex justify-center items-center">
                <SelectFileInput
                  NameOffield={field.imageId ? "Change Image" : "+ Add Image"}
                  onImageUpload={(imageId) => handleImageUpload(field.id, imageId)}
                  imageId={field.imageId}
                />
              </div>
              {field.imageId && (
                <div className="mt-2 text-sm text-gray-500">
                  Image selected
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end mt-4">
            <button 
              onClick={() => removeField(field.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove This Field
            </button>
          </div>
        </div>
      ))}

      <button 
        onClick={addField}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add More Content
      </button>
    </div>
  );
}