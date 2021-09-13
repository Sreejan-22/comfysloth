import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  allProducts: [],
  gridView: true,
  sort: "price_lowest",
  filteredProducts: [],
  filters: {
    searchText: "",
    category: "All",
    company: "All",
    shipping: false,
    price: 60000,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleView: (state) => {
      state.gridView = !state.gridView;
    },
    sortProducts: (state) => {
      let tempProducts = [...state.filteredProducts];
      const sortBy = state.sort;
      if (sortBy === "price_lowest") {
        state.filteredProducts = tempProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price_highest") {
        state.filteredProducts = tempProducts.sort((a, b) => b.price - a.price);
      } else if (sortBy === "name_a") {
        state.filteredProducts = tempProducts.sort();
      } else if (sortBy === "name_z") {
        state.filteredProducts = tempProducts.sort().reverse();
      }
    },
    applyFilters: (state) => {
      let tempProducts = [...state.filteredProducts];
      const { searchText, category, company, shipping, price } = state.filters;
      // search function is yet to be implemented
      if (category !== "All") {
        tempProducts = tempProducts.filter((pdt) => pdt.category === category);
      }

      if (company !== "All") {
        tempProducts = tempProducts.filter((pdt) => pdt.company === company);
      }

      if (shipping) {
        tempProducts = tempProducts.filter((pdt) =>
          pdt.hasOwnProperty("shipping")
        );
      }

      tempProducts = tempProducts.filter((pdt) => pdt.price <= price);
    },
  },
});

// actions
export const { toggleView, sortProducts, applyFilters } = productsSlice.actions;

// a selector
export const productsSelector = (state) => state.products;

// the reducer
export const productsReducer = productsSlice.reducer;
