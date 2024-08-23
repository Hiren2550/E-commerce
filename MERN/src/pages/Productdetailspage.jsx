import React from "react";
import Navbar from "../features/Navbar/Navbar";
import Productdetails from "../features/Product-list/components/Productdetails";
import Footer from "../features/Navbar/Footer";

const Productdetailspage = () => {
  return (
    <div>
      <Navbar>
        <Productdetails />
      </Navbar>
      <Footer />
    </div>
  );
};

export default Productdetailspage;
