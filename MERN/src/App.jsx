import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import Cartpage from "./pages/Cartpage";
import Checkoutpage from "./pages/Checkoutpage";
import Productdetailspage from "./pages/Productdetailspage";
import PrivateRoute from "./features/auth/components/PrivateRoute";
import Pagenotfound from "./pages/Pagenotfound";
import Ordersuccesspage from "./pages/Ordersuccesspage";
import Userprofilepage from "./pages/Userprofilepage";
import Myorderpage from "./pages/Myorderpage";
import Aboupage from "./pages/Aboupage";
import Logout from "./features/auth/components/Logout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/login" element={<Loginpage />} />
        {/* <Route element={<PrivateRoute />}> */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cartpage />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkoutpage />
            </PrivateRoute>
          }
        />
        <Route
          path="/productdetails/:id"
          element={
            <PrivateRoute>
              <Productdetailspage />
            </PrivateRoute>
          }
        />
        <Route
          path="/order-success/:id"
          element={
            <PrivateRoute>
              <Ordersuccesspage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Userprofilepage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <PrivateRoute>
              <Myorderpage />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <Aboupage />
            </PrivateRoute>
          }
        />
        <Route path="/log-out" element={<Logout />} />
        <Route path="*" element={<Pagenotfound />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
