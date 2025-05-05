import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OutLet } from './OutLet/OutLet';

import Home from './Pages/Home';
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';
import Careers from './Pages/Careers';
import Faqs from './Pages/faqs';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsAndConditions from './Pages/TermsAndConditions';
import BlogUS from './Pages/BlogUS';
import BlogContant from './Components/BlogContant';
import Portfolio_page from './Pages/Portfolio';
import PortfolioSingle from './Pages/PortfolioSingle';
import OurServices from './Pages/OurServices';
import Behance from './Components/Behanceshowpost/Behance';
import Service from './Pages/Service';
import ServiceBackend from './Components/FetchBackendServices/ServiceBackend';


import ProtectedRoute from './Dashboard/ProtectedRoutePage';
import AppLayout from "./Dashboard/layout/AppLayout";
import DashboardHome from "./Dashboard/pages/DashboardHome/HomePage";
import Technology from "./Dashboard/pages/TechnologyPage/Technology";
import NewAddTechnology from "./Dashboard/pages/TechnologyPage/NewAddTechnology";
import CategoryTechnology from "./Dashboard/pages/TechnologyPage/categoryTechnology";
import Blog from './Dashboard/pages/BlogPage/Blog';
import AddNewBlog from './Dashboard/pages/BlogPage/AddNewBlog';
import CategoryBlog from './Dashboard/pages/BlogPage/CategoryBlog';
import Portfolio from './Dashboard/pages/Portfolio/Portfolio';
import AddNewPortfolio from './Dashboard/pages/Portfolio/AddNewPortfolio';
import CategoryPortfolio from './Dashboard/pages/Portfolio/CategoryPortfolio';
import AddNewBrand from './Dashboard/pages/BrandPage/AddNewBrand';
import Brand from './Dashboard/pages/BrandPage/Brand';
import Services from './Dashboard/pages/ServicesPage/Services';
import AddNewServices from './Dashboard/pages/ServicesPage/AddNewServices';
import CategoryServices from './Dashboard/pages/ServicesPage/CategoryServices';
import FAQ from './Dashboard/pages/FAQPages/FAQ';
import AddNewFAQ from './Dashboard/pages/FAQPages/AddNewFAQ';
import FAQCategory from './Dashboard/pages/FAQPages/CategoryFAQ';
import SelectField from './Dashboard/components/SelectFieldComp/SelectField';
import SignInForm from './Dashboard/components/auth/SignInForm';
import NotFound from './Components/NotFound'; // Standalone 404 Page



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES WITH OUTLET */}
        <Route path="/" element={<OutLet />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/Blog" element={<BlogUS />} />
          <Route path="/blog/:id" element={<BlogContant />} />
          <Route path="/portfolio" element={<Portfolio_page />} />
          <Route path="/portfolio/:project_id" element={<PortfolioSingle />} />
          <Route path="/services" element={<OurServices />} />
          <Route path="/Behance" element={<Behance />} />
          <Route path="/Service" element={<Service />} />
          <Route path="/service/:service_id" element={<Service />} />
          <Route path="/ServiceBackend" element={<ServiceBackend />} />
        </Route>       


        {/* DASHBOARD PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/Dashboard" element={<DashboardHome />} />
            <Route path="/Dashboard/Technology" element={<Technology />} />
            <Route path="/Dashboard/AddNewTechnology" element={<NewAddTechnology />} />
            <Route path="/Dashboard/CategoryTechnology" element={<CategoryTechnology />} />
            <Route path="/Dashboard/Blog" element={<Blog />} />
            <Route path="/Dashboard/AddNewBlog" element={<AddNewBlog />} />
            <Route path="/Dashboard/CategoryBlog" element={<CategoryBlog />} />
            <Route path="/Dashboard/Portfolio" element={<Portfolio />} />
            <Route path="/Dashboard/AddNewPortfolio" element={<AddNewPortfolio />} />
            <Route path="/Dashboard/CategoryPortfolio" element={<CategoryPortfolio />} />
            <Route path="/Dashboard/Brand" element={<Brand />} />
            <Route path="/Dashboard/AddNewBrand" element={<AddNewBrand />} />
            <Route path="/Dashboard/Services" element={<Services />} />
            <Route path="/Dashboard/AddNewServices" element={<AddNewServices />} />
            <Route path="/Dashboard/CategoryServices" element={<CategoryServices />} />
            <Route path="/Dashboard/FAQ" element={<FAQ />} />
            <Route path="/Dashboard/AddNewFAQ" element={<AddNewFAQ />} />
            <Route path="/Dashboard/CategoryFAQ" element={<FAQCategory />} />
            <Route path="/Dashboard/Demo" element={<SelectField />} />
          </Route>
        </Route>
        {/* LOGIN PAGE */}
        <Route path="/AISLogin" element={<SignInForm />} />

        {/* Error 404  */}
        <Route path="*" element={<NotFound />} />
        <Route path="/page-not-found" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
