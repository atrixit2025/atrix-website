import React, { useState, useContext } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import NewPageBreadcrumb from "../../components/common/NewPageBreadcrumb";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";
import { CategoryContext } from "../../ContextApi/CategoryContextApi";
import CategoryTable from "./CategoryTable";

export default function CategoryTechnology() {
  const { addCategory, editCategory } = useContext(CategoryContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    customSlug: "",
    autoSlug: "",
  });
  const [editingCategory, setEditingCategory] = useState(null); // Track the category being edited

  // Handle form submission
  const handleSubmit = async () => {
    const { name, description, customSlug, autoSlug } = formData;

    if (!name || !description) {
      alert("Name and Description are required!");
      return;
    }

    try {
      if (editingCategory) {
        // If editing, call the editCategory function
        await editCategory(editingCategory.Name, {
          Name: name,
          Description: description,
          Slug: customSlug || autoSlug,
        });
      } else {
        // If adding, call the addCategory function
        await addCategory({
          Name: name,
          Description: description,
          Slug: customSlug || autoSlug,
        });
      }

      // Clear the form and reset editing state
      setFormData({
        name: "",
        description: "",
        customSlug: "",
        autoSlug: "",
      });
      setEditingCategory(null);

      // alert(
      //   editingCategory
      //     ? "Category updated successfully!"
      //     : "Category created successfully!"
      // );
    } catch (error) {
      console.error("Error:", error);
      alert(
        editingCategory
          ? "Error updating category. Please try again."
          : "Error creating category. Please try again."
      );
    }
  };

  // Automatically generate the slug when the name changes
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

  // Handle changes for other fields (description and custom slug)
  const handleChange = (id, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Handle edit button click from the table
  const handleEditClick = (category) => {
    setEditingCategory(category); // Set the category being edited
    setFormData({
      name: category.Name,
      description: category.Description,
      customSlug: category.Slug,
      autoSlug: category.Slug,
    });
  };

  return (
    <>
      <NewPageBreadcrumb pageTitle="Category" />
      <div className="space-y-3 grid grid-cols-[3fr_2fr] gap-6">
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
            <Label htmlFor="description">Add Description</Label>
            <TextArea
              id="description"
              value={formData.description}
              onChange={(value) => handleChange("description", value)} // Pass the value directly
            />
          </div>
          <div className="cursor-pointer  justify-start">
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
          <ComponentCard title="Category Table">
            <CategoryTable onEditClick={handleEditClick} />
          </ComponentCard>
        </div>
      </div>
    </>
  );
}