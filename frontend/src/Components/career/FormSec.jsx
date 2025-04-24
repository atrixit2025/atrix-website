import React, { useState, useEffect } from "react";
import { RiAttachment2 } from "react-icons/ri";
import hire_img from "../../assets/career/hire.svg";
import Button from "../Button";

const jobOptions = [
  "Graphic Designer",
  "Web Development",
  "SEO",
  "Broker",
  "Content Writer",
];

const CareerFormSec = ({ selectedJob }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [jobRole, setJobRole] = useState("");

  // Set job role from prop when available
  useEffect(() => {
    if (selectedJob) {
      const matchedJob = jobOptions.find(
        (job) => job.toLowerCase() === selectedJob.toLowerCase()
      );
      setJobRole(matchedJob || "");
    }
  }, [selectedJob]);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
        setSelectedFile(null);
      } else if (file.size > 10 * 1024 * 1024) {
        setError("File size must not exceed 10MB.");
        setSelectedFile(null);
      } else {
        setError("");
        setSelectedFile(file);
      }
    }
  };

  return (
    <div  className="pt-40 pb-20">
      <div className="container mx-auto w-[90%]">
        <div className="mb-12">
          <p className="max-w-[800px] mx-auto text-center text-3xl">
            We truly value work-life balance. We work hard and deliver, but at
            the end of the day you can switch off.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Image Section */}
          <div className="flex items-center justify-center">
            <div className="contact-heading md:pr-40 pt-8 w-[70%] h-auto">
              <img src={hire_img} alt="Hire illustration" className="w-full h-full" />
            </div>
          </div>

          {/* Form Section */}
          <div>
            <form className="role-form bg-(--black) rounded-3xl p-12 shadow-lg">
              <h3 className="text-4xl font-semibold mb-10">Apply For the Role</h3>

              {/* Job Role Dropdown */}
              <select
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none mb-10 "
              >
                <option value="">Select Job Role</option>
                {jobOptions.map((job, idx) => (
                  <option key={idx} value={job}>
                    {job}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Full Name"
                className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none mb-10"
              />
              <input
                type="email"
                placeholder="Email ID"
                className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none mb-10"
              />
              <input
                type="tel"
                placeholder="Phone No."
                className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none mb-10"
              />
              <textarea
                placeholder="Links to your work or something about yourself."
                rows="1"
                className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none mb-6"
              ></textarea>

              <div className="flex gap-3.5 items-center">
                <label className="bg-[var(--blue)] text-white py-1 px-6 rounded-full text-lg cursor-pointer flex justify-center items-center gap-1">
                  <RiAttachment2 /> Upload
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <span>Attach Your CV</span>
              </div>

              {selectedFile && (
                <p className="text-white mt-2">Selected File: {selectedFile.name}</p>
              )}
              {error && <p className="text-red-500 mt-2">{error}</p>}

              <p className="mt-3 text-gray-300 text-sm italic">
                (Upload file in PDF format, max size: 10MB)
              </p>

              <div className="mybtn mt-10">
                <Button mybtn={"Submit"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerFormSec;
