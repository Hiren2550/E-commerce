import React from "react";
import { useSelector } from "react-redux";
import { selectCheck, selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const userCheck = useSelector(selectCheck);
  if (userCheck && !user) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
