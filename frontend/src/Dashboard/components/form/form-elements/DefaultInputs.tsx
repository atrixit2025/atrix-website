import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
// import { CalenderIcon, EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";
import Flatpickr from "react-flatpickr";
import FileInput from "../input/FileInput";
import { Link } from "react-router-dom";
import Button from "../../ui/button/Button";

export default function DefaultInputs() {
  const [showPassword, setShowPassword] = useState(false);
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleDateChange = (date: Date[]) => {
    setDateOfBirth(date[0].toLocaleDateString()); // Handle selected date and format it
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };
  return (

    <div className="space-y-6">
      <div>
        <Label htmlFor="input">Title</Label>
        <Input type="text" id="input" placeholder="Title" />
      </div>
      {/* <div>
          <Label htmlFor="input">category</Label>
          <Input type="text" id="input" placeholder="category"/>
        </div> */}



      {/* <div>
          <Label htmlFor="tm">Date Picker Input</Label>
          <div className="relative">
            <Input
              type="time"
              id="tm"
              name="tm"
              onChange={(e) => console.log(e.target.value)}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <TimeIcon className="size-6" />
            </span>
          </div>
        </div> */}
      {/* <div>
        <Label>Upload file</Label>
        <FileInput onChange={handleFileChange} className="custom-class" />
      </div> */}

      {/* <div className="cursor-pointer flex justify-center">
        <Link to="/Technology"><Button
          size="sm"
          variant="outline"
          // startIcon={<span>🚀</span>}
          // onClick={() => alert('New Technology Added!')}
          className="cursor-pointer"
        >
          Add Technology
        </Button></Link>
      </div> */}
    </div>

  );
}
