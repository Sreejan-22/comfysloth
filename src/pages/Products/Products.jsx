import { useState } from "react";
import Slider from "@material-ui/core/Slider";
import Navbar from "../../components/Navbar/Navbar";
import BreadCrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Button from "@material-ui/core/Button";
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

const Products = () => {
  const [value, setValue] = useState(60000);
  const [free, setFree] = useState(false);

  console.log(free);

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
                <option value={item}>{item}</option>
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
        <div className="pdt-list"></div>
      </div>
    </div>
  );
};

export default Products;
