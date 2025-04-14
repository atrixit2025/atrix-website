import React, { useState, useContext, useEffect } from "react";
import NewPageBreadcrumb from "../../common/NewPageBreadcrumb";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import TextArea from "../input/TextArea";
import Button from "../../ui/button/Button";
// import NewPageBreadcrumb from "../../components/common/NewPageBreadcrumb";
// import Label from "../../components/form/Label";
// import Input from "../../components/form/input/InputField";
// import TextArea from "../../components/form/input/TextArea";
// import Button from "../../components/ui/button/Button";
// import Select from "../../components/form/Select";

export default function GenericCategory({
  contextApi,
  pageTitle,
  TableComponent,
  categoryType
}) {
  const { 
    addCategory, 
    editCategory,
    fetchParentCategories,
    categories 
  } = useContext(contextApi);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    customSlug: "",
    autoSlug: "",
    ParentCategory: "",
  });
 
  const [editingCategory, setEditingCategory] = useState(null);

  // Fetch categories for the dropdown
  useEffect(() => {
    fetchParentCategories();
  }, []);

  const handleSubmit = async () => {
    const { name, description, customSlug, autoSlug, ParentCategory } = formData;

    if (!name || !description) {
      alert("Name and Description are required!");
      return;
    }

    try {
      if (editingCategory) {
        await editCategory(editingCategory.Name, {
          Name: name,
          Description: description,
          Slug: customSlug || autoSlug,
          ParentCategory: ParentCategory || null,
        });
      } else {
        await addCategory({
          Name: name,
          Description: description,
          Slug: customSlug || autoSlug,
          ParentCategory: ParentCategory || null,
        });
      }

      // Clear the form and reset editing state
      setFormData({
        name: "",
        description: "",
        customSlug: "",
        autoSlug: "",
        ParentCategory: "",
      });
      setEditingCategory(null);
      await fetchParentCategories();
    } catch (error) {
      console.error("Error:", error);
      alert(
        editingCategory
          ? `Error updating ${categoryType} category. Please try again.`
          : `Error creating ${categoryType} category. Please try again.`
      );
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    const newAutoSlug = newName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");

    setFormData((prevState) => ({
      ...prevState,
      name: newName,
      autoSlug: newAutoSlug,
    }));
  };

  const handleChange = (id, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.Name,
      description: category.Description,
      customSlug: category.Slug,
      autoSlug: category.Slug,
      ParentCategory: category.ParentCategory?._id || category.ParentCategory || "",
    });
  };

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.Name,
  }));

  return (
    <>
      <NewPageBreadcrumb pageTitle={pageTitle} />
      <div className="space-y-3 xl:grid grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          <h4>{editingCategory ? "Edit Category" : "Add New Category"}</h4>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <Label htmlFor="customSlug">Slug</Label>
            <Input
              type="text"
              id="customSlug"
              placeholder="Slug"
              value={formData.customSlug || formData.autoSlug}
              onChange={(e) => handleChange("customSlug", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="parentCategory">Parent Category</Label>
            <Select
              options={categoryOptions}
              placeholder="Select Parent Category"
              onChange={(value) => handleChange("ParentCategory", value)}
              className="w-full p-2 border rounded-lg"
              value={formData.ParentCategory}
            />
          </div>
          <div>
            <Label htmlFor="description">Add Description</Label>
            <TextArea
              id="description"
              value={formData.description}
              onChange={(value) => handleChange("description", value)}
            />
          </div>
       
          <div className="cursor-pointer justify-start">
            <Button
              size="sm"
              variant="outline"
              onClick={handleSubmit}
              className="cursor-pointer w-[100px]"
            >
              {editingCategory ? "Update" : "Publish"}
            </Button>
          </div>
        </div>
        <div>
          <TableComponent onEditClick={handleEditClick} />
        </div>
      </div>
    </>
  );
}