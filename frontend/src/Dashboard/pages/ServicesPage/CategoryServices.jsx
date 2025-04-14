// import React, { useState, useContext, useEffect } from "react";
// import NewPageBreadcrumb from "../../components/common/NewPageBreadcrumb";
// import Label from "../../components/form/Label";
// import Input from "../../components/form/input/InputField";
// import TextArea from "../../components/form/input/TextArea";
// import Button from "../../components/ui/button/Button";
// import CategoryServicesTable from "./CategoryServicesTable";
// import { ServicesCategoryContext } from "../../ContextApi/ServicesCategoryContextApi";
// import Select from "../../components/form/Select";

// export default function CategoryServices() {
//   const { addServicesCategory, editServicesCategory,fetchParentCategories,categories } = useContext(ServicesCategoryContext);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     customSlug: "",
//     autoSlug: "",
//     ParentCategory: "", 
//   });
 
//   const [editingCategory, setEditingCategory] = useState(null);

//   // Fetch categories for the dropdown
//   useEffect(() => {
//     fetchParentCategories();
//   }, []);

  
//   const handleSubmit = async () => {
//     const { name, description, customSlug, autoSlug, ParentCategory } = formData;

//     if (!name || !description) {
//       alert("Name and Description are required!");
//       return;
//     }

//     try {
//       if (editingCategory) {
//         // If editing, call the editCategory function
        
//         await editServicesCategory(editingCategory.Name, {
//           Name: name,
//           Description: description,
//           Slug: customSlug || autoSlug,
//           ParentCategory: ParentCategory || null,
//         });
//       } else {
//         // If adding, call the addCategory function
//         await addServicesCategory({
//           Name: name,
//           Description: description,
//           Slug: customSlug || autoSlug,
//           ParentCategory: ParentCategory || null,
//         });
//       }

//       // Clear the form and reset editing state
//       setFormData({
//         name: "",
//         description: "",
//         customSlug: "",
//         autoSlug: "",
//         ParentCategory: "",
//       });
//       setEditingCategory(null);
//       await fetchParentCategories();
//     //   alert(
//     //     editingCategory
//     //       ? "Category updated successfully!"
//     //       : "Category created successfully!"
//     //   );
//     } catch (error) {
//       console.error("Error:", error);
//       alert(
//         editingCategory
//           ? "Error updating category. Please try again."
//           : "Error creating category. Please try again."
//       );
//     }
//   };

//   // Automatically generate the slug when the name changes
//   const handleNameChange = (e) => {
//     const newName = e.target.value;
//     const newAutoSlug = newName
//       .toLowerCase()
//       .replace(/\s+/g, "-")
//       .replace(/[^\w\-]+/g, "");

//     setFormData((prevState) => ({
//       ...prevState,
//       name: newName,
//       autoSlug: newAutoSlug,
//     }));
//   };

//   // Handle changes for other fields (description, custom slug, and parent category)
//   const handleChange = (id, value) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [id]: value,
//     }));
//   };

//   // Handle edit button click from the table
//   const handleEditClick = (category) => {
//     setEditingCategory(category);
//     setFormData({
//       name: category.Name,
//       description: category.Description,
//       customSlug: category.Slug,
//       autoSlug: category.Slug,
//       ParentCategory: category.ParentCategory?._id || category.ParentCategory || "",
//     });
//   };

//   // Map categories to options for the Select component
//   const categoryOptions = categories.map((category) => ({
//     value: category._id,
//     label: category.Name,
//   }));

//   return (
//     <>
//       <NewPageBreadcrumb pageTitle="Category Services" />
//       <div className="space-y-3 xl:grid grid-cols-[3fr_2fr] gap-6">
//         <div className="space-y-6">
//           <h4>{editingCategory ? "Edit Category" : "Add New Category"}</h4>
//           <div>
//             <Label htmlFor="name">Name</Label>
//             <Input
//               type="text"
//               id="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleNameChange}
//             />
//           </div>
//           <div>
//             <Label htmlFor="customSlug">Slug</Label>
//             <Input
//               type="text"
//               id="customSlug"
//               placeholder="Slug"
//               value={formData.customSlug || formData.autoSlug}
//               onChange={(e) => handleChange("customSlug", e.target.value)}
//             />
//           </div>
//           <div>
//             <Label htmlFor="parentCategory">Parent Category</Label>
//             <Select
//               options={categoryOptions} // Pass the mapped options
//               placeholder="Select Parent Category"
//               onChange={(value) => handleChange("ParentCategory", value)}
//               className="w-full p-2 border rounded-lg"
//               value={formData.ParentCategory} // Use value instead of defaultValue
//             />
//           </div>
//           <div>
//             <Label htmlFor="description">Add Description</Label>
//             <TextArea
//               id="description"
//               value={formData.description}
//               onChange={(value) => handleChange("description", value)}
//             />
//           </div>
       
//           <div className="cursor-pointer justify-start">
//             <Button
//               size="sm"
//               variant="outline"
//               onClick={handleSubmit}
//               className="cursor-pointer w-[100px]"
//             >
//               {editingCategory ? "Update" : "Publish"}
//             </Button>
//           </div>
//         </div>
//         <div>
//           {/* <ComponentCard title="Category Table"> */}
//             <CategoryServicesTable onEditClick={handleEditClick} />
//           {/* </ComponentCard> */}
//         </div>
//       </div>
//     </>
//   );
// }

import React from "react";
import { ServicesCategoryContext } from "../../ContextApi/ServicesCategoryContextApi";
import CategoryServicesTable from "./CategoryServicesTable";
import GenericCategory from "../../components/form/GenericCategory/GenericCategory";

function ServicesCategory() {
  return (
    <GenericCategory
      contextApi={ServicesCategoryContext}
      pageTitle="Category Services"
      TableComponent={CategoryServicesTable}
      categoryType="services"
    />
  );
}

export default ServicesCategory;