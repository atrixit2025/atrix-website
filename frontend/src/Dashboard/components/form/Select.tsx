import React from "react";

// Define the interface for Select options
interface Option {
  value: string;
  label: string;
}

// Define the props interface for the Select component
interface SelectProps {
  options?: Option[];       // Optional array of options
  placeholder?: string;     // Optional placeholder text
  onChange: (value: string) => void; // Required change handler
  className?: string;       // Optional additional CSS classes
  value?: string;           // The currently selected value
}

/**
 * A reusable Select dropdown component
 * 
 * Features:
 * - Fully controlled component
 * - Customizable options and placeholder
 * - TypeScript support
 * - Clean, accessible HTML select element
 */
const Select: React.FC<SelectProps> = ({
  options = [],             // Default empty array if no options provided
  placeholder = "Select an option", // Default placeholder text
  onChange,                 // Required change handler
  className = "",           // Additional classes default empty
  value = "",               // Current value defaults to empty
}) => {
  /**
   * Handle select change events
   * @param e - The change event from the select element
   */
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value); // Call parent's onChange with the new value
  };

  return (
    <select
      // Base classes for styling
      className={`
        h-11 w-full appearance-none rounded-lg border 
        border-gray-700  px-4 py-2.5 text-sm 
        shadow-theme-xs placeholder:text-(--white) 
        focus:border-brand-300 focus:outline-hidden 
        focus:ring-3 focus:ring-brand-500/10 
        bg-(--black)
        ${value ? "text-(--white) " : "text-(--white) "}
        ${className}
      `}
      value={value}         // Controlled by parent component
      onChange={handleChange} // Handle changes
    >
      {/* Placeholder option */}
      <option 
        value="" 
        className="text-(--white) "
      >
        {placeholder}
      </option>
      
      {/* Render each option */}
      {options.map((option) => (
        <option
          key={option.value} // Unique key for React
          value={option.value} // The value that will be passed to onChange
          className=" bg-(--black) text-(--white)"
        >
          {option.label}    {/* The visible text for the option */}
        </option>
      ))}
    </select>
  );
};

export default Select;