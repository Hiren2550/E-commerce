import React from "react";
import Myorder from "../features/user/components/Myorder";
import Navbar from "../features/Navbar/Navbar";
import Footer from "../features/Navbar/Footer";

const Myorderpage = () => {
  return (
    <div>
      <Navbar>
        <h1 className="text-2xl font-bold text-center my-2">My Orders </h1>
        <Myorder />
      </Navbar>
      <Footer />
    </div>
  );
};

export default Myorderpage;
