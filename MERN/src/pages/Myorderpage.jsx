import React from "react";
import Myorder from "../features/user/components/Myorder";
import Navbar from "../features/Navbar/Navbar";

const Myorderpage = () => {
  return (
    <div>
      <Navbar>
        <Myorder />
      </Navbar>
    </div>
  );
};

export default Myorderpage;
