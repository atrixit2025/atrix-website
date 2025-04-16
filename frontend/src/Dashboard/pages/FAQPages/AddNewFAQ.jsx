import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import Checkbox from "../../components/form/input/Checkbox";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import ComponentCategory from "../../components/common/ComponentCategoryCard";
import axios from "axios";
import TextArea from "../../components/form/input/TextArea";
import { FAQCategoryContext } from "../../ContextApi/FAQCaategoryContextApi";

export default function AddNewFAQ() {
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { fetchCategoryCounts } = useContext(FAQCategoryContext);
  const editor = useRef(null);
  // Single state object for form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    selectedCategories: [], 
  });

  const { FAQ } = location.state || {};

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5300/FAQCategory/FAQ/category/get");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Pre-fill the form if in edit mode
  useEffect(() => {
    if (FAQ) {
      setFormData({
        title: FAQ.title,
        selectedCategories: FAQ.category ? FAQ.category.split(", ") : [],
        description: FAQ.description
      });

    }
  }, [FAQ]);

  const handleCategoryChange = (category) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((cat) => cat !== category) // Deselect
        : [...prev.selectedCategories, category], // Select
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const { title, selectedCategories, description } = formData;

    // Validate required fields
    if (!title) {
      alert("Title is required!");
      return;
    }
    if (selectedCategories.length === 0) {
      alert("At least one category must be selected!");
      return;
    }
    if (!description) {

      alert("description is required!");
      return;
    }

    const FAQData = {
      title,
      category: selectedCategories.join(", "),
      description: description,
    };

    // console.log("FAQData",FAQData)
    try {
      if (FAQ) {
        await axios.put(`http://localhost:5300/FAQ/edit`, {
          id: FAQ.id,
          ...FAQData
        });
      } else {
        await axios.post("http://localhost:5300/FAQ/add", FAQData);
      }

      await fetchCategoryCounts();
      navigate("/Dashboard/FAQ");
    } catch (error) {
      console.error("Error saving FAQ:", error);
      alert(error.response?.data?.message || "Error saving FAQ. Please try again.");
    }
  };



  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white/90">
          {FAQ ? "Edit FAQ" : "Add New FAQ"}
        </h1>
        <div>
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer"
            onClick={handleSubmit}
          >
            {FAQ ? "Update" : "Publish"}
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
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>


          <div>
            <Label htmlFor="input">Add Description</Label>
            <TextArea
              type="description"
              id="input"
              placeholder="Add Description"
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
            />
          </div>
          {/* <div>
            <Label htmlFor="text">Add text</Label>
            <TextArea
              id="text"
            
            />
          </div> */}

        </div>
        <div className="space-y-6">
          <div>
            <ComponentCategory title="Category" link="/Dashboard/CategoryFAQ">
              <div className="items-center gap-4 space-y-5">
                {categories.map((category) => (
                  <div key={category._id} className="flex items-center gap-3">
                    <Checkbox
                      id={`category-${category._id}`}
                      checked={formData.selectedCategories.includes(category.Name)} 
                      onChange={() => handleCategoryChange(category.Name)} 
                      label={category.Name}
                    />
                  </div>
                ))}
              </div>
            </ComponentCategory>
          </div>
        </div>
      </div>
    </div>
  );
}