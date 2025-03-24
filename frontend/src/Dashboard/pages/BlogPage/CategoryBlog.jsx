import React, { useState, useContext, useEffect } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import NewPageBreadcrumb from "../../components/common/NewPageBreadcrumb";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";
import CategoryBlogTable from "./CategoryBlogTable";
import { BlogCategoryContext } from "../../ContextApi/BlogCategoryContextApi";
import axios from "axios";
import Select from "../../components/form/Select";

export default function CategoryBlog() {
  const { addBlogCategory, editBlogCategory } = useContext(BlogCategoryContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    customSlug: "",
    autoSlug: "",
    ParentCategory: "", // Add ParentCategory to the form state
  });
  const [categories, setCategories] = useState([]); // Fetch all categories for the dropdown
  const [editingCategory, setEditingCategory] = useState(null);

  // Fetch categories for the dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5300/BlogCategory/blog/category/get");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    const { name, description, customSlug, autoSlug, ParentCategory } = formData;

    if (!name || !description) {
      alert("Name and Description are required!");
      return;
    }

    try {
      if (editingCategory) {
        // If editing, call the editCategory function
        await editBlogCategory(editingCategory.Name, {
          Name: name,
          Description: description,
          Slug: customSlug || autoSlug,
          ParentCategory: ParentCategory || null,
        });
      } else {
        // If adding, call the addCategory function
        await addBlogCategory({
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

    //   alert(
    //     editingCategory
    //       ? "Category updated successfully!"
    //       : "Category created successfully!"
    //   );
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

  // Handle changes for other fields (description, custom slug, and parent category)
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
      ParentCategory: category.ParentCategory || "", // Set ParentCategory if it exists
    });
  };

  // Map categories to options for the Select component
  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.Name,
  }));

  return (
    <>
      <NewPageBreadcrumb pageTitle="Category Blog" />
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
              options={categoryOptions} // Pass the mapped options
              placeholder="Select Parent Category"
              onChange={(value) => handleChange("ParentCategory", value)}
              className="w-full p-2 border rounded-lg"
              defaultValue={formData.ParentCategory}
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
          {/* <ComponentCard title="Category Table"> */}
            <CategoryBlogTable onEditClick={handleEditClick} />
          {/* </ComponentCard> */}
        </div>
      </div>
    </>
  );
}