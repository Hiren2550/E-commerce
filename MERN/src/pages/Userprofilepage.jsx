import React from "react";
import Navbar from "../features/Navbar/Navbar.jsx";
import Userprofile from "../features/user/components/Userprofile";
import Footer from "../features/Navbar/Footer";

const Userprofilepage = () => {
  return (
    <div>
      <Navbar>
        <Userprofile />
      </Navbar>
      <Footer />
    </div>
  );
};

export default Userprofilepage;
