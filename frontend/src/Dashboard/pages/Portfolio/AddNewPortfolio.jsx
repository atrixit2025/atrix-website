

// import React, { useState, useEffect, useContext, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import FileInputExample from "../../components/form/form-elements/FileInputExample";
// import Button from "../../components/ui/button/Button";
// import Checkbox from "../../components/form/input/Checkbox";
// import Label from "../../components/form/Label";
// import Input from "../../components/form/input/InputField";
// import ComponentCategory from "../../components/common/ComponentCategoryCard";
// import { ImageProvider } from "../../ContextApi/ImageApi";
// import axios from "axios";
// import TextArea from "../../components/form/input/TextArea";
// import { PortfolioCategoryContext } from "../../ContextApi/PortfolioCategoryContextApi";
// import SelectBulk from "../../components/form/SelectBulk";
// import JoditEditor from 'jodit-react';
// import SelectFileInput from "../../components/form/form-elements/SelectFileInput";

// export default function AddNewPortfolio() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const { fetchCategoryCounts } = useContext(PortfolioCategoryContext);
//   const editor = useRef(null);
//   const [content, setContent] = useState('');
//   const [imageFields, setImageFields] = useState({
//     image: null,
//     fullImage: null,
//     bigImage: null
//   });
//   // Single state object for form data
//   const [formData, setFormData] = useState({
//     title: "",
//     text: "",
//     selectedCategories: [], // Default to an empty array
//     imageId: null,
//   });

//   const { Portfolio } = location.state || {};

//   // Fetch categories from the API
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:5300/PortfolioCategory/Portfolio/category/get");
//         setCategories(response.data.categories);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Pre-fill the form if in edit mode
//   useEffect(() => {
//     if (Portfolio) {
//       setFormData({
//         title: Portfolio.title,
//         selectedCategories: Portfolio.category ? Portfolio.category.split(", ") : [],
//         imageId: Portfolio.FeaturedImage
//       });

//       // Transform contentSections to selectFields
//       const transformedFields = Portfolio.contentSections.map((section, index) => ({
//         id: index + 1,
//         value: {
//           value: section.type, label: section.type === 'text' ? 'Text' :
//             section.type === 'image' ? 'Image' :
//               section.type === 'full-image' ? 'Full Image' : 'Big Image'
//         },
//         options: [
//           { value: "", label: "Select Option" },
//           { value: "text", label: "Text" },
//           { value: "image", label: "Image" },
//           { value: "full-image", label: "Full Image" },
//           { value: "big-image", label: "Big Image" }
//         ],
//         textContent: section.type === 'text' ? section.content : "",
//         imageFile: section.type !== 'text' ? {
//           id: section.imageId,
//           name: "Existing image",
//           type: section.type
//         } : null
//       }));

//       setSelectFields(transformedFields);

//       // Set image fields
//       const imageFields = {};
//       Portfolio.contentSections.forEach(section => {
//         if (section.type !== 'text') {
//           imageFields[section.type.replace('-', '')] = section.imageId;
//         }
//       });
//       setImageFields(imageFields);
//     }
//   }, [Portfolio]);

//   const handleCategoryChange = (category) => {
//     setFormData((prev) => ({
//       ...prev,
//       selectedCategories: prev.selectedCategories.includes(category)
//         ? prev.selectedCategories.filter((cat) => cat !== category) // Deselect
//         : [...prev.selectedCategories, category], // Select
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     const { title, selectedCategories, imageId } = formData;

//     const contentSections = selectFields.map(field => {
//       if (field.value.value === 'text') {
//         return {
//           type: 'text',
//           content: field.textContent
//         };
//       } else {
//         return {
//           type: field.value.value,
//           imageId: field.imageFile?.id || null
//         };
//       }
//     });
//     // Validate required fields
//     if (!title) {
//       alert("Title is required!");
//       return;
//     }
//     if (selectedCategories.length === 0) {
//       alert("At least one category must be selected!");
//       return;
//     }
//     if (!imageId) {

//       alert("Featured image is required!");
//       return;
//     }

//     // Prepare data for submission - field names match backend
//     const PortfolioData = {
//       title,
//       category: selectedCategories.join(", "),
//       FeaturedImageId: imageId,
//       contentSections
//     };

//     //     console.log("Submitting Portfolio data:", PortfolioData);
//     // console.log("Final imageFields state:", imageFields);
//     // console.log("Final imageFields:", {
//     //   image: imageFields.image,
//     //   fullImage: imageFields.fullImage,
//     //   bigImage: imageFields.bigImage
//     // });
//     try {
//       if (Portfolio) {
//         await axios.put(`http://localhost:5300/Portfolio/edit`, {
//           id: Portfolio.id,
//           ...PortfolioData
//         });
//       } else {
//         await axios.post("http://localhost:5300/Portfolio/add", PortfolioData);
//       }

//       await fetchCategoryCounts();
//       navigate("/Dashboard/Portfolio");
//     } catch (error) {
//       console.error("Error saving Portfolio:", error);
//       alert(error.response?.data?.message || "Error saving Portfolio. Please try again.");
//     }
//   };



//   const [selectFields, setSelectFields] = useState(() => {
//     return [
//       {
//         id: 1,
//         value: "",
//         options: [
//           { value: "", label: "Select Option" },
//           { value: "text", label: "Text" },
//           { value: "image", label: "Image" },
//           { value: "full-image", label: "Full Image" },
//           { value: "big-image", label: "Big Image" }
//         ],
//         textValue: "",
//         imageFile: null
//       }
//     ];
//   });




//   const addSelectField = () => {
//     const newId = selectFields.length > 0 ? Math.max(...selectFields.map(f => f.id)) + 1 : 1;
//     setSelectFields([
//       ...selectFields,
//       {
//         id: newId,
//         value: "",
//         options: [
//           { value: "", label: "Select Option" },
//           { value: "text", label: "Text" },
//           { value: "image", label: "Image" },
//           { value: "full-image", label: "Full Image" },
//           { value: "big-image", label: "Big Image" }
//         ],
//         textValue: "",
//         imageFile: null
//       }
//     ]);
//   };


//   const handleSelectChange = (id, value) => {
//     // console.log(`Field ${id} changed to:`, value);
//     setSelectFields(selectFields.map(field =>
//       field.id === id ? { ...field, value } : field
//     ));
//   };


//   const removeSelectField = (id) => {
//     if (selectFields.length > 1) {
//       setSelectFields(selectFields.filter(field => field.id !== id));
//     }
//   };

//   const handleTextChange = (id, newContent) => {
//     setSelectFields(selectFields.map(field =>
//       field.id === id ? { ...field, textContent: newContent } : field
//     ));
//   };


//   const handleImageChange = (id, imageId, fieldType) => {
//     const stateFieldName = fieldType === "full-image" ? "fullImage" :
//       fieldType === "big-image" ? "bigImage" :
//         fieldType;

//     // console.log(`Image changed - Type: ${stateFieldName}, ID: ${imageId}`);

//     setSelectFields(selectFields.map(field => {
//       if (field.id === id) {
//         return {
//           ...field,
//           imageFile: {
//             id: imageId,
//             name: "Uploaded image",
//             type: fieldType
//           }
//         };
//       }
//       return field;
//     }));

//     setImageFields(prev => ({
//       ...prev,
//       [stateFieldName]: imageId
//     }));
//   };



//   return (
//     <div>
//       <div className="flex justify-between items-center mb-10">
//         <h1 className="text-4xl font-semibold text-gray-800 dark:text-white/90">
//           {Portfolio ? "Edit Portfolio" : "Add New Portfolio"}
//         </h1>
//         <div>
//           <Button
//             size="sm"
//             variant="outline"
//             className="cursor-pointer"
//             onClick={handleSubmit}
//           >
//             {Portfolio ? "Update" : "Publish"}
//           </Button>
//         </div>
//       </div>
//       <div className="grid grid-cols-[4fr_1fr] gap-6">
//         <div className="space-y-10">
//           <div>
//             <Label htmlFor="input">Add Title</Label>
//             <Input
//               type="text"
//               id="input"
//               placeholder="Add Title"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, title: e.target.value }))
//               }
//             />
//           </div>
//           {/* <div>
//             <Label htmlFor="text">Add text</Label>
//             <TextArea
//               id="text"
            
//             />
//           </div> */}


//           {selectFields.map((field, index) => (
//             <div key={field.id} className="card mb-3 border-2 px-4 py-2 rounded-xl border-gray-700">
//               <div className="card-header ">
//                 <h4 className="card-title flex justify-between items-center mb-2">
//                   Select Field
//                   {/* {index + 1} */}
//                   <div className="flex items-center gap-5">
//                     {/* Show minus button only if not the first field */}
//                     {index > 0 && (
//                       <button
//                         onClick={() => removeSelectField(field.id)}
//                         className="text-red-500 text-3xl mt-3"
//                       >
//                         -
//                       </button>
//                     )}
//                     {/* Show plus button only on the last field */}
//                     {index === selectFields.length - 1 && (
//                       <button
//                         onClick={addSelectField}
//                         className="flex items-center gap-2 text-blue-500 mt-4"
//                       >
//                         <span className="text-3xl">+</span>
//                       </button>
//                     )}
//                   </div>
//                 </h4>
//               </div>
//               <div className="card-body">
//                 <div className="form-group mb-3">
//                   <SelectBulk
//                     options={field.options}
//                     value={field.value}
//                     onChange={(value) => handleSelectChange(field.id, value)}
//                     className="form-control"
//                   />
//                 </div>
//                 {/* {console.log(`Field ${field.id} value:`, field.value)} */}
//                 {field.value?.value === "text" && (
//                   <div className="form-group text-black ">
//                     {/* <Label htmlFor={`text-input-${field.id}`}>Text Content</Label>
//                     <TextArea
//                       id={`text-input-${field.id}`}
//                       value={field.textValue}
//                       onChange={(value) => handleTextChange(field.id, value)}
//                       placeholder="Enter your text content"
//                     /> */}
//                     <JoditEditor
//                       ref={editor}
//                       value={field.textContent || ""}
//                       onChange={(newContent) => handleTextChange(field.id, newContent)}
//                     //  config={{
//                     //    readonly: false,
//                     //    toolbar: true,
//                     //    spellcheck: true,
//                     //    language: 'en',
//                     //    toolbarButtonSize: 'medium',
//                     //  buttons: [
//                     //    'bold', 'italic', 'underline', 'strikethrough',
//                     //    'ul', 'ol', 'outdent', 'indent',
//                     //    'font', 'fontsize', 'brush', 'paragraph',
//                     //    'image', 'table', 'link', 'align',
//                     //    'undo', 'redo', 'hr', 'eraser',
//                     //    'copyformat', 'fullsize'
//                     //  ]
//                     //  }}
//                     />
//                   </div>
//                 )}

//                 {(field.value?.value === "image" || field.value?.value === "full-image" || field.value?.value === "big-image") && (
//                   <div className="form-group">
//                     {/* <Label>Image Upload</Label> */}
//                     <SelectFileInput
//                       onImageUpload={(imageId) => handleImageChange(field.id, imageId, field.value?.value)}
//                       existingImage={
//                         Portfolio ? {
//                           id: Portfolio[field.value?.value === "image" ? "image" :
//                             field.value?.value === "full-image" ? "fullImage" :
//                               "bigImage"],
//                           name: "Existing image"
//                         } : field.imageFile
//                       }
//                     />
//                     {/* {field.imageFile && (
//                       <div className="mt-2 text-sm text-green-600">
//                         {field.value?.value.replace(/-/g, " ")} uploaded
//                       </div>
//                     )} */}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}

//         </div>
//         <div className="space-y-6">
//           <div>
//             <ComponentCategory title="Category" link="/CategoryPortfolio">
//               <div className="items-center gap-4 space-y-5">
//                 {categories.map((category) => (
//                   <div key={category._id} className="flex items-center gap-3">
//                     <Checkbox
//                       id={`category-${category._id}`}
//                       checked={formData.selectedCategories.includes(category.Name)} // Check if selected
//                       onChange={() => handleCategoryChange(category.Name)} // Handle selection
//                       label={category.Name}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </ComponentCategory>
//           </div>
//           <ImageProvider>
//             <FileInputExample
//               onImageUpload={(imageId) =>
//                 setFormData((prev) => ({ ...prev, imageId }))
//               }
//               imageId={Portfolio?.imageId}
//             />
//           </ImageProvider>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useLocation } from "react-router-dom";
import GenericForm from "../../components/form/form-Add-New/GenericForm";
import { PortfolioCategoryContext } from "../../ContextApi/PortfolioCategoryContextApi";

export default function AddNewPortfolio() {
  const location = useLocation();
  const { portfolio } = location.state || {};
  // console.log("portfolio", portfolio);
  return (
    <GenericForm
      title="Add New Portfolio"
      editTitle="Edit Portfolio"
      apiEndpoint="http://localhost:5300/Portfolio"
      categoryEndpoint="http://localhost:5300/PortfolioCategory/portfolio/category/get"
      redirectPath="/Dashboard/Portfolio"
      contentType="portfolio"
      item={portfolio}

      hasContentSections={true}
      hasRichText={false} // Example: Portfolios might not need rich text
      initialData={portfolio}
    />
  );
}