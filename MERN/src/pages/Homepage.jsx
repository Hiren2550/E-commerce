import React from "react";
import Navbar from "../features/Navbar/Navbar";
import Productlist from "../features/Product-list/components/Productlist";
import Footer from "../features/Navbar/Footer";

const Homepage = () => {
  return (
    <div>
      <Navbar>
        <Productlist />
      </Navbar>
      <Footer />
    </div>
  );
};

export default Homepage;
