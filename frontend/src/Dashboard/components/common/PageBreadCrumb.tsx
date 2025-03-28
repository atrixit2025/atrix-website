import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/button/Button";

interface BreadcrumbProps {
  pageTitle: string;
  buttonText?: string; // New prop for button text
  buttonLink?: string; // New prop for button link
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({
  pageTitle,
  buttonText = "New Add", // Default button text
  buttonLink = "/", // Default button link
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-20">
      <div className="flex gap-5">
        <h2 className="text-4xl font-semibold text-gray-800 dark:text-white/90">
          {pageTitle}
        </h2>
        <div className="cursor-pointer">
          <Link to={buttonLink}>
            <Button
              size="sm"
              variant="outline"
              className="cursor-pointer"
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
      <nav>
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              to="/"
            >
              Home
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li className="text-sm text-gray-800 dark:text-white/90">
            {pageTitle}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;