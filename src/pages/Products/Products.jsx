import { useState, useEffect } from "react";
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
  "Office",
  "Living Room",
  "Kitchen",
  "Bedroom",
  "Dining",
  "Kids",
];

const companies = ["All", "Marcos", "Liddy", "Ikea", "Caressa"];
const sortBy = ["Price (Lowest)", "Price (Highest)", "Name(A-Z)", "Name(Z-A)"];
const url = "https://course-api.com/react-store-products";

const Products = () => {
  const [value, setValue] = useState(60000);
  const [free, setFree] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Navbar />
      <BreadCrumbs arr={breadcrumbArr} />
      <div className="pdt-section">
        <div className="pdt-filters-wrapper">
          <form className="pdt-filters">
            <input type="text" placeholder="Search" />
            <h3>Category</h3>
            <div className="pdt-categories">
              {categories.map((item) => (
                <button key={item} className="curr-category">
                  {item}
                </button>
              ))}
            </div>
            <h3>Company</h3>
            <select name="company" className="company">
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
            <span>23 products found</span>
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
