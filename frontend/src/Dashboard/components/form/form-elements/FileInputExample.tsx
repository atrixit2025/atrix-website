// import React, { useState, useEffect } from "react";
// import ComponentCard from "../../common/ComponentCard";
// import { Modal } from "../../ui/modal";
// import Button from "../../ui/button/Button";
// import { FaTrash, FaUpload } from "react-icons/fa";
// import axios from "axios";
// import { ImCheckboxChecked } from "react-icons/im";
// import { GrFormSubtract } from "react-icons/gr";

// // Define the type for the image object
// type Image = {
//   imageId: string; // MongoDB ObjectId
//   imageUrl: string; // Image URL
// };

// // Define the props for the FileInputExample component
// interface FileInputExampleProps {
//   onImageUpload: (imageId: string | null) => void; // Callback to pass the imageId to the parent
//   imageId: string | null; // The selected imageId (MongoDB ObjectId)
// }

// const FileInputExample: React.FC<FileInputExampleProps> = ({ onImageUpload, imageId }) => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
//   const [showUploadSection, setShowUploadSection] = useState<boolean>(true);
//   const [showAllImagesSection, setShowAllImagesSection] = useState<boolean>(false);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [allImages, setAllImages] = useState<Image[]>([]);
//   const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
//   const [hoveredImage, setHoveredImage] = useState<string | null>(null);
//   const [hoverIcons, setHoverIcons] = useState<string | null>(null);

//   // Fetch all images from the server
//   const fetchAllImages = async () => {
//     try {
//       const response = await axios.get("http://localhost:5300/Image/get");
//       if (response.status === 200) {
//         const images: Image[] = response.data.Image.map((item: any) => ({
//           imageId: item._id, // MongoDB ObjectId
//           imageUrl: item.image, // Image URL
//         }));
//         setAllImages(images); 
//       } else {
//         console.error("Error fetching images:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     }
//   };


//   useEffect(() => {
//     if (imageId) {
//       const fetchImageData = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5300/Image/get/${imageId}`);
//           const imageData = response.data.Image;

//           if (imageData) {
//             setSelectedImage(imageData.image); 
//             setSelectedImageUrl(imageData.image);
//             // console.log("Fetching image data for imageId:", imageId);
//             const response = await axios.get(`http://localhost:5300/Image/get/${imageId}`);
//             // console.log("Response from backend:", response.data);
//           } else {
//             console.error("No imageData found for imageId:", imageId);
//           }
//         } catch (error) {
//           console.error("Error fetching image data:", error);
//         }
//       };

//       fetchImageData();
//     }
//   }, [imageId]);

//   // Handle image upload
//   const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);

//       try {
//         const response = await axios.post("http://localhost:5300/Image/add", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         const uploadedImage = response.data.Image;
//         const imageId = uploadedImage._id; // MongoDB ObjectId
//         const imageUrl = uploadedImage.image; // Image URL

//         // console.log("imageId:", imageId); // Log the imageId
//         // console.log("imageUrl:", imageUrl); // Log the imageUrl

//         setShowUploadSection(false);
//         setShowAllImagesSection(true);
//         fetchAllImages(); // Fetch all images again to update the list
//         setSelectedImageUrl(imageUrl);
//       } catch (error) {
//         console.error("Error uploading image:", error);
//         alert("Error uploading image. Please try again.");
//       }
//     }
//   };

//   // Handle image deletion
//   const handleDeleteImage = async (imageUrl: string) => {
//     try {
//       const response = await axios.delete("http://localhost:5300/Image/delete", {
//         data: { ImageUrl: imageUrl },
//       });

//       if (response.status === 200) {
//         setAllImages((prev) => prev.filter((img) => img.imageUrl !== imageUrl)); // Remove from state
//         if (selectedImageUrl === imageUrl) {
//           setSelectedImageUrl(null); // Clear selected image if deleted
//         }
//         // console.log("Image deleted successfully");
//       }
//     } catch (error) {
//       console.error("Error deleting image:", error);
//     }
//   };

//   // Handle setting a featured image
//   const handleSetFeaturedImage = (imageUrl: string) => {
//     const imageData = allImages.find((image) => image.imageUrl === imageUrl); // Find the image data
//     if (imageData) {
//       setSelectedImage(imageUrl); // Set the selected image URL for display
//       onImageUpload(imageData.imageId); // Pass the MongoDB ObjectId to the parent component
//       closeModal(); // Close the modal
//     }
//   };

//   // Handle removing the featured image
//   const handleRemoveImage = () => {
//     setSelectedImage(null);
//     onImageUpload(null); // Notify the parent component that no image is selected
//   };

//   // Open the modal
//   const openModal = () => {
//     setIsOpen(true);
//     setIsFullscreen(false);
//     setShowUploadSection(true);
//     setShowAllImagesSection(false);
//     setSelectedImageUrl(null);
//     fetchAllImages(); // Fetch images when the modal opens
//   };

//   // Close the modal
//   const closeModal = () => {
//     setIsOpen(false);
//     setIsFullscreen(false);
//   };

//   // Handle image selection in the modal
//   const handleImageClick = (imageUrl: string) => {
//     if (selectedImageUrl === imageUrl) {
//       setSelectedImageUrl(null);
//     } else {
//       setSelectedImageUrl(imageUrl);
//     }
//   };

//   return (
//     <ComponentCard title="Featured Image">
//       <div>
//         {selectedImage ? (
//           <div className="flex flex-col items-center">
//             <img
//               src={`http://localhost:5300${selectedImage}`}
//               alt="Featured"
//               className="w-32 h-32 object-contain"
//             />
//             {/* <div className="mt-5 ">{imageId}</div> */}
//             <button
//               onClick={handleRemoveImage}
//               className="mt-2 text-red-600 hover:text-red-800"
//             >
//               Remove Image
//             </button>
//           </div>
//         ) : (
//           <p
//             className="text-(--blue) cursor-pointer underline"
//             onClick={openModal}
//           >
//             Set Featured Image
//           </p>
//         )}

//         {/* Modal for Uploading and Selecting Images */}
//         <Modal
//           isOpen={isOpen}
//           onClose={closeModal}
//           className={isFullscreen ? "w-[80%] h-full" : "container mx-auto max-w-[1850px]  w-[80%] p-6 bg-black"}
//           isFullscreen={isFullscreen}
//         >
//           <div className="row flex flex-col flex-wrap">
//             <div className="col-3 grow-0 shrink-0">
//               <h1 className="text-2xl font-bold mb-10">Featured Image</h1>

//               {/* Toggle between Upload and All Images sections */}
//               <div className="border-b border-darkblack mb-5">
//                 <div className="flex justify-between">
//                   <div className="flex items-center gap-10 mb-3">
//                     <button
//                       onClick={() => {
//                         setShowUploadSection(true);
//                         setShowAllImagesSection(false);
//                       }}
//                       className={`text-lg cursor-pointer font-bold ${showUploadSection
//                         ? "text-(--white) border-2 bg-(--blue) rounded-sm border-(--blue) px-2 py-2"
//                         : "text-gray-500 "
//                         }`}
//                     >
//                       Upload Image
//                     </button>
//                     <button
//                       onClick={() => {
//                         setShowUploadSection(false);
//                         setShowAllImagesSection(true);
//                       }}
//                       className={`text-lg cursor-pointer font-bold ${showAllImagesSection
//                         ? "text-(--white) border-2 bg-(--blue) rounded-sm border-(--blue) px-2 py-2"
//                         : "text-gray-500"
//                         }`}
//                     >
//                       All Images
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="col-3   ">
//               {/* Upload Section */}
//               {showUploadSection && (
//                 <div className="cursor-pointer text-center  h-[60vh] flex justify-center items-center  ">
//                   <div className="border-2 border-dashed border-(--blue) p-6 rounded-lg  hover:bg-(--blue) transition ">
//                     <label className="cursor-pointer">
//                       <input
//                         type="file"
//                         onChange={handleUpload}
//                         accept="image/*"
//                         className="hidden"
//                       />
//                       <div className="flex flex-col items-center">
//                         <FaUpload className="text-(--lightwhite) text-3xl" />
//                         <p className="text-(--lightwhite) font-bold">Click to upload or drag & drop</p>
//                       </div>
//                     </label>
//                   </div>
//                 </div>
//               )}


//               {/* All Images Section */}
//               {showAllImagesSection && (
//                 <div className="flex-1 flex-col px-2  h-[60vh]  custom-scrollbar">

//                   <div className="">
//                     <h5 className="mb-4 text-xl lg:text-2xl">All Images</h5>
//                     <div className="flex flex-wrap  gap-5">
//                       {allImages.map((image, index) => (
//                         <div
//                           key={index}
//                           className={`relative cursor-pointer p-0.5 w-32 ${selectedImageUrl === image.imageUrl
//                             ? "border-(--blue) outline-4 outline-(--blue)"
//                             : "border-gray-700 border"
//                             }`}
//                           onClick={() => handleImageClick(image.imageUrl)}
//                           onMouseEnter={() => setHoveredImage(image.imageUrl)}
//                           onMouseLeave={() => setHoveredImage(null)}
//                         >
//                           <img
//                             src={`http://localhost:5300${image.imageUrl}`}
//                             alt={`Image ${index + 1}`}
//                             className="w-32 h-32 object-contain"
//                           />

//                           {selectedImageUrl === image.imageUrl && hoverIcons !== image.imageUrl && (
//                             <div
//                               onMouseEnter={() => setHoverIcons(image.imageUrl)}
//                               onMouseLeave={() => setHoverIcons(null)}
//                             >
//                               <ImCheckboxChecked
//                                 size={24}
//                                 className="absolute -top-2.5 cursor-pointer -right-3 bg-(--white) rounded-sm text-(--blue)"
//                               />
//                             </div>
//                           )}

//                           {hoverIcons === image.imageUrl && (
//                             <div
//                               onMouseEnter={() => setHoverIcons(image.imageUrl)}
//                               onMouseLeave={() => setHoverIcons(null)}
//                             >
//                               <GrFormSubtract
//                                 size={24}
//                                 className="absolute -top-2.5 cursor-pointer -right-3 bg-(--blue) rounded-sm text-(--white)"
//                               />
//                             </div>
//                           )}

//                           {hoveredImage === image.imageUrl && (
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleDeleteImage(image.imageUrl);
//                               }}
//                               className="absolute bottom-2 cursor-pointer right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
//                             >
//                               <FaTrash size={14} />
//                             </button>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//               )}
//             </div>

//             <div className="col-3 mt-auto">
//               <div className="flex items-end text-end gap-3 mt-6 justify-end">
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={() => handleSetFeaturedImage(selectedImageUrl!)}
//                   disabled={!selectedImageUrl}
//                   className="btn btn-success cursor-pointer flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Set Featured Image
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Modal>
//       </div>
//     </ComponentCard>
//   );
// };

// export default FileInputExample;


import React, { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import { FaTrash, FaUpload } from "react-icons/fa";
import axios from "axios";
import { ImCheckboxChecked } from "react-icons/im";
import { GrFormSubtract } from "react-icons/gr";

// Define the type for the files object
type files = {
  filesId: string; // MongoDB ObjectId
  filesUrl: string; // files URL
};

// Define the props for the FileInputExample component
interface FileInputExampleProps {
  onfilesUpload: (filesId: string | null) => void; // Callback to pass the filesId to the parent
  filesId: string | null; // The selected filesId (MongoDB ObjectId)
}

const FileInputExample: React.FC<FileInputExampleProps> = ({ onfilesUpload, filesId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showUploadSection, setShowUploadSection] = useState<boolean>(true);
  const [showAllfilessSection, setShowAllfilessSection] = useState<boolean>(false);
  const [selectedfiles, setSelectedfiles] = useState<string | null>(null);
  const [allfiless, setAllfiless] = useState<files[]>([]);
  const [selectedfilesUrl, setSelectedfilesUrl] = useState<string | null>(null);
  const [hoveredfiles, setHoveredfiles] = useState<string | null>(null);
  const [hoverIcons, setHoverIcons] = useState<string | null>(null);

  // Fetch all filess from the server
  const fetchAllfiless = async () => {
    try {
      const response = await axios.get("http://localhost:5300/files/get");

      // Add proper type checking
      if (response.data?.files) {
        const files = response.data.files.map((item: any) => ({
          filesId: item._id,
          filesUrl: item.file  // This now matches the backend response
        }));
    
        setAllfiless(files);
      } else {
        console.error("Unexpected response format:", response.data);
        setAllfiless([]);
      }
    } catch (error) {
      console.error("Error fetching filess:", error);
      setAllfiless([]);
    }
  };


  useEffect(() => {
    if (filesId) {
      const fetchfilesData = async () => {
        try {
          const response = await axios.get(`http://localhost:5300/files/get/${filesId}`);
          console.log("File data response:", response.data);
          
          const filesData = response.data?.Image;
          if (filesData) {
            setSelectedfiles(filesData._id);
            setSelectedfilesUrl(filesData.image);
          } else {
            console.error("No filesData found for filesId:", filesId);
          }
        } catch (error) {
          console.error("Error fetching files data:", error);
        }
      };

      fetchfilesData();
    } else {
      setSelectedfiles(null);
      setSelectedfilesUrl(null);
    }
  }, [filesId]);

  // Handle files upload
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("http://localhost:5300/files/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const uploadedfiles = response.data?.file; // Updated to match backend response
        if (uploadedfiles) {
          setShowUploadSection(false);
          setShowAllfilessSection(true);
          fetchAllfiless();
          setSelectedfilesUrl(uploadedfiles.files); // Or whatever field contains the URL
        }
      } catch (error) {
        console.error("Error uploading files:", error);
        alert("Error uploading files. Please try again.");
      }
    }
  };

  // Handle files deletion
  // Update the delete handler
  const handleDeletefiles = async (filesUrl: string) => {
    try {
      const response = await axios.delete("http://localhost:5300/files/delete", {
        data: { fileUrl: filesUrl } // Changed to match backend expectation
      });

      if (response.status === 200) {
        // Update state properly
        setAllfiless(prev => prev.filter(f => f.filesUrl !== filesUrl));

        if (selectedfilesUrl === filesUrl) {
          setSelectedfilesUrl(null);
          setSelectedfiles(null);
          onfilesUpload(null);
        }

        // Optional: Show success message
        alert('File deleted successfully');
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert('Failed to delete file. Please try again.');
    }
  };

  // Handle setting a featured files
  const handleSetFeaturedfiles = (filesUrl: string) => {
    const filesData = allfiless.find((files) => files.filesUrl === filesUrl); // Find the files data
    if (filesData) {
      setSelectedfiles(filesUrl); // Set the selected files URL for display
      onfilesUpload(filesData.filesId); // Pass the MongoDB ObjectId to the parent component
      closeModal(); // Close the modal
    }
  };

  // Handle removing the featured files
  const handleRemovefiles = () => {
    setSelectedfiles(null);
    onfilesUpload(null); // Notify the parent component that no files is selected
  };

  // Open the modal
  const openModal = () => {
    setIsOpen(true);
    setIsFullscreen(false);
    setShowUploadSection(true);
    setShowAllfilessSection(false);
    setSelectedfilesUrl(null);
    fetchAllfiless(); // Fetch filess when the modal opens
  };

  // Close the modal
  const closeModal = () => {
    setIsOpen(false);
    setIsFullscreen(false);
  };

  // Handle files selection in the modal
  const handlefilesClick = (filesUrl: string) => {
    if (selectedfilesUrl === filesUrl) {
      setSelectedfilesUrl(null);
    } else {
      setSelectedfilesUrl(filesUrl);
    }
  };

  return (
    <ComponentCard title="Featured files">
      <div>
        {selectedfiles ? (
          <div className="flex flex-col items-center">
            {selectedfiles.endsWith('.mp4') ? (
      <video 
        controls 
        className="w-32 h-32 object-contain"
      >
        <source src={`${selectedfiles}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <img
        src={`${selectedfiles}`}
        alt="Featured"
        className="w-32 h-32 object-contain"
      />
    )}
            <button
              onClick={handleRemovefiles}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Remove files
            </button>
          </div>
        ) : (
          <p
            className="text-(--blue) cursor-pointer underline"
            onClick={openModal}
          >
            Set Featured files
          </p>
        )}

        {/* Modal for Uploading and Selecting filess */}
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className={isFullscreen ? "w-[80%] h-full" : "container mx-auto max-w-[1850px]  w-[80%] p-6 bg-black"}
          isFullscreen={isFullscreen}
        >
          <div className="row flex flex-col flex-wrap">
            <div className="col-3 grow-0 shrink-0">
              <h1 className="text-2xl font-bold mb-10">Featured files</h1>

              {/* Toggle between Upload and All filess sections */}
              <div className="border-b border-darkblack mb-5">
                <div className="flex justify-between">
                  <div className="flex items-center gap-10 mb-3">
                    <button
                      onClick={() => {
                        setShowUploadSection(true);
                        setShowAllfilessSection(false);
                      }}
                      className={`text-lg cursor-pointer font-bold ${showUploadSection
                        ? "text-(--white) border-2 bg-(--blue) rounded-sm border-(--blue) px-2 py-2"
                        : "text-gray-500 "
                        }`}
                    >
                      Upload files
                    </button>
                    <button
                      onClick={() => {
                        setShowUploadSection(false);
                        setShowAllfilessSection(true);
                      }}
                      className={`text-lg cursor-pointer font-bold ${showAllfilessSection
                        ? "text-(--white) border-2 bg-(--blue) rounded-sm border-(--blue) px-2 py-2"
                        : "text-gray-500"
                        }`}
                    >
                      All filess
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-3   ">
              {/* Upload Section */}
              {showUploadSection && (
                <div className="cursor-pointer text-center  h-[60vh] flex justify-center items-center  ">
                  <div className="border-2 border-dashed border-(--blue) p-6 rounded-lg  hover:bg-(--blue) transition ">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        onChange={handleUpload}
                        accept="files/*"
                        className="hidden"
                      />
                      <div className="flex flex-col items-center">
                        <FaUpload className="text-(--lightwhite) text-3xl" />
                        <p className="text-(--lightwhite) font-bold">Click to upload or drag & drop</p>
                      </div>
                    </label>
                  </div>
                </div>
              )}


              {/* All filess Section */}
              {showAllfilessSection && (
                <div className="flex-1 flex-col px-2  h-[60vh]  custom-scrollbar">

                  <div className="">
                    <h5 className="mb-4 text-xl lg:text-2xl">All files</h5>
                    <div className="flex flex-wrap  gap-5">
                      {allfiless.map((files, index) => (
                        <div
                          key={index}
                          className={`relative cursor-pointer p-0.5 w-32 ${selectedfilesUrl === files.filesUrl
                            ? "border-(--blue) outline-4 outline-(--blue)"
                            : "border-gray-700 border"
                            }`}
                          onClick={() => handlefilesClick(files.filesUrl)}
                          onMouseEnter={() => setHoveredfiles(files.filesUrl)}
                          onMouseLeave={() => setHoveredfiles(null)}
                        >
                          {files.filesUrl.endsWith('.mp4') ? (
                            <video className="w-32 h-32 object-cover">
                              <source src={`${files.filesUrl}`} type="video/mp4" />
                            </video>
                          ) : (
                            <img
                              src={`${files.filesUrl}`}
                              alt={`File ${index + 1}`}
                              className="w-32 h-32 object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/path/to/fallback/image.jpg';
                              }}
                            />
                          )}

                          {selectedfilesUrl === files.filesUrl && hoverIcons !== files.filesUrl && (
                            <div
                              onMouseEnter={() => setHoverIcons(files.filesUrl)}
                              onMouseLeave={() => setHoverIcons(null)}
                            >
                              <ImCheckboxChecked
                                size={24}
                                className="absolute -top-2.5 cursor-pointer -right-3 bg-(--white) rounded-sm text-(--blue)"
                              />
                            </div>
                          )}

                          {hoverIcons === files.filesUrl && (
                            <div
                              onMouseEnter={() => setHoverIcons(files.filesUrl)}
                              onMouseLeave={() => setHoverIcons(null)}
                            >
                              <GrFormSubtract
                                size={24}
                                className="absolute -top-2.5 cursor-pointer -right-3 bg-(--blue) rounded-sm text-(--white)"
                              />
                            </div>
                          )}

                          {hoveredfiles === files.filesUrl && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeletefiles(files.filesUrl);
                              }}
                              className="absolute bottom-2 cursor-pointer right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                              <FaTrash size={14} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              )}
            </div>

            <div className="col-3 mt-auto">
              <div className="flex items-end text-end gap-3 mt-6 justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSetFeaturedfiles(selectedfilesUrl!)}
                  disabled={!selectedfilesUrl}
                  className="btn btn-success cursor-pointer flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Set Featured files
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </ComponentCard>
  );
};

export default FileInputExample;