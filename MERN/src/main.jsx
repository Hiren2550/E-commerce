import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productSlice from "./features/Product-list/productSlice.js";
import authSlice from "./features/auth/authSlice.js";

const store = configureStore({
  reducer: {
    product: productSlice,
    auth: authSlice,
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
