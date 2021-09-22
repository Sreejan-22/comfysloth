import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import App from "./App";
import { productsReducer } from "./slices/products.slice";
import { cartReducer } from "./slices/cart.slice";
import Auth0ProviderWithHistory from "./Auth0Provider";
import "./index.css";

// const store = configureStore({
//   reducer: {
//     products: productsReducer,
//     cart: cartReducer,
//   },
// });

const reducers = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  // middleware: [thunk],
});

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Auth0ProviderWithHistory>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Auth0ProviderWithHistory>
  </React.StrictMode>,
  document.getElementById("root")
);
