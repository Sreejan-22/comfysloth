import { createSlice } from "@reduxjs/toolkit";

// sample cart item
// const singleCartItem = {
//   name: "modern poster",
//   id: "recoAJYUCuEKxcPSr",
//   img: "https://dl.airtable.com/.attachments/e2eef862d9b7a2fb0aa74fa24fbf97bb/25c4bc17/0-pexels-pixabay-462235.jpg"
//   qty: 3,
//   price: 4561,
//   company: "ikea",
// };

export const initialState = {
  cartItems: [],
  shippingFee: 100,
  subtotal: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      let tempCart = [...state.cartItems];
      let totalItems = state.totalItems + payload.qty;
      const subtotal = state.subtotal + payload.price * payload.qty;
      tempCart.push(payload);
      state.cartItems = tempCart;
      state.subtotal = subtotal;
      state.totalItems = totalItems;
    },
    removeFromCart: (state, { payload }) => {
      const id = payload.id;
      let tempCart = [...state.cartItems];
      tempCart = tempCart.filter((item) => item.id !== id);
      let totalItems = state.totalItems - payload.qty;
      const subtotal = state.subtotal - payload.price * payload.qty;
      state.cartItems = tempCart;
      state.subtotal = subtotal;
      state.totalItems = totalItems;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.subtotal = 0;
      state.totalItems = 0;
    },
  },
});

// actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// the selector
export const cartSelector = (state) => state.cart;

// the reducer
export const cartReducer = cartSlice.reducer;