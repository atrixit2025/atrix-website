import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FileInputExample from "../../components/form/form-elements/FileInputExample";
import Button from "../../components/ui/button/Button";
import { ImageProvider } from "../../ContextApi/ImageApi";
import axios from "axios";

export default function AddNewBrand() {
  const location = useLocation();
  const navigate = useNavigate();

  // Single state object for form data
  const [formData, setFormData] = useState({
    
    imageId: null,
  });

  const { brand } = location.state || {};

  useEffect(() => {
    if (brand) {
      setFormData({

        imageId: brand.imageId,
      });
    }
  }, [brand]);



  // Handle form submission
  const handleSubmit = async () => {
    const {  imageId } = formData;

    if ( !imageId) {
      alert(" image are required!");
      return;
    }

    const brandData = {

      imageId,
    };

    try {
      if (brand) {
        // Update existing brand
        const payload = {
          id: brand.id, // Ensure this is included
          ...brandData,
        };
        console.log("Payload:", payload); // Debug the payload
        const response = await axios.put(`http://localhost:5300/Brand/edit`, payload);
        console.log("Update Response:", response.data);
      } else {
        // Create new brand
        const response = await axios.post("http://localhost:5300/Brand/add", brandData);
        console.log("Create Response:", response.data);
      }

      navigate("/brand");
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