import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

interface ComponentCardProps {
  title: string;
  link?: string; // Make link optional
  children: React.ReactNode;
  className?: string;
  desc?: string;
}

const ComponentCategory: React.FC<ComponentCardProps> = ({
  title,
  link, // Now optional
  children,
  className = "",
  desc = "",
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5 flex justify-between items-center">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          {title}
        </h3>

        {/* Conditionally render the + icon only if link is provided */}
        {link && (
          <div>
            <Link to={link}>
              <FiPlus className="cursor-pointer" />
            </Link>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="px-6 py-5 border-t border-gray-100 dark:border-gray-800">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCategory;