import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./features/Navbar/Navbar";
import Product from "./features/Product-list/Product";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import Cartpage from "./pages/Cartpage";
import Temp from "./temp";
import Checkoutpage from "./pages/Checkoutpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/checkout" element={<Checkoutpage />} />
        <Route path="/temp" element={<Temp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
