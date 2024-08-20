import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productReducer from "./features/Product-list/productSlice.js";
import authReducer from "./features/auth/authSlice.js";
import cartReducer from "./features/cart/cartSlice.js";
import orderReducer from "./features/order/orderSlice.js";
import userReducer from "./features/user/userSlice.js";

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
