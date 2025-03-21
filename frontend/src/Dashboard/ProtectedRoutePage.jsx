import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");


  if (token) {
    return <Outlet />;
  }

  
  return <Navigate to="/AISLogin" replace />;
};

export default ProtectedRoute;