import React, { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import ImageSignin from "../../../assets/AboutImage.jpg";
import Logo from "../../../assets/ais-logo-3.png";
import "../../../CSS/One.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";  

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post("http://localhost:5300/user/signin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = response.data;

        // console.log("Login successful:", data);

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.name);

        // alert("Login successful!");

        // Redirect to the dashboard using navigate()
        navigate("/dashboard");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <div className="container mx-auto max-w-full ">
        <div className="row min-h-screen flex flex-wrap md:p-0 p-10">
          <div className="col-6   hidden md:block md:w-[50%]">
            <img src={ImageSignin} className="h-full w-full object-cover" />
          </div>
          <div className="col-6 flex flex-col flex-1 justify-center items-center">
            <div className="flex flex-col justify-center w-full max-w-md mx-auto">
              <img src={Logo} className="object-contain h-48 pb-10" />

              <div className="flex justify-center pb-10">
                <h3 className="text-[28px] font-extrabold">
                  Welcome to Atrix IT Solutions
                </h3>
              </div>
              <form  onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <Label>
                      Email <span className="text-error-500">*</span>{" "}
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="info@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label>
                      Password <span className="text-error-500">*</span>{" "}
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <FaEye className="fill-gray-500 dark:fill-gray-400 size-5" />
                        ) : (
                          <FaEyeSlash className="fill-gray-500 dark:fill-gray-400 size-5" />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mt-10">
                    <Button type="submit" className="w-full gradient-button" size="sm">
                      Sign in
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
