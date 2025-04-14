import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FileInputExample from "../../components/form/form-elements/FileInputExample";  // For image upload
import Button from "../../components/ui/button/Button";
import { ImageProvider } from "../../ContextApi/ImageApi";
import axios from "axios";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";

export default function AddNewBrand() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    imageId: null,
    link: "",  
  });

  const { brand } = location.state || {};

  useEffect(() => {
    if (brand) {
      setFormData({
        title: brand.title || "",
        imageId: brand.imageId,
        link: brand.link || "",  
      });
    }
  }, [brand]);

  // Handle form submission
  const handleSubmit = async () => {
    const { title, imageId, link } = formData;

    if (!title || !imageId  ) {
      alert("Title, image are required!");
      return;
    }

    const brandData = {
      title,
      imageId,
      link,
    };

    try {
      if (brand) {
        // Update existing brand
        const payload = {
          id: brand.id,  // Ensure this is included
          ...brandData,
        };
        const response = await axios.put(`http://localhost:5300/Brand/edit`, payload);
      } else {
        // Create new brand
        const response = await axios.post("http://localhost:5300/Brand/add", brandData);
      }

      navigate("/Dashboard/brand");
    } catch (error) {
      console.error("Error saving brand:", error);
      if (error.response) {
        console.error("Server Response:", error.response.data);
      }
      alert("Error saving brand. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white/90">
          {brand ? "Edit Brand" : "Add New Brand"}
        </h1>
        <div>
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer"
            onClick={handleSubmit}
          >
            {brand ? "Update" : "Publish"}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-[4fr_1fr] gap-6">
        <div className="space-y-6">
        <div>
          <Label htmlFor="title">Brand Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Add Title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="space-y-6">
          <Label htmlFor="link">Brand Link</Label>
          <Input
            type="url"
            id="link"
            placeholder="Enter the brand's link"
            value={formData.link}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, link: e.target.value }))
            }
          />
        </div>
        </div>
        <div className="space-y-10 mt-5">
          <ImageProvider>
            <FileInputExample
              onImageUpload={(imageId) =>
                setFormData((prev) => ({ ...prev, imageId }))
              }
              imageId={brand?.imageId}
            />
          </ImageProvider>
        </div>
      </div>
    </div>
  );
}
