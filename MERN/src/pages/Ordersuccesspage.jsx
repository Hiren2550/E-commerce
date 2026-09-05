import React from "react";
import Ordersuccess from "../features/order/Ordersuccess";
import Navbar from "../features/Navbar/Navbar";
import Footer from "../features/Navbar/Footer";

const Ordersuccesspage = () => {
  return (
    <div>
      <Navbar>
        <Ordersuccess />
      </Navbar>
      <Footer />
    </div>
  );
};

export default Ordersuccesspage;
