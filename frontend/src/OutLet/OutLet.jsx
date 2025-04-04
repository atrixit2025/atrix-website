import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ScrollToTopBtn from '../Components/ScrollToTopBtn';




export const OutLet = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTopBtn></ScrollToTopBtn>
    </div>
  )
}