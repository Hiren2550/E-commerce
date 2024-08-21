import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser, signOutAsync } from "../authSlice";

const Logout = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOutAsync());
  }, []);
  return <>{!user && <Navigate to={"/login"} replace={true}></Navigate>}</>;
};

export default Logout;
