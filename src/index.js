import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import { productsReducer } from "./slices/products.slice";
import { cartReducer } from "./slices/cart.slice";
import "./index.css";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
