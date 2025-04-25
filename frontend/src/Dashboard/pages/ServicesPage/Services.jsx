// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import PageBreadcrumb from "../../components/common/PageBreadCrumb";;
// import GenericDataTable from "../../components/GenericDataTable/GenericDataTable";
// export default function Services() {
//   const [tableData, setTableData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5300/Services/get");
        
//         const ServicessWithImages = await Promise.all(
//           response.data.Services.map(async (services) => {
//             let featuredImageUrl = "/images/user/user-22.jpg";
//             let iconImageUrl = "/images/default-icon.png"; // Define default icon image
            
//             // Fetch featured image if exists
//             if (services.FeaturedImage) {
//               try {
//                 const imgResponse = await axios.get(
//                   `http://localhost:5300/Image/get/${services.FeaturedImage}`
//                 );
//                 featuredImageUrl = imgResponse.data.Image?.image || featuredImageUrl;
//               } catch (error) {
//                 console.error("Error fetching featured image:", error);
//               }
//             }
            
//             // Fetch icon image if exists
//             if (services.iconImageId) {
//               try {
//                 const iconResponse = await axios.get(
//                   `http://localhost:5300/Image/get/${services.iconImageId}`
//                 );
//                 iconImageUrl = iconResponse.data.Image?.image || iconImageUrl;
//               } catch (error) {
//                 console.error("Error fetching icon image:", error);
//               }
//             }
            
//             return {
//               id: services._id,
//               name: services.title,
//               Category: services.category,
//               description: services.text,
//               Date: new Date(services.updatedAt).toLocaleDateString(),
//               featuredImage: featuredImageUrl,
//               FeaturedImageId: services.FeaturedImage,
//               iconImage: iconImageUrl, // Now properly defined
//               iconImageId: services.iconImageId,
//               contentSections: services.contentSections || [],
//               tags: services.tags || [],
//               portfolioCategories: services.portfolioCategories || [],
//               updatedAt: services.updatedAt,
//             };
//           })
//         );
        
//         setTableData(ServicessWithImages);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleDelete = async (id, title, category) => {
//     try {
//       await axios.delete("http://localhost:5300/Services/delete", {
//         data: { title, category },
//       });
//       setTableData(prev => prev.filter(item => item.id !== id));
//       return true
//     } catch (error) {
//       console.error("Error deleting Service:", error);
//       throw error;
//     }
//   };

//   const handleBulkDelete = async (selectedIds) => {
//     const selectedItems = tableData.filter(item => selectedIds.includes(item.id));
//     const deleteData = {
//       titles: selectedItems.map(item => item.name),
//       categories: selectedItems.map(item => item.Category)
//     };

//     try {
//       await axios.delete("http://localhost:5300/Services/delete", { data: deleteData });
//       setTableData(prev => prev.filter(item => !selectedIds.includes(item.id)));
//       return true
//     } catch (error) {
//       console.error("Error in bulk delete:", error);
//       throw error; 
//     }
//   };

//   const handleEdit = (item) => {
//     navigate("/Dashboard/AddNewServices", { 
//       state: { 
//         Services: {
//           id: item.id,
//           title: item.name,
//           category: item.Category,
//           FeaturedImage: item.FeaturedImageId,
//           featuredImageUrl: item.featuredImage,
//           iconImage: item.iconImage, // Pass the iconImage URL
//           iconImageId: item.iconImageId,
//           contentSections: item.contentSections.map(section => ({
//             ...section,
//             imageUrl: section.imageId ? `http://localhost:5300/Image/get/${section.imageId}` : null
//           })),
//           text: item.description,
//           tags: item.tags || [], // Pass tags
//           portfolioCategories: item.portfolioCategories || [] // Pass portfolio categories
//         } 
//       } 
//     });
//   };
 

//   const columns = [
//     { key: "name", title: "Title" },
//     { key: "Category", title: "Category" },
//     { 
//       key: "featuredImage", 
//       title: "Featured Image",
//       render: (item) => (
//         <div className="w-16 h-16 overflow-hidden rounded">
//           <img
//             src={`http://localhost:5300${item.featuredImage}`}
//             alt="Featured"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       )
//     },
 
//     { key: "Date", title: "Date" }
//   ];

//   return (
//     <>
//       <PageBreadcrumb 
//         pageTitle="Services"
//         buttonText="Add New Service"
//         buttonLink="/Dashboard/AddNewServices" 
//       />
//       <GenericDataTable
//         data={tableData}
//         columns={columns}
//         onDelete={handleDelete}
//         onEdit={handleEdit}
//         onBulkDelete={handleBulkDelete}
//       />
//     </>
//   );
// }



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";;
import GenericDataTable from "../../components/GenericDataTable/GenericDataTable";
export default function Services() {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5300/Services/get");
        
        const ServicesWithFullData = await Promise.all(
          response.data.Services.map(async (service) => {
            // Fetch featured image
            let featuredImageUrl = "/images/user/user-22.jpg";
            if (service.FeaturedImage) {
              try {
                const imgResponse = await axios.get(
                  `http://localhost:5300/Image/get/${service.FeaturedImage}`
                );
                featuredImageUrl = imgResponse.data.Image?.image || featuredImageUrl;
              } catch (error) {
                console.error("Error fetching featured image:", error);
              }
            }
            
            // Fetch icon image
            let iconImageUrl = "/images/default-icon.png";
            if (service.iconImageId) {
              try {
                const iconResponse = await axios.get(
                  `http://localhost:5300/Image/get/${service.iconImageId}`
                );
                iconImageUrl = iconResponse.data.Image?.image || iconImageUrl;
              } catch (error) {
                console.error("Error fetching icon image:", error);
              }
            }
            
            // Fetch gallery images
            const galleryWithUrls = await Promise.all(
              service.gallery?.map(async (galleryItem) => {
                try {
                  const galleryResponse = await axios.get(
                    `http://localhost:5300/Image/get/${galleryItem.imageId}`
                  );
                  return {
                    ...galleryItem,
                    url: galleryResponse.data.Image?.image || null
                  };
                } catch (error) {
                  console.error("Error fetching gallery image:", error);
                  return {
                    ...galleryItem,
                    url: null
                  };
                }
              }) || []
            );
            
            // Fetch texttoimageandimagetotext images
            const textImageSections = await Promise.all(
              service.texttoimageandimagetotext?.map(async (section) => {
                let imageUrl = null;
                if (section.imageId) {
                  try {
                    const imgResponse = await axios.get(
                      `http://localhost:5300/Image/get/${section.imageId}`
                    );
                    imageUrl = imgResponse.data.Image?.image || null;
                  } catch (error) {
                    console.error("Error fetching section image:", error);
                  }
                }
                return {
                  ...section,
                  imageUrl
                };
              }) || []
            );
            
            return {
              id: service._id,
              title: service.title,
              name: service.title,
              Category: service.category,
              slug: service.Slug,
              description: service.description,
              Servicesquote:service.Servicesquote,
              category: service.category,
              tags: service.tags || [],
              featuredImage: featuredImageUrl,
              FeaturedImageId: service.FeaturedImage,
              iconImage: iconImageUrl,
              iconImageId: service.iconImageId,
              Bannerdata: service.Bannerdata || [],
              WhydoNeed: service.WhydoNeed || [],
              WhyAtrix: service.WhyAtrix || [],
              Process: service.Process || [],
              Headercontent: service.Headercontent || [],
              gallery: galleryWithUrls,
              texttoimageandimagetotext: textImageSections,
              portfolioCategories: service.portfolioCategories || [],
              faqCategories: service.faqCategories || [],
              Technology: service.Technology || [],
              Cta: service.Cta || {},
              updatedAt: service.updatedAt,
              Date: new Date(service.updatedAt).toLocaleDateString(),
            };
          })
        );
        
        setTableData(ServicesWithFullData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id, title, category) => {
    try {
      await axios.delete("http://localhost:5300/Services/delete", {
        data: { title, category },
      });
      setTableData(prev => prev.filter(item => item.id !== id));
      return true
    } catch (error) {
      console.error("Error deleting Service:", error);
      throw error;
    }
  };

  const handleBulkDelete = async (selectedIds) => {
    const selectedItems = tableData.filter(item => selectedIds.includes(item.id));
    const deleteData = {
      titles: selectedItems.map(item => item.name),
      categories: selectedItems.map(item => item.Category)
    };

    try {
      await axios.delete("http://localhost:5300/Services/delete", { data: deleteData });
      setTableData(prev => prev.filter(item => !selectedIds.includes(item.id)));
      return true
    } catch (error) {
      console.error("Error in bulk delete:", error);
      throw error; 
    }
  };

  const handleEdit = (item) => {
  navigate("/Dashboard/AddNewServices", { 
    state: { 
      Services: {
        id: item.id,
        title: item.title,
        Slug: item.slug,
        description: item.description,
        Servicesquote:item.Servicesquote,
        category: item.category,
        tags: item.tags,
        FeaturedImage: item.FeaturedImageId,
        featuredImageUrl: item.featuredImage,
        iconImageId: item.iconImageId,
        iconImageUrl: item.iconImage,
        Bannerdata: item.Bannerdata,
        WhydoNeed: item.WhydoNeed,
        WhyAtrix: item.WhyAtrix,
        Process: item.Process,
        Headercontent: item.Headercontent || [{
          centerHeading: "",
          centerDescription: "",
          headingAnddescription: []
        }],
        gallery: item.gallery,
        texttoimageandimagetotext: item.texttoimageandimagetotext,
        portfolioCategories: item.portfolioCategories,
        faqCategories: item.faqCategories,
        Technology: item.Technology,
        Cta: item.Cta,
      } 
    } 
  });
};
 

  const columns = [
    { key: "title", title: "Title" },
    { key: "category", title: "Category" },
    { 
      key: "featuredImage", 
      title: "Featured Image",
      render: (item) => (
        <div className="w-16 h-16 overflow-hidden rounded">
          <img
            src={`http://localhost:5300${item.featuredImage}`}
            alt="Featured"
            className="w-full h-full object-contain"
          />
        </div>
      )
    },
 
    { key: "Date", title: "Date" }
  ];

  return (
    <>
      <PageBreadcrumb 
        pageTitle="Services"
        buttonText="Add New Service"
        buttonLink="/Dashboard/AddNewServices" 
      />
      <GenericDataTable
        data={tableData}
        columns={columns}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onBulkDelete={handleBulkDelete}
      />
    </>
  );
}