import React from "react";
import Navbar from "../features/Navbar/Navbar";
import Productdetails from "../features/Product-list/components/Productdetails";

const Productdetailspage = () => {
  return (
    <div>
      <Navbar>
        <Productdetails />
      </Navbar>
    </div>
  );
};

export default Productdetailspage;
