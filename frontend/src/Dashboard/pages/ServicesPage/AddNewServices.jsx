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
import SelectBulk from "../../components/form/SelectBulk";
import JoditEditor from 'jodit-react';
import SelectFileInput from "../../components/form/form-elements/SelectFileInput";
import TagsInput from "../../components/form/TagsInput";
import IconsInputExample from "../../components/form/form-elements/IconsInputExample";
import Banner from "../../components/Services/Banner";
import WhydoNeed from "../../components/Services/WhydoNeed";
import WhyAtrix from "../../components/Services/WhyAtrix";
import Process from "../../components/Services/Process";
import MoreContent from "../../components/Services/MoreContent";
import GalleryComp from "../../components/Gallery/GalleryComp";
// import Headercontent from "../../components/Services/Headercontent";
import TextToImageAndImageToText from "../../components/Services/TextToImageAndImageToText";
import HeaderContent from "../../components/Services/HeaderContent";

export default function AddNewServices() {
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState({
    services: [],
    portfolio: [],
    faq: []
  });

  const { fetchCategoryCounts } = useContext(ServicesCategoryContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    Servicesquote: "",
    text: "",
    selectedCategories: [],
    selectedPortfolioCategories: [],
    selectedfaqCategories: [],
    tags: [],
    iconImageId: null,
    imageId: null,
    Bannerdata: [],
    WhydoNeed: [],
    WhyAtrix: [],
    Process: [],
    Headercontent: [],
    gallery: [],
    textToImage: {
      leftText: "",
      rightImage: null, // Will hold image ID
      rightText: "",
      leftImage: null   // Will hold image ID
    },
    showHeadercontent: false,
    showGallery: false,
    showTextToImage: false,
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
        description: Services.description || "",
        Servicesquote: Services.Servicesquote || "",
        selectedCategories: Services.category ? Services.category.split(", ") : [],
        selectedPortfolioCategories: Services.portfolioCategories
          ? Services.portfolioCategories.split(", ")
          : [],
        selectedfaqCategories: Services.faqCategories
          ? Services.faqCategories.split(", ")
          : [],
        tags: Services.tags || [],
        iconImageId: Services.iconImageId || null,
        imageId: Services.FeaturedImage || null,
        Bannerdata: Services.Bannerdata || [],
        WhydoNeed: Services.WhydoNeed || [],
        WhyAtrix: Services.WhyAtrix || [],
        Process: Services.Process || [],
        Headercontent: Services.Headercontent || [],
        gallery: Services.gallery || [],
        textToImage: Services.texttoimageandimagetotext ? {
          leftText: Services.texttoimageandimagetotext.lefttext || "",
          rightImage: Services.texttoimageandimagetotext.rightimageId || null,
          rightText: Services.texttoimageandimagetotext.righttext || "",
          leftImage: Services.texttoimageandimagetotext.leftimageId || null
        } : {
          leftText: "",
          rightImage: null,
          rightText: "",
          leftImage: null
        }
      });


    }
  }, [Services]);

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
      Headercontent,
      gallery,
      textToImage
    } = formData;

    if (!title || !description || selectedCategories.length === 0 || !imageId) {
      alert("Title, description, at least one category, and featured image are required!");
      return;
    }

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

    const textToImageData = {
      lefttext: formData.textToImage.leftText,
      rightimageId: formData.textToImage.rightImage, // Image ID
      righttext: formData.textToImage.rightText,
      leftimageId: formData.textToImage.leftImage    // Image ID
    };

    const ServicesData = {
      title,
      description,
      Servicesquote: formData.Servicesquote || "",
      category: selectedCategories.join(", "),
      portfolioCategories: formData.selectedPortfolioCategories,
      faqCategories: formData.selectedfaqCategories,
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
            imageId: item.imageId // Directly use imageId
        }))
    }] : [],

      gallery: formData.gallery.map(img => ({ imageId: img.imageId })),

      texttoimageandimagetotext: textToImageData
    };
    // console.log("Headercontent", Headercontent)


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
      console.error("Error saving Services:", error);
      alert(error.response?.data?.message || "Error saving Services. Please try again.");
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
    setFormData(prev => ({ ...prev, Banner: bannerData }));
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

  const [galleryImages, setGalleryImages] = useState([]);

  const handleImageUpload = (images) => {
    setGalleryImages(images);
  };
  const handleHeadercontentChange = (content) => {
    // console.log("content received:", content);

    setFormData(prev => ({ ...prev, Headercontent: content }));
  };

  const handleGalleryChange = (images) => {
    // console.log("Gallery images received:", images);
    setFormData(prev => ({ ...prev, gallery: images }));
  };

  const handleTextToImageChange = useCallback((data) => {
    setFormData(prev => ({
      ...prev,
      textToImage: {
        leftText: data.lefttext || "",
        rightImage: data.rightimageId || null,
        rightText: data.righttext || "",
        leftImage: data.leftimageId || null
      }
    }));

  }, []);





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
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div>
            <Label htmlFor="input">Header</Label>


            <Banner onChange={handleBannerChange} initialData={Services?.Banner} />
          </div>



          <div>
            <Label htmlFor={`Servicesquote-${formData.id}`}>Services quote</Label>
            <TextArea
              type="text"
              id={`Servicesquote-${formData.id}`}
              placeholder="Services quote"
              value={formData.Servicesquote}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, Servicesquote: value }))
              }
            />
          </div>


          <div>
            <Label>Why do you need</Label>
            <WhydoNeed onChange={handleWhyDoNeedChange} initialData={Services?.WhydoNeed} />
          </div>

          <div>
            <Label>Why Atrix</Label>
            <WhyAtrix onChange={handleWhyAtrixChange} initialData={Services?.WhyAtrix} />
          </div>

          <div>
            <Process onChange={handleProcessChange} initialData={Services?.Process} />
          </div>

          {formData.showHeadercontent && (
            <div>
              <HeaderContent
                onChange={handleHeadercontentChange}
                initialData={formData.Headercontent}
              />
            </div>
          )}

          {formData.showGallery && (
            <div>
              <GalleryComp
                selected="Set Images"
                onImageUpload={handleGalleryChange}
                existingImages={formData.gallery}
                NameOffield="Gallery"
              />
            </div>
          )}

          {formData.showTextToImage && (
            <div>
              <TextToImageAndImageToText
                onChange={handleTextToImageChange}
                initialData={formData.textToImage}
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
              onChange={() =>
                setFormData(prev => ({
                  ...prev,
                  showHeadercontent: !prev.showHeadercontent
                }))
              }
            />

            <Checkbox
              id="toggle-gallery"
              label="Show Gallery"
              checked={formData.showGallery}
              onChange={() =>
                setFormData(prev => ({
                  ...prev,
                  showGallery: !prev.showGallery
                }))
              }
            />

            <Checkbox
              id="toggle-text-to-image"
              label="Show Text-to-Image & Image-to-Text"
              checked={formData.showTextToImage}
              onChange={() =>
                setFormData(prev => ({
                  ...prev,
                  showTextToImage: !prev.showTextToImage
                }))
              }
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
            <ComponentCategory title="Portfolio Category" link="/Dashboard/CategoryPortfolio">
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
            <ComponentCategory title="FAQ Category" link="/Dashboard/CategoryFAQ">
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


        </div>


      </div>
    </div>
  );
}