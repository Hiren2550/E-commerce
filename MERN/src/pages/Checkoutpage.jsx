import React from "react";
import Checkout from "../features/checkout/Checkout";
import Navbar from "../features/Navbar/Navbar";
import Footer from "../features/Navbar/Footer";

const Checkoutpage = () => {
  return (
    <div>
      <Navbar>
        <Checkout />
      </Navbar>
      <Footer />
    </div>
  );
};

export default Checkoutpage;
