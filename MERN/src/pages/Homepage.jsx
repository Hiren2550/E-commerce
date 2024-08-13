import React from "react";
import Navbar from "../features/Navbar/Navbar";
import Product from "../features/Product-list/Product";

const Homepage = () => {
  return (
    <div>
      <Navbar>
        <Product />
      </Navbar>
    </div>
  );
};

export default Homepage;
