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
import SignInForm from "./Dashboard/components/auth/SignInForm"



export default function App() {
    return (

        <BrowserRouter>

            <Routes>
                  <Route path="/" element={<OutLet />}>
                    <Route index element={<Home />} />
                    <Route path='/about' element={<About />} />

                  </Route>


             


            </Routes>


            <Routes>
                      {/* Dashboard Layout */}
                      
                    
                      <Route element={<AppLayout />}>
                        <Route index path="/Dashboard" element={<DashboardHome />} />
                        <Route  path="/Technology" element={<Technology />} />
                        <Route  path="/AddNewTechnology" element={<NewAddTechnology />} />
                        <Route  path="/CategoryTechnology" element={<CategoryTechnology />} />
                        </Route>
                        
                        <Route  path="/AISLogin" element={<SignInForm />} />

            </Routes>


        </BrowserRouter>

    )
}