import React,{ useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FcMenu, 
} from "react-icons/fc"; 
import { MdOutlineDashboard } from "react-icons/md";
import { useSidebar } from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";
import { FaUser } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";
import { TbTableShare } from "react-icons/tb";
import { RiPagesLine } from "react-icons/ri";
import { FiPieChart } from "react-icons/fi";
import { BsBox } from "react-icons/bs";
import { RiSettings3Line } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa6";
import { GrTechnology } from "react-icons/gr";
import Logo from "../../assets/ais-logo-3.png";
import favIcons from "/favicon_ais-logo-2.png";
import { FaBloggerB } from "react-icons/fa6";
import { FaImagePortrait } from "react-icons/fa6";
import { TbMarquee } from "react-icons/tb";
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [

  {
    icon: <MdOutlineDashboard />, // Calendar icon
    name: "Dashboard",
    path: "/Dashboard",
  },

  {
    name: "Technology",
    icon: <GrTechnology />, 
    subItems: [
      { name: "All Technology", path: "/Technology", pro: false },
      { name: "Add New Technology ", path: "/AddNewTechnology", pro: false },
      { name: "Category", path: "/CategoryTechnology", pro: false },


    ],
  },
  {
    name: "Blog",
    icon: <FaBloggerB />, 
    subItems: [
      { name: "All Blog", path: "/Blog", pro: false },
      { name: "Add New Blog ", path: "/AddNewBlog", pro: false },
      { name: "Category Blog", path: "/CategoryBlog", pro: false },


    ],
  },
  {
    name: "Portfolio",
    icon: <FaImagePortrait />, 
    subItems: [
      { name: "All Portfolio", path: "/Portfolio", pro: false },
      { name: "Add New Portfolio ", path: "/AddNewPortfolio", pro: false },
      { name: "Category Portfolio", path: "/CategoryPortfolio", pro: false },


    ],
  },
  {
    name: "Brand",
    icon: <TbMarquee />, 
    subItems: [
      { name: "All Brand", path: "/Brand", pro: false },
      { name: "Add New Brand ", path: "/AddNewBrand", pro: false },


    ],
  },
  // {
  //   icon: <FaUser />, // User profile icon
  //   name: "User Profile",
  //   path: "/profile",
  // },
  
  // {
  //   name: "Forms",
  //   icon: <FaWpforms />, // List icon
  //   subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  // },
  // {
  //   name: "Tables",
  //   icon: <TbTableShare />,
  //   subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  // },
  // {
  //   name: "Pages",
  //   icon: <RiPagesLine />, // Page icon
  //   subItems: [
  //     { name: "Blank Page", path: "/blank", pro: false },
  //     { name: "404 Error", path: "/error-404", pro: false },
  //   ],
  // },
];

const othersItems: NavItem[] = [
  {
    icon: <FiPieChart />, // Pie chart icon
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BsBox />, // Box cube icon
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <RiSettings3Line />, // Plug-in icon
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`flex item-center gap-3 w-[100%] relative rounded-md px-3 py-2 text-md hover:bg-[#1816169f] font-bold menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "bg-[#1816169f]"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={` menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active text-[20px]"
                    : "menu-item-icon-inactive text-[20px]"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text ">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <FaChevronDown // Chevron down icon
                  className={`ml-auto w-5 h-5  transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500 "
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`flex item-center gap-3 w-[100%] relative rounded-md px-3 py-2 text-md hover:bg-[#1816169f] font-bold menu-item group ${
                  isActive(nav.path) ? "bg-[#1816169f]" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`flex  menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active  text-[20px]"
                      : "menu-item-icon-inactive text-[20px]"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`flex menu-dropdown-item hover:bg-[#1816169f] px-3 py-2 rounded-md ${
                        isActive(subItem.path)
                          ? "bg-[#1816169f]"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "bg-[#1816169f]"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-(--black) dark:border-gray-700  h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-5  flex justify-center ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
            <div className=" px-16">
              <img
                className="dark:hidden"
                src={Logo}
                alt="Logo"
                width={120}
                height={40}
              />
              <img
                className="hidden dark:block"
                src={Logo}
                alt="Logo"
                width={120}
                height={40}
              />
              </div>
            </>
          ) : (
            <div className="">
            <img
              src={favIcons}
              alt="Logo"
              width={50}
              height={80}
            />
            </div>
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar mt-">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`text-xs mb-4 uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <FcMenu className="size-6" /> // Horizontal dots icon
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <FcMenu  className="size-6"/> // Horizontal dots icon
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default AppSidebar;