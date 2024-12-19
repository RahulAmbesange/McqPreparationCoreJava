import React from "react";
import { Navigate } from "react-router-dom";

// PrivateRoute component that checks for authentication
const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("authToken");

  if (!token) {
    // If no token is found, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the children (protected route content)
  return children;
};

export default PrivateRoute;
