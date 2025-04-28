import React, { useState, useEffect } from 'react';
import Logo from "../assets/white_ais-logo-2.png";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from "react-router-dom";
import Button from './Button';
import BgAnimation from './BgAnimation';

const navigation = [
  { name: 'Home', path: '/', current: true },
  { name: 'About Us', path: '/about', current: false },
  { name: 'Our Services', path: '/our-services', current: false },
  { name: 'Blog', path: '/Blog', current: false },
  { name: 'Portfolio', path: '/portfolio', current: false },
  { name: 'Contact Us', path: '/contact-us', current: false },
];

const mobileNavigation = [
  { name: 'Home', path: '/', current: true },
  { name: 'About Us', path: '/about', current: false },

  { name: 'Portfolio', path: '/portfolio', current: false },
];

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1280);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const displayedNavigation = isMobileView ? mobileNavigation : navigation;

  return (
    <Disclosure as="nav" className="absolute top-0 left-0 w-full z-50 py-2">
      <div className="mx-auto px-5 sm:px-6 lg:px-8 py-2">
        <div className="relative flex h-32 items-center justify-between">
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <img
                  alt="Your Company"
                  src={Logo}
                  className="w-auto h-16 md:h-32"
                />
              </Link>
            </div>
          </div>

          <div className="hidden lg:ml-6 xl:block">
            <div className="flex space-x-4">
              {displayedNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                  className={`${location.pathname === item.path ? 'bg-[var(--blue)] text-white' : 'text-white hover:bg-[var(--blue)] hover:scale-105 duration-150'} rounded-md px-3 py-1 lg:text-lg md:text-sm sm:text-sm font-bold`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 xl:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden">
            <Button className="relative" mybtn={"Let's Talk"} btnLink={"/contact-us"} />
          </div>

          <div className="left-0 flex items-center justify-end xl:hidden">
            <DisclosureButton
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group relative inline-flex items-center justify-end rounded-md p-2 text-white bg-black hover:bg-black hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="xl:hidden ">
        <div className="fixed inset-0 z-50 flex flex-col justify-between  text-center bg-black overflow-y-auto">
          <BgAnimation />
       

          <div className="w-full flex mb-6 pt-3">
            <div className="flex items-center justify-center pl-10" />
            <Link to="/" className="mx-auto" onClick={() => setIsMenuOpen(false)}>
              <img className="md:w-38 w-38" src={Logo} alt="Company Logo" />
            </Link>
            <DisclosureButton
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-white"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>

          <div className="flex flex-col items-center w-full space-y-4 mb-10">
            {mobileNavigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`w-full max-w-[180px] px-1 py-3 text-lg font-semibold rounded-lg ${location.pathname === item.path ? "bg-[var-(--blue)] text-white" : "text-white hover:bg-gray-800"}`}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>

          <div className="w-full text-white text-center space-y-3 text-sm ">
            <div className="flex items-center justify-center gap-6 flex-wrap pb-3">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+91 98654-3210</span>
              </div>

              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@atrixitsolutions.com</span>
              </div>
            </div>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
