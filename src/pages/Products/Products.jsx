import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  productsSelector,
  fetchProducts,
  toggleView,
  updateSort,
  sortProducts,
  updateFilters,
  applyFilters,
  clearFilters,
} from "../../slices/products.slice";
import Slider from "@material-ui/core/Slider";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewListIcon from "@material-ui/icons/ViewList";
import Navbar from "../../components/Navbar/Navbar";
import BreadCrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Product from "../../components/Product/Product";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import "./Products.scss";

const breadcrumbArr = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Products",
    path: null,
  },
];

const categories = [
  "all",
  "office",
  "living room",
  "kitchen",
  "bedroom",
  "dining",
  "kids",
];

const companies = ["all", "marcos", "liddy", "ikea", "caressa"];
const sortBy = [
  { value: "price_lowest", text: "Price (Lowest)" },
  { value: "price_highest", text: "Price (Highest)" },
  { value: "name_a", text: "Name(A-Z)" },
  { value: "name_z", text: "Name(Z-A)" },
];

const Products = () => {
  const dispatch = useDispatch();
  const {
    allProducts,
    productsLoading,
    productsError,
    gridView,
    sort,
    filteredProducts,
    filters,
  } = useSelector(productsSelector);
  // const [currPrice, setCurrPrice] = useState("60000");

  useEffect(() => {
    if (!filteredProducts.length) {
      dispatch(fetchProducts());
    }
  }, []);

  useEffect(() => {
    dispatch(sortProducts());
    dispatch(applyFilters());
  }, [sort, filters]);

  // let debounceTimeout = 0;

  // const debounceSearch = (query) => {
  //   if (debounceTimeout) {
  //     clearTimeout(debounceTimeout);
  //   }

  //   debounceTimeout = setTimeout(() => {
  //     if (query.length) {
  //       const newProducts = allProducts.current.filter((item) => {
  //         return item.name.includes(query.toLowerCase());
  //       });
  //       setProducts(newProducts);
  //     } else {
  //       setProducts(allProducts.current);
  //     }
  //   }, 300);
  // };

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  //   updateFilters(event);
  // };
  // const handleChange = (e) => {};

  return (
    <div>
      <Navbar />
      <BreadCrumbs arr={breadcrumbArr} />
      {productsLoading ? (
        <Loader />
      ) : (
        <div className="pdt-section">
          <div className="pdt-filters-wrapper">
            <form className="pdt-filters">
              {/* SEARCH */}
              <input
                type="text"
                name="searchText"
                placeholder="Search"
                // onChange={(e) => debounceSearch(e.target.value)}
              />
              <h3>Category</h3>
              {/* CATEGORY */}
              <div className="pdt-categories">
                {categories.map((item) => (
                  <button
                    key={item}
                    name="category"
                    className={`${
                      filters.category === item ? "curr-category" : ""
                    } capitalize`}
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(updateFilters(e));
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <h3>Company</h3>
              {/* COMPANY */}
              <select
                name="company"
                className="company capitalize"
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(updateFilters(e));
                }}
              >
                {companies.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <h3>Price</h3>
              {/* PRICE */}
              <p className="price">&#8377;{filters.price}</p>
              <input
                type="range"
                name="price"
                id="price"
                min="0"
                max={filters.price}
                value={filters.price}
                onChange={(e) => {
                  // setCurrPrice(e.target.value);
                  dispatch(updateFilters(e));
                }}
                style={{ width: "100px", marginBottom: "1.5rem" }}
              />
              {/* SHIPPING */}
              <div className="free-shipping">
                <span>Free Shipping</span>
                <input
                  type="checkbox"
                  name="shipping"
                  onChange={(e) => dispatch(updateFilters(e))}
                />
              </div>
            </form>
            {/* CLEAR FILTERS */}
            <button
              className="clear-filters"
              onClick={() => dispatch(clearFilters())}
            >
              Clear Filters
            </button>
          </div>
          <div className="pdt-list">
            <div className="view-filters">
              {/* CHANGE VIEW */}
              <div className="view-icons">
                <ViewModuleIcon
                  className={`view-icon ${gridView ? "active" : ""}`}
                  onClick={() => dispatch(toggleView(true))}
                />
                <ViewListIcon
                  className={`view-icon ${!gridView ? "active" : ""}`}
                  onClick={() => dispatch(toggleView(false))}
                />
              </div>
              <span>{filteredProducts.length} products found</span>
              <hr />
              <span>Sort By</span>
              {/* SORT */}
              <select
                name="sort"
                onChange={(e) => {
                  dispatch(updateSort(e.target.value));
                }}
              >
                {sortBy.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="products">
              {filteredProducts.map((item) => (
                <Product
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  id={item.id}
                  key={item.id}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Products;
