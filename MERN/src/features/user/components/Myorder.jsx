import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from "../userSlice";
import { selectLoggedInUser } from "../../auth/authSlice";

const Myorder = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userOrders = useSelector(selectUserOrders);
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, []);
  return <div>Myorder</div>;
};

export default Myorder;
