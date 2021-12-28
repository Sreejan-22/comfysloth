import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  productsSelector,
  fetchProducts,
  updateSort,
  sortProducts,
  updateFilters,
  applyFilters,
  clearFilters,
} from "../../slices/products.slice";
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

const sortBy = [
  { value: "price_lowest", text: "Price (Lowest)" },
  { value: "price_highest", text: "Price (Highest)" },
  { value: "name_a", text: "Name(A-Z)" },
  { value: "name_z", text: "Name(Z-A)" },
];

const Products = () => {
  const dispatch = useDispatch();
  const {
    productsLoading,
    // productsError,
    sort,
    categories,
    companies,
    filteredProducts,
    filters,
    maxPrice,
  } = useSelector(productsSelector);

  useEffect(() => {
    if (!filteredProducts.length) {
      dispatch(fetchProducts());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(sortProducts());
    dispatch(applyFilters());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, filters]);

  let debounceTimeout = 0;

  const debounceSearch = (e) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      console.log(e.target.value);
      dispatch(updateFilters(e));
    }, 300);
  };

  return (
    <div>
      <Navbar />
      <BreadCrumbs arr={breadcrumbArr} />
      {productsLoading ? (
        <Loader />
      ) : (
        <div className="pdt-section">
          <div className="pdt-filters-wrapper">
            <div className="pdt-filters-container">
              <form className="pdt-filters">
                {/* SEARCH */}
                <input
                  type="text"
                  name="searchText"
                  placeholder="Search"
                  onChange={(e) => {
                    debounceSearch(e);
                  }}
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
                  value={filters.company}
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
                  className="price"
                  min="0"
                  max={maxPrice}
                  value={filters.price}
                  id="price-range"
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
                    checked={filters.shipping}
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
          </div>
          <div className="pdt-list">
            <div className="view-filters">
              <span>{filteredProducts.length} products found</span>
              <hr className="view-filters-line" />
              <span className="sort-by-text">Sort By</span>
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
