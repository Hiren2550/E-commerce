import React from "react";
import Navbar from "../features/Navbar/Navbar.jsx";
import Userprofile from "../features/user/components/Userprofile";

const Userprofilepage = () => {
  return (
    <div>
      <Navbar>
        <Userprofile />
      </Navbar>
    </div>
  );
};

export default Userprofilepage;
