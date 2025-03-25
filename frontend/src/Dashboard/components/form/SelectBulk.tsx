import React, { useState } from "react";

interface Option {
    value: string;
    label: string;
  }
  
  interface SelectProps {
    options?: Option[];
    placeholder?: string;
    onChange: (selectedOption: Option | null) => void; // Changed to accept Option object
    className?: string;
    value?: Option | null; // Changed to accept Option object
  }
  
  const SelectBulk: React.FC<SelectProps> = ({
    options = [],
    placeholder = "Select an option",
    onChange,
    className = "",
    value = null,
  }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;
      const selectedOption = options.find(opt => opt.value === selectedValue) || null;
      onChange(selectedOption); // Pass the entire option object
    };
  


    return (
      <select
        className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5  text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3  focus:ring-brand-500/10 dark:border-(--black) dark:bg-(--black) dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800  ${className}`}
        value={value?.value || ""}
        onChange={handleChange}
      >
        {/* <option value="" disabled className="text-gray-400">
          {placeholder}
        </option> */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };


export default SelectBulk;
  