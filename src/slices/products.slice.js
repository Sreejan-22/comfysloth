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
  categories: [],
  companies: [],
  filters: {
    searchText: "",
    category: "all",
    company: "all",
    shipping: false,
    price: 0,
  },
  maxPrice: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state) => {
      state.productsLoading = true;
    },
    getProductsSuccess: (state, { payload }) => {
      let featuredProducts = payload.filter(
        (pdt) => pdt.hasOwnProperty("featured") && pdt.featured
      );
      if (featuredProducts.length > 3) {
        featuredProducts = featuredProducts.slice(0, 3);
      }
      let categories = [...new Set(payload.map((pdt) => pdt.category))];
      categories.unshift("all");
      let companies = [...new Set(payload.map((pdt) => pdt.company))];
      companies.unshift("all");
      const prices = payload.map((pdt) => pdt.price);
      const maxPrice = Math.max(...prices);

      state.allProducts = payload;
      state.filteredProducts = payload;
      state.featuredProducts = featuredProducts;
      state.categories = categories;
      state.companies = companies;
      state.filters.price = maxPrice;
      state.maxPrice = maxPrice;
      state.productsLoading = false;
      state.productsError = false;
    },
    getProductsFailure: (state) => {
      state.productsLoading = false;
      state.productsError = true;
    },
    loadFeaturedProducts: (state) => {
      state.featuredLoading = true;
    },
    getFeaturedProductsSuccess: (state, { payload }) => {
      let featuredProducts = payload.filter(
        (pdt) => pdt.hasOwnProperty("featured") && pdt.featured
      );
      if (featuredProducts.length > 3) {
        featuredProducts = featuredProducts.slice(0, 3);
      }
      let categories = [...new Set(payload.map((pdt) => pdt.category))];
      categories.unshift("all");
      let companies = [...new Set(payload.map((pdt) => pdt.company))];
      companies.unshift("all");
      const prices = payload.map((pdt) => pdt.price);
      const maxPrice = Math.max(...prices);

      state.allProducts = payload;
      state.filteredProducts = payload;
      state.featuredProducts = featuredProducts;
      state.categories = categories;
      state.companies = companies;
      state.filters.price = maxPrice;
      state.maxPrice = maxPrice;
      state.featuredLoading = false;
      state.featuredError = false;
    },
    getFeaturedProductsFailure: (state) => {
      state.featuredError = true;
      state.featuredLoading = false;
    },
    toggleView: (state, { payload }) => {
      state.gridView = payload;
    },
    updateSort: (state, { payload }) => {
      state.sort = payload;
    },
    sortProducts: (state) => {
      let tempProducts = [...state.filteredProducts];
      const sortBy = state.sort;
      // console.log(tempProducts);
      // console.log(sortBy);
      if (sortBy === "price_lowest") {
        tempProducts = tempProducts.sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
      } else if (sortBy === "price_highest") {
        tempProducts = tempProducts.sort(
          (a, b) => Number(b.price) - Number(a.price)
        );
      } else if (sortBy === "name_a") {
        tempProducts = tempProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (sortBy === "name_z") {
        tempProducts = tempProducts
          .sort((a, b) => a.name.localeCompare(b.name))
          .reverse();
      }
      // console.log(tempProducts);
      state.filteredProducts = tempProducts;
    },
    updateFilters: (state, { payload }) => {
      const e = payload;
      let name = e.target.name;
      let value = e.target.value;

      if (name === "searchText") {
        value = e.target.value.toLowerCase();
      }
      if (name === "category") {
        value = e.target.innerText.toLowerCase();
      }
      if (name === "company") {
        value = e.target.value.toLowerCase();
      }
      if (name === "price") {
        value = Number(value);
      }
      if (name === "shipping") {
        value = e.target.checked;
      }
      state.filters[name] = value;
    },
    applyFilters: (state) => {
      let tempProducts = [...state.allProducts];
      const { searchText, category, company, shipping, price } = state.filters;

      if (searchText.length) {
        tempProducts = tempProducts.filter((pdt) =>
          pdt.name.includes(searchText)
        );
      }

      if (category !== "all") {
        tempProducts = tempProducts.filter((pdt) => pdt.category === category);
      }

      if (company !== "all") {
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
        category: "all",
        company: "all",
        shipping: false,
        price: state.maxPrice,
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

export function fetchProducts() {
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
}

export function fetchFeaturedProducts() {
  return async (dispatch) => {
    dispatch(loadFeaturedProducts);

    try {
      const res = await fetch(url);
      let data = await res.json();
      data = data.sort((a, b) => a.price - b.price); // sort from lowest price to highest
      dispatch(getFeaturedProductsSuccess(data));
    } catch (err) {
      dispatch(getFeaturedProductsFailure());
    }
  };
}
