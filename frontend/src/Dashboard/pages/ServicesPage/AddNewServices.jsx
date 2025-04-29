import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FileInputExample from "../../components/form/form-elements/FileInputExample";
import Button from "../../components/ui/button/Button";
import Checkbox from "../../components/form/input/Checkbox";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import ComponentCategory from "../../components/common/ComponentCategoryCard";
import { ImageProvider } from "../../ContextApi/ImageApi";
import axios from "axios";
import TextArea from "../../components/form/input/TextArea";
import { ServicesCategoryContext } from "../../ContextApi/ServicesCategoryContextApi";
import TagsInput from "../../components/form/TagsInput";
import IconsInputExample from "../../components/form/form-elements/IconsInputExample";
import Banner from "../../components/Services/Banner";
import WhydoNeed from "../../components/Services/WhydoNeed";
import WhyAtrix from "../../components/Services/WhyAtrix";
import Process from "../../components/Services/Process";
import GalleryComp from "../../components/Gallery/GalleryComp";
import TextToImageAndImageToText from "../../components/Services/TextToImageAndImageToText";
import HeaderContent from "../../components/Services/HeaderContent";
import CtaDashboard from "../../components/Services/CtaDashboard";

export default function AddNewServices() {
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState({
    services: [],
    portfolio: [],
    faq: [],
    technology: []
  });

  const { fetchCategoryCounts } = useContext(ServicesCategoryContext);

  const [formData, setFormData] = useState({
    title: "",
    customSlug: "",
    autoSlug: "",
    isEditingSlug: false,
    description: "",
    Servicesquote: "",
    text: "",
    selectedCategories: [],
    selectedPortfolioCategories: [],
    selectedfaqCategories: [],
    selectedtechnology: [],
    tags: [],
    iconImageId: null,
    imageId: null,
    Bannerdata: [],
    WhydoNeed: [],
    WhyAtrix: [],
    Process: [],
    Headercontent: [],
    Cta: { title: "", description: "" },
    gallery: [],
    texttoimageandimagetotext: [],
    showHeadercontent: false,
    showGallery: false,
    showTextToImage: true,
  });

  const { Services } = location.state || {};

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5300/ServicesCategory/Services/category/get");
        setCategories(prev => ({ ...prev, services: response.data.categories }));
      } catch (error) {
        console.error("Error fetching services categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5300/PortfolioCategory/Portfolio/category/get");
        setCategories(prev => ({ ...prev, portfolio: response.data.categories }));
      } catch (error) {
        console.error("Error fetching portfolio categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5300/FAQCategory/FAQ/category/get");
        setCategories(prev => ({ ...prev, faq: response.data.categories }));
      } catch (error) {
        console.error("Error fetching FAQ categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (Services) {
      setFormData({
        title: Services.title,
        // customSlug: Services.slug || Services.title.toLowerCase().replace(/\s+/g, '-'),
        customSlug: Services.slug || Services.Slug || generatedFromTitle,
        autoSlug: Services.title.toLowerCase().replace(/\s+/g, '-'),
        description: Services.description || "",
        Servicesquote: Services.Servicesquote || "",
        selectedCategories: Services.category ? Services.category.split(", ") : [],
        selectedPortfolioCategories: Array.isArray(Services.portfolioCategories)
          ? Services.portfolioCategories // If it's an array, use it directly
          : Services.portfolioCategories
            ? Services.portfolioCategories.split(", ") // If it's a string, split it
            : [],
        selectedfaqCategories: Array.isArray(Services.faqCategories)
          ? Services.faqCategories // If it's an array, use it directly
          : Services.faqCategories
            ? Services.faqCategories.split(", ") // If it's a string, split it
            : [],

        // selectedfaqCategories: Services.faqCategories? Services.faqCategories.split(", ")
        //   : [],
        // selectedtechnology: Services.Technology
        //   ? Services.Technology.map((tech) => tech.title)
        //   : [],
        selectedtechnology: Services.Technology
          ? Services.Technology.map(tech => ({
            _id: tech._id,
            title: tech.title,
            imageId: tech.imageId,
            // Make sure these match the structure of categories.technology
            Name: tech.title, // Add this if it's missing
            team: {
              images: [tech.image?.image || "/images/user/user-22.jpg"]
            }
          }))
          : [],

        tags: Services.tags || [],
        iconImageId: Services.iconImageId || null,
        imageId: Services.FeaturedImage || null,

        Banner: Services?.Banner || [], // Proper initialization
        Bannerdata: Services?.Bannerdata || [], // Consistent naming
        // Bannerdata: Services.Bannerdata || [],
        // texttoimageandimagetotext: Services.texttoimageandimagetotext || [],
        WhydoNeed: Services.WhydoNeed || [],
        WhyAtrix: Services.WhyAtrix || [],
        Process: Services.Process || [],
        Headercontent: Services.Headercontent || [],
        gallery: Services.gallery || [],
        Cta: Services.Cta || { title: "", description: "" },
        showHeadercontent: Services?.Headercontent?.length > 0,
      showGallery: Services?.gallery?.length > 0,
      showTextToImage: Services?.texttoimageandimagetotext?.length > 0,
      });


    }
  }, [Services]);
  const headerContentRef = useRef(null);
const galleryRef = useRef(null);
const textToImageRef = useRef(null);


  useEffect(() => {
    if (Services) {
      const mappedFields = (Services.texttoimageandimagetotext || []).map((item, index) => ({
        id: index + 1,
        value: {
          value: item.type,
          label: item.type === "texttoimage" ? "TexttoImage" : "ImagetoText"
        },
        textContent: item.text,
        imageFile: item.imageId ? {
          id: item.imageId,
          url: `/Image/${item.imageId}`,
          type: item.type,
          name: "Uploaded image"
        } : null,
        options: [
          { value: "", label: "Select Option" },
          { value: "texttoimage", label: "TexttoImage" },
          { value: "imagetotext", label: "ImagetoText" },
        ]
      }));

      setFormData(prev => ({
        ...prev,
        texttoimageandimagetotext: mappedFields
      }));
    }
  }, [Services]);


  useEffect(() => {
    if (Services) {
      setFormData(prev => {
        // Find matching tech in categories.technology by name
        const mapTech = (tech) => {
          const found = categories.technology.find(
            catTech => catTech.Name === tech.title || catTech._id === tech._id
          );
          return found || {
            _id: tech._id,
            title: tech.title,
            imageId: tech.imageId,
            Name: tech.title,
            team: {
              images: [tech.image?.image || "/images/user/user-22.jpg"]
            }
          };
        };
  
        return {
          ...prev,
          title: Services.title,
          customSlug: Services.slug || Services.Slug || generatedFromTitle,
          // ... other fields
          selectedtechnology: Services.Technology
            ? Services.Technology.map(mapTech)
            : [],
          // ... rest of your form data
        };
      });
    }
  }, [Services, categories.technology]);

  useEffect(() => {
    if (formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '-')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '-')
        .replace(/-+$/, '-');

      setFormData((prev) => ({
        ...prev,
        autoSlug: generatedSlug,
        customSlug: prev.isEditingSlug ? prev.customSlug : generatedSlug
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        autoSlug: '',
        customSlug: '',
      }));
    }
  }, [formData.title]);


  const handleCategoryChange = (category) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((cat) => cat !== category)
        : [...prev.selectedCategories, category],
    }));
  };

  const handleSubmit = async () => {
    const {
      title,
      description,
      selectedCategories,
      tags,
      iconImageId,
      imageId,
      WhydoNeed,
      WhyAtrix,
      Process,
      customSlug,
      Cta,
    
    } = formData;

    if (!title || !description || selectedCategories.length === 0 || !imageId) {
      alert("Title, description, at least one category, and featured image are required!");
      return;
    }

    const transformTextToImageData = (fields) => {
      return fields
        .filter(field => field?.value?.value) // Only include fields with a type
        .map(field => ({
          type: field.value.value, // Ensure type is always set
          text: field.textContent || "",
          imageId: field.imageFile?.id || null
        }));
    };
    const bannerData = formData.Banner.map(item => {
      if (item.type === "slider") {
        return {
          type: "slider",
          sliderImages: item.sliderImages
            .filter(img => img)
            .slice(0, 4)
        };
      }
      return {
        type: item.type,
        imageId: item.imageId
      };
    }).filter(item => {
      if (item.type === "slider") {
        return item.sliderImages.length > 0;
      }
      return item.imageId;
    });



    const ServicesData = {
      title,
      Slug: customSlug,
      description,
      Servicesquote: formData.Servicesquote || "",
      category: selectedCategories.join(", "),
      portfolioCategories: formData.selectedPortfolioCategories,
      faqCategories: formData.selectedfaqCategories,
      Technology: formData.selectedtechnology.map(tech => ({
        _id: tech._id, // Ensure this matches your backend expectation
        title: tech.Name || tech.title || "",
        imageId: tech.imageId || null
      })),

      tags: tags.filter(tag => tag.trim() !== ""),
      iconImageId,
      FeaturedImageId: imageId,
      Bannerdata: bannerData,
      WhydoNeed,
      WhyAtrix,
      Process,
      Headercontent: formData.Headercontent.length > 0 ? [{
        centerHeading: formData.Headercontent[0].centerHeading,
        centerDescription: formData.Headercontent[0].centerDescription,
        headingAnddescription: formData.Headercontent[0].headingAnddescription.map(item => ({
          heading: item.heading,
          description: item.description,
          imageId: item.imageId
        }))
      }] : [],
      texttoimageandimagetotext: transformTextToImageData(formData.texttoimageandimagetotext),

      gallery: formData.gallery.map(img => ({ imageId: img.imageId })),
      Cta, // Ensure it's always an object

    };


    try {
      if (Services) {
        await axios.put(`http://localhost:5300/Services/edit`, {
          id: Services.id,
          ...ServicesData
        });
      } else {
        await axios.post("http://localhost:5300/Services/add", ServicesData);
      }

      await fetchCategoryCounts();
      navigate("/Dashboard/Services");
    } catch (error) {
  console.error("Full error object:", error);
  if (error.response) {
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
    console.error("Response headers:", error.response.headers);
  } else if (error.request) {
    console.error("Request:", error.request);
  } else {
    console.error("Error message:", error.message);
  }
  alert(error.response?.data?.message || "Error saving Services. Please check console for details.");
}
  };

  const handleTagsChange = (newTags) => {
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const handlePortfolioCategoryChange = (category) => {
    setFormData(prev => ({
      ...prev,
      selectedPortfolioCategories: prev.selectedPortfolioCategories.includes(category)
        ? prev.selectedPortfolioCategories.filter(cat => cat !== category)
        : [...prev.selectedPortfolioCategories, category]
    }));
  };
  const handlefaqCategoryChange = (category) => {
    setFormData(prev => ({
      ...prev,
      selectedfaqCategories: prev.selectedfaqCategories.includes(category)
        ? prev.selectedfaqCategories.filter(cat => cat !== category)
        : [...prev.selectedfaqCategories, category]
    }));
  };



  const handleBannerChange = (bannerData) => {
    setFormData(prev => ({ ...prev, Banner: bannerData || [] }));
  };

  const handleWhyDoNeedChange = (whyData) => {
    setFormData(prev => ({ ...prev, WhydoNeed: whyData }));
  };

  const handleWhyAtrixChange = (atrixData) => {
    setFormData(prev => ({ ...prev, WhyAtrix: atrixData }));
  };

  const handleProcessChange = (processData) => {
    setFormData(prev => ({ ...prev, Process: processData }));
  };

  const handleTextToImageChange = useCallback((data) => {
    setFormData(prev => ({
      ...prev,
      texttoimageandimagetotext: data
    }));
  }, []);
  const handleHeadercontentChange = (content) => {
    // console.log("content received:", content);

    setFormData(prev => ({ ...prev, Headercontent: content }));
  };
  const handleCtaChange = useCallback((data) => {
    setFormData(prev => ({ ...prev, Cta: data }));
  }, []);

  const handleGalleryChange = (images) => {
    // console.log("Gallery images received:", images);
    setFormData(prev => ({ ...prev, gallery: images }));
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5300/Technology/get");
        const Technologys = response.data.Technology.map((tech) => {
          const imageUrl = tech.image?.image
            ? tech.image.image
            : "/images/user/user-22.jpg";
          return {
            _id: tech._id,
            Name: tech.title,
            team: {
              images: [imageUrl],
            },
            imageId: tech.image?._id,
          };
        });
        setCategories(prev => ({
          ...prev,
          technology: Technologys
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);



  const handletechnologysChange = (technology) => {
    setFormData(prev => {
      const isSelected = prev.selectedtechnology.some(
        selectedTech => selectedTech._id === technology._id
      );
      
      return {
        ...prev,
        selectedtechnology: isSelected
          ? prev.selectedtechnology.filter(t => t._id !== technology._id)
          : [...prev.selectedtechnology, {
              _id: technology._id,
              title: technology.Name || technology.title,
              imageId: technology.imageId
            }]
      };
    });
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white/90">
          {Services ? "Edit Services" : "Add New Services"}
        </h1>
        <div>
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer"
            onClick={handleSubmit}
          >
            {Services ? "Update" : "Publish"}
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
              value={formData.title || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />


            <div className="mt-2">

              <div className="mt-2">
                {formData.isEditingSlug ? (
                  <div className="items-center gap-2 space-y-1">
                    <Input
                      type="text"
                      value={formData.customSlug}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, customSlug: e.target.value }))
                      }
                      className="w-full"
                    />
                    <button
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          isEditingSlug: false,
                          autoSlug: prev.customSlug.trim()
                        }))
                      }
                      className="w-16 bg-(--blue) text-white p-1 rounded-lg"
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-(--gray)">
                      Slug: {formData.customSlug}
                    </p>
                    {formData.title && (
                      <button
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, isEditingSlug: true }))
                        }
                        className="w-16 bg-(--blue) text-white p-1 rounded-lg"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>

          <div>
            <Label htmlFor="input">Header</Label>


            <Banner onChange={handleBannerChange} initialData={formData.Bannerdata || ""} />

          </div>

          {formData.showTextToImage && (
          <div ref={textToImageRef}>
            <TextToImageAndImageToText
              onChange={handleTextToImageChange}
              initialData={formData.texttoimageandimagetotext || ""}
            />
          </div>
           )} 

          {formData.showHeadercontent && (
             <div ref={headerContentRef}>
              <HeaderContent
                onChange={handleHeadercontentChange}
                initialData={formData.Headercontent || ""}
              />
            </div>
          )}



          <div>
            <Label>Why do you need</Label>
            <WhydoNeed onChange={handleWhyDoNeedChange} initialData={Services?.WhydoNeed || ""} />
          </div>

          <div>
            <Label>Why Atrix</Label>
            <WhyAtrix onChange={handleWhyAtrixChange} initialData={Services?.WhyAtrix || ""} />
          </div>

          <div>
            <Process onChange={handleProcessChange} initialData={Services?.Process || ""} />
          </div>

          <div>
            <Label htmlFor={`Servicesquote-${formData.id}`}>Services quote</Label>
            <TextArea
              type="text"
              id={`Servicesquote-${formData.id}`}
              placeholder="Services quote"
              value={formData.Servicesquote || ""}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, Servicesquote: value }))
              }
            />
          </div>

          <div>
            <CtaDashboard

              onChange={handleCtaChange} initialData={Services?.Cta || ""}
            />

          </div>
          {formData.showGallery && (
              <div ref={galleryRef}>
              <GalleryComp
                selected="Set Images"
                onImageUpload={handleGalleryChange}
                existingImages={formData.gallery || ""}
                NameOffield="Gallery"
              />
            </div>
          )}





        </div>

        <div className="space-y-6">
          <div className="space-y-4">
          <Checkbox
  id="toggle-header-content"
  label="Show Header Content"
  checked={formData.showHeadercontent}
  onChange={() => {
    setFormData(prev => {
      const newValue = !prev.showHeadercontent;
      setTimeout(() => {
        if (newValue && headerContentRef.current) {
          headerContentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Delay to ensure UI update

      return { ...prev, showHeadercontent: newValue };
    });
  }}
/>

<Checkbox
  id="toggle-gallery"
  label="Show Gallery"
  checked={formData.showGallery}
  onChange={() => {
    setFormData(prev => {
      const newValue = !prev.showGallery;
      setTimeout(() => {
        if (newValue && galleryRef.current) {
          galleryRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return { ...prev, showGallery: newValue };
    });
  }}
/>


            <Checkbox
              id="toggle-text-to-image"
              label="Show Text-to-Image & Image-to-Text"
              checked={formData.showTextToImage}
              onChange={() => {
                setFormData(prev => {
                  const newValue = !prev.showTextToImage;
                  setTimeout(() => {
                    if (newValue && textToImageRef.current) {
                      textToImageRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                  return { ...prev, showTextToImage: newValue };
                });
              }}
            />
          </div>



          <div>
            <Label htmlFor={`description-${formData.id}`}>Excerpt</Label>
            <TextArea
              type="text"
              id={`description-${formData.id}`}
              placeholder="Excerpt"
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
            />
          </div>
          <div>
            <TagsInput
              initialTags={formData.tags}
              onChange={handleTagsChange}
            />
          </div>
          <div>
            <ComponentCategory title="Category" link="/Dashboard/CategoryServices">
              <div className="items-center gap-4 space-y-5">
                {categories.services.map((category) => (
                  <div key={category._id} className="flex items-center gap-3">
                    <Checkbox
                      id={`category-${category._id}`}
                      checked={formData.selectedCategories?.includes(category.Name) || false}
                      onChange={() => handleCategoryChange(category.Name)}
                      label={category.Name}
                    />
                  </div>
                ))}
              </div>
            </ComponentCategory>
          </div>
          <ImageProvider>
            <IconsInputExample
              onImageUpload={(imageId) =>
                setFormData(prev => ({ ...prev, iconImageId: imageId }))
              }
              imageId={formData.iconImageId}
            />
          </ImageProvider>


          <ImageProvider>
            <FileInputExample
              onImageUpload={(imageId) =>
                setFormData(prev => ({ ...prev, imageId }))
              }
              imageId={Services?.imageId || Services?.FeaturedImage}
            />
          </ImageProvider>

          <div>
            <ComponentCategory title="Portfolio Category" >
              <div className="items-center gap-4 space-y-5">
                {categories.portfolio.map((category) => (
                  <div key={category._id} className="flex items-center gap-3">
                    <Checkbox
                      id={`portfolio-category-${category._id}`}
                      checked={formData.selectedPortfolioCategories.includes(category.Name)}
                      onChange={() => handlePortfolioCategoryChange(category.Name)}
                      label={category.Name}
                    />
                  </div>
                ))}
              </div>
            </ComponentCategory>
          </div>



          <div>
            <ComponentCategory title="FAQ Category">
              <div className="items-center gap-4 space-y-5">
                {categories.faq.map((category) => (
                  <div key={category._id} className="flex items-center gap-3">
                    <Checkbox
                      id={`faq-category-${category._id}`}
                      checked={formData.selectedfaqCategories.includes(category.Name)}
                      onChange={() => handlefaqCategoryChange(category.Name)}
                      label={category.Name}
                    />
                  </div>
                ))}
              </div>
            </ComponentCategory>
          </div>


          <div>
  <ComponentCategory title="Technology">
    <div className="items-center gap-4 space-y-5">
      {categories.technology.map((tech) => {
        const isSelected = formData.selectedtechnology.some(
          selectedTech => selectedTech._id === tech._id
        );

        return (
          <div key={tech._id} className="flex items-center justify-between">
            <Checkbox
              id={`tech-${tech._id}`}
              checked={isSelected}
              onChange={() => handletechnologysChange(tech)}
              label={tech.Name}
            />
            <img
              src={`http://localhost:5300${tech.team?.images?.[0]}`}
              alt={tech.Name}
              className="w-12 object-contain rounded-xs"
            />
          </div>
        );
      })}
    </div>
  </ComponentCategory>
</div>

        </div>


      </div>
    </div>
  );
}



{/* <ComponentCategory title="Technology">
  <div className="items-center gap-4 space-y-5">
    {categories.technology.map((tech) => {
      const isSelected = formData.selectedtechnology.some(
  selectedTech => selectedTech.title === tech.Name
);

      
      return (
        <div key={tech._id} className="flex items-center justify-between">
          <Checkbox
            id={`tech-${tech._id}`}
            checked={isSelected}
            onChange={() => handletechnologysChange(tech)}
            label={tech.Name || tech.title}
          />
          <img
            src={`http://localhost:5300${tech.team?.images?.[0]}`}
            alt={tech.Name || tech.title}
            className="w-12 object-contain rounded-xs"
          />
        </div>
      );
    })}
  </div>
</ComponentCategory> */}