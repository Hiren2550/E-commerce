import React from "react";
import Cart from "../features/cart/Cart";
import Navbar from "../features/Navbar/Navbar";

const Cartpage = () => {
  return (
    <div>
      <Navbar>
        <Cart />
      </Navbar>
    </div>
  );
};

export default Cartpage;
