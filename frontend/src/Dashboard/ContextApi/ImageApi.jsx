import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";


const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  // Fetch all images from the backend
  const fetchAllImages = async () => {
    try {
      const response = await axios.get("http://localhost:5300/Image/get");
      if (response.status === 200) {
        const images = response.data.Image.map((item) => item.image);
        setAllImages(images);
      } else {
        console.error("Error fetching images:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Upload an image
  const handleFileChange = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5300/Image/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setAllImages((prev) => [...prev, response.data.image]);
        setSelectedImageUrl(response.data.image);
        return response.data.image; // Return the uploaded image URL
      } else {
        console.error("Error uploading image:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Delete an image
  const handleDeleteImage = async (imageUrl) => {
    try {
      const response = await axios.delete("http://localhost:5300/Image/delete", {
        data: { ImageUrl: imageUrl },
      });

      if (response.status === 200) {
        setAllImages((prev) => prev.filter((img) => img !== imageUrl));
        if (selectedImageUrl === imageUrl) {
          setSelectedImageUrl(null);
        }
        console.log("Image deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // Set the featured image
  const handleSetFeaturedImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Remove the featured image
  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  // Provide the context value
  const value = {
    selectedImage,
    allImages,
    selectedImageUrl,
    setSelectedImageUrl,
    fetchAllImages,
    handleFileChange,
    handleDeleteImage,
    handleSetFeaturedImage,
    handleRemoveImage,
  };

  return <ImageContext.Provider value={value}>{children}</ImageContext.Provider>;
};

// Custom hook to use the ImageContext
export const useImageContext = () => useContext(ImageContext);