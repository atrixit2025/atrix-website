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
          <Route path='/portfolio' element={< Portfolio />} />
          <Route path='/BlogUs' element={< BlogUS />} />
          <Route path='/BlogContant' element={< BlogContant />} />
          {/* <Route path='/portfolio' element={< Portfolio />} /> */}
          <Route path='/portfolio-page' element={< Portfolio_page />} />

        </Route >
      </Routes >


      <Routes>
        {/* Dashboard Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index path="/Dashboard" element={<DashboardHome />} />
            <Route path="/DashboardTechnology" element={<Technology />} />
            <Route path="/DashboardAddNewTechnology" element={<NewAddTechnology />} />
            <Route path="/DashboardCategoryTechnology" element={<CategoryTechnology />} />

            <Route path="/DashboardBlog" element={<Blog />} />
            <Route path="/DashboardAddNewBlog" element={<AddNewBlog />} />
            <Route path="/DashboardCategoryBlog" element={<CategoryBlog />} />

            <Route path="/DashboardPortfolio" element={<Portfolio />} />
            <Route path="/DashboardAddNewPortfolio" element={<AddNewPortfolio />} />
            <Route path="/DashboardCategoryPortfolio" element={<CategoryPortfolio />} />


            <Route path="/DashboardBrand" element={<Brand />} />
            <Route path="/DashboardAddNewBrand" element={<AddNewBrand/>} />


            <Route path="/DashboardServices" element={<Services/>} />

           


          </Route>
        </Route>
        <Route path="/AISLogin" element={<SignInForm />} />
      </Routes>
    </BrowserRouter >

  )
}