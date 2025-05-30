import React from "react";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { ServicesCategoryProvider } from "../ContextApi/ServicesCategoryContextApi";
import { FAQCategoryProvider } from "../ContextApi/FAQCaategoryContextApi";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <>
      <ServicesCategoryProvider>
        <FAQCategoryProvider>

        <div className="container max-auto min-h-screen max-w-full bg-(--darkblack)">
          <div>
            <AppSidebar />
            <Backdrop />
          </div>
          <div
            className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
              } ${isMobileOpen ? "ml-0" : ""}`}
          >
            <AppHeader />
            <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
              <Outlet />
            </div>
          </div>
        </div>
        </FAQCategoryProvider>
      </ServicesCategoryProvider>

    </>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
