import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  allProducts: [],
  productsLoading: false,
  productsError: false,
  featuredProducts: [],
  featuredLoading: false,
  featuredError: false,
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
    loadProducts: (state) => {
      state.productsLoading = true;
    },
    getProductsSuccess: (state, { payload }) => {
      const featuredProducts = payload.filter(
        (pdt) => pdt.hasOwnProperty("featured") && pdt.featured
      );
      state.allProducts = payload;
      state.filteredProducts = payload;
      state.featuredProducts = featuredProducts;
      state.productsLoading = false;
      state.productsError = false;
    },
    getProductsFailure: (state) => {
      state.productsLoading = false;
      state.productsError = true;
    },
    loadFeaturedProducts: (state) => {
      state.featuredLoading = true;
      state.productsLoading = true;
    },
    getFeaturedProductsSuccess: (state, { payload }) => {
      const featuredProducts = payload.filter(
        (pdt) => pdt.hasOwnProperty("featured") && pdt.featured
      );
      state.allProducts = payload;
      state.filteredProducts = payload;
      state.featuredProducts = featuredProducts;
      state.featuredLoading = false;
      state.featuredError = false;
      state.productsLoading = false;
      state.productsError = false;
    },
    getFeaturedProductsFailure: (state) => {
      state.productsLoading = false;
      state.featuredError = true;
      state.featuredLoading = false;
      state.productsError = true;
    },
    toggleView: (state, { payload }) => {
      state.gridView = payload;
    },
    updateSort: (state, { payload }) => {
      const e = payload;
      state.sort = e.target.value;
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
    updateFilters: (state, { payload }) => {
      const e = payload;
      let name = e.target.name;
      let value = e.target.value;
      // if (name === "searchText") {
      //   // yet to be implemented
      // }
      if (name === "category") {
        value = e.target.innerText;
      }
      if (name === "company") {
        value = e.target.value;
      }
      if (name === "price") {
        value = Number(value);
      }
      if (name === "shipping") {
        value = e.target.checked;
      }
      state.filters = { ...state.filters, name: value };
    },
    applyFilters: (state) => {
      let tempProducts = [...state.allProducts];
      const { searchText, category, company, shipping, price } = state.filters;
      // search function is yet to be implemented
      if (category !== "All") {
        tempProducts = tempProducts.filter((pdt) => pdt.category === category);
      }

      if (company !== "All") {
        tempProducts = tempProducts.filter((pdt) => pdt.company === company);
      }

      tempProducts = tempProducts.filter((pdt) => pdt.price <= price);

      if (shipping) {
        tempProducts = tempProducts.filter(
          (pdt) => pdt.hasOwnProperty("shipping") && pdt.shipping
        );
      }
      state.filteredProducts = tempProducts;
    },
    clearFilters: (state) => {
      state.filters = {
        searchText: "",
        category: "All",
        company: "All",
        shipping: false,
        price: 60000,
      };
    },
  },
});

// actions
export const {
  loadProducts,
  getProductsSuccess,
  getProductsFailure,
  loadFeaturedProducts,
  getFeaturedProductsSuccess,
  getFeaturedProductsFailure,
  toggleView,
  updateSort,
  sortProducts,
  updateFilters,
  applyFilters,
  clearFilters,
} = productsSlice.actions;

// a selector
export const productsSelector = (state) => state.products;

// the reducer
export const productsReducer = productsSlice.reducer;

// async functions
const url = "https://course-api.com/react-store-products";

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(loadProducts);

    try {
      const res = await fetch(url);
      let data = await res.json();
      data = data.sort((a, b) => a.price - b.price); // sort from lowest price to highest
      dispatch(getProductsSuccess(data));
    } catch (err) {
      dispatch(getProductsFailure());
    }
  };
};

export const fetchFeaturedProducts = () => {
  return async (dispatch) => {
    dispatch(loadProducts);

    try {
      const res = await fetch(url);
      let data = await res.json();
      data = data.sort((a, b) => a.price - b.price); // sort from lowest price to highest
      dispatch(getProductsSuccess(data));
    } catch (err) {
      dispatch(getProductsFailure());
    }
  };
};
