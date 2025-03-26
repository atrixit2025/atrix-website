import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OutLet } from './OutLet/OutLet';
import Home from './Pages/Home';
import About from './Pages/About';

import AppLayout from "./Dashboard/layout/AppLayout"
import DashboardHome from "./Dashboard/pages/DashboardHome/HomePage";
import Technology from "./Dashboard/pages/TechnologyPage/Technology"
import NewAddTechnology from "./Dashboard/pages/TechnologyPage/NewAddTechnology";
import CategoryTechnology from "./Dashboard/pages/TechnologyPage/categoryTechnology";


// import SignInForm from "./Dashboard/components/auth/SignInForm"
import ContactUs from './Pages/ContactUs';
import Blog from './Dashboard/pages/BlogPage/Blog';
import AddNewBlog from './Dashboard/pages/BlogPage/AddNewBlog';
import CategoryBlog from './Dashboard/pages/BlogPage/CategoryBlog';
import SignInForm from './Dashboard/components/auth/SignInForm';
import ProtectedRoute from './Dashboard/ProtectedRoutePage';
import Portfolio from './Dashboard/pages/Portfolio/Portfolio';
import AddNewPortfolio from './Dashboard/pages/Portfolio/AddNewPortfolio';
import CategoryPortfolio from './Dashboard/pages/Portfolio/CategoryPortfolio';
import Careers from './Pages/Careers';
import LogoMarquee from './Dashboard/pages/BrandPage/Brand';
import AddNewLogoMarquee from './Dashboard/pages/BrandPage/AddNewBrand';
import AddNewBrand from './Dashboard/pages/BrandPage/AddNewBrand';
import Brand from './Dashboard/pages/BrandPage/Brand';
// import Careers from './Pages/careers';
import Faqs from './Pages/faqs';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsAndConditions from './Pages/TermsAndConditions';

import Services from './Dashboard/pages/ServicesPage/Services';

import BlogUS from './Pages/BlogUS';
import BlogContant from './Components/BlogContant';
import Portfolio_page from './Pages/Portfolio';
import AddNewServices from './Dashboard/pages/ServicesPage/AddNewServices';
import CategoryServices from './Dashboard/pages/ServicesPage/CategoryServices';
import Demo from './Dashboard/pages/BlogPage/demo';


export default function App() {
  return (

    <BrowserRouter>

      <Routes>
        <Route path="/" element={<OutLet />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/careers' element={<Careers />} />
          <Route path='/faqs' element={<Faqs />} />
          <Route path='/privacy-policy' element={< PrivacyPolicy />} />
          <Route path='/terms-and-conditions' element={< TermsAndConditions />} />
          {/* <Route path='/portfolio' element={< Portfolio />} /> */}
          <Route path='/BlogUs' element={< BlogUS />} />
          <Route path='/blog/:id' element={< BlogContant />} />
          {/* <Route path='/portfolio' element={< Portfolio />} /> */}
          <Route path='/portfolio-page' element={< Portfolio_page />} />

        </Route >
      </Routes >


      <Routes>
        {/* Dashboard Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index path="/Dashboard" element={<DashboardHome />} />
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
            <Route path="/Dashboard/AddNewBrand" element={<AddNewBrand/>} />


            <Route path="/Dashboard/Services" element={<Services/>} />
            <Route path="/Dashboard/AddNewServices" element={<AddNewServices/>} />
            <Route path="/Dashboard/CategoryServices" element={<CategoryServices/>} />

            <Route path="/Dashboard/Demo" element={<Demo/>} />

           


          </Route>
        </Route>
        <Route path="/AISLogin" element={<SignInForm />} />
      </Routes>

      
    </BrowserRouter >

  )
}