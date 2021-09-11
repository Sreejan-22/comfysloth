import { useState, useEffect, useRef } from "react";
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
  "All",
  "office",
  "living room",
  "kitchen",
  "bedroom",
  "dining",
  "kids",
];

const companies = ["All", "marcos", "liddy", "ikea", "caressa"];
const sortBy = ["Price (Lowest)", "Price (Highest)", "Name(A-Z)", "Name(Z-A)"];
const url = "https://course-api.com/react-store-products";

const Products = () => {
  const [value, setValue] = useState(60000);
  const [free, setFree] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currCategory, setCurrCategory] = useState("All");
  const [currCompany, setCurrCompany] = useState("All");
  const allProducts = useRef([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        allProducts.current = data;
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  let debouncePriceTimer = 0;

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // if (debouncePriceTimer) {
    //   clearTimeout(debouncePriceTimer);
    // }
    // debouncePriceTimer = setTimeout(() => {
    //   // const newProducts = products.filter(
    //   //   (pdt) => pdt.price >= 0 && pdt.price <= newValue
    //   // );
    //   // setProducts(newProducts);
    //   console.log(newValue);
    //   // setValue(newValue);
    // }, 300);
  };

  let debounceTimeout = 0;

  const debounceSearch = (query) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      if (query.length) {
        const newProducts = allProducts.current.filter((item) => {
          return item.name.includes(query.toLowerCase());
        });
        setProducts(newProducts);
      } else {
        setProducts(allProducts.current);
      }
    }, 300);
  };

  const filterProducts = (e, category, company) => {
    e.preventDefault();
    if (category === "All" && company === "All") {
      setCurrCategory(category);
      setCurrCompany(company);
      setProducts(allProducts.current);
    } else if (category !== "All" && company === "All") {
      const newProducts = allProducts.current.filter(
        (pdt) => pdt.category === category
      );
      setCurrCategory(category);
      setCurrCompany(company);
      setProducts(newProducts);
    } else if (category === "All" && company !== "All") {
      const newProducts = allProducts.current.filter(
        (pdt) => pdt.company === company
      );
      setCurrCategory(category);
      setCurrCompany(company);
      setProducts(newProducts);
    } else {
      const newProducts = allProducts.current.filter(
        (pdt) => pdt.category === category && pdt.company === company
      );
      setCurrCategory(category);
      setCurrCompany(company);
      setProducts(newProducts);
    }
  };

  return (
    <div>
      <Navbar />
      <BreadCrumbs arr={breadcrumbArr} />
      <div className="pdt-section">
        <div className="pdt-filters-wrapper">
          <form className="pdt-filters">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => debounceSearch(e.target.value)}
            />
            <h3>Category</h3>
            <div className="pdt-categories">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`${
                    currCategory === item ? "curr-category" : ""
                  } capitalize`}
                  onClick={(e) => filterProducts(e, item, currCompany)}
                >
                  {item}
                </button>
              ))}
            </div>
            <h3>Company</h3>
            <select
              name="company"
              className="company capitalize"
              onChange={(e) => filterProducts(e, currCategory, e.target.value)}
            >
              {companies.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <h3>Price</h3>
            <p className="price">&#8377;{value}</p>
            <Slider
              min={0}
              max={60000}
              value={value}
              onChange={handleChange}
              aria-labelledby="continuous-slider"
              style={{ width: "100px", marginBottom: "1.5rem" }}
            />
            <div className="free-shipping">
              <span>Free Shipping</span>
              <input
                type="checkbox"
                name="freeShipping"
                onChange={() => setFree(!free)}
              />
            </div>
          </form>
          <button className="clear-filters">Clear Filters</button>
        </div>
        <div className="pdt-list">
          <div className="view-filters">
            <div className="view-icons">
              <ViewModuleIcon
                className={`view-icon ${gridView ? "active" : ""}`}
                onClick={() => {
                  if (!gridView) {
                    setGridView(true);
                  }
                }}
              />
              <ViewListIcon
                className={`view-icon ${!gridView ? "active" : ""}`}
                onClick={() => {
                  if (gridView) {
                    setGridView(false);
                  }
                }}
              />
            </div>
            <span>{products.length} products found</span>
            <hr />
            <span>Sort By</span>
            <select name="sortBy">
              {sortBy.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="products">
              {products.map((item) => (
                <Product
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  id={item.id}
                  key={item.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
