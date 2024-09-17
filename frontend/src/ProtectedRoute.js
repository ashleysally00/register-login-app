import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = sessionStorage.getItem("userToken");

  return token ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;