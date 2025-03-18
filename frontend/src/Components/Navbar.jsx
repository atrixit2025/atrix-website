import React from 'react';
import Logo from "../assets/white_ais-logo-2.png"
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from "react-router-dom"
import Button from './Button';

const navigation = [
  { name: 'Home', path: '/', current: true },
  { name: 'About Us', path: '/about', current: false },
  { name: 'Our Services', path: '#', current: false },
  { name: 'Portfolio', path: '#', current: false },
  { name: 'Blog', path: '#', current: false },
  { name: 'Contact Us', path: '#', current: false },
]

export default function Navbar() {
  const location = useLocation();

  return (
    <Disclosure as="nav" className="absolute top-0 left-0 w-full z-10 ">
      <div className="mx-auto px-5 sm:px-6 lg:px-8 py-2">
        <div className="relative flex h-32 items-center justify-between">
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src={Logo}
                className="w-auto h-16 md:h-32"
              />
            </div>
          </div>

          <div className="hidden lg:ml-6 xl:block ">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                  className={`${
                    location.pathname === item.path ? 'bg-(--navbarUlbgcolor) text-(--blue)' : 'text-(--white) hover:bg-(--navbarUlbgcolor) hover:text-(--blue)'
                  } rounded-md px-3 py-1 lg:text-lg md:text-sm sm:text-sm text-[2px] font-bold`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 xl:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden">
            <Button className="relative" mybtn={"Let's Talk"} />
          </div>

          <div className="left-0 flex items-center justify-end xl:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-end rounded-md p-2 text-(--white) bg-(--navbarUlbgcolor) hover:bg-(--black) hover:text-(--white) focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden bg-(--navbarUlbgcolor)" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block bg-(--navbarUlbgcolor)" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="xl:hidden ">
        <div className="space-y-1 px-2 pt-2 pb-3 bg-(--navbarUlbgcolor) z-50">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.path}
              aria-current={location.pathname === item.path ? 'page' : undefined}
              className={`${
                location.pathname === item.path ? 'bg-(--navbarUlbgcolor) text-(--blue)' : 'text-(--white) hover:bg-(--navbarUlbgcolor) hover:text-(--blue)'
              } block rounded-md px-3 py-2 text-base font-medium`}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}