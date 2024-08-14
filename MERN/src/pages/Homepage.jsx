import React from "react";
import Navbar from "../features/Navbar/Navbar";
import Productlist from "../features/Product-list/components/Productlist";

const Homepage = () => {
  return (
    <div>
      <Navbar>
        <Productlist />
      </Navbar>
    </div>
  );
};

export default Homepage;
