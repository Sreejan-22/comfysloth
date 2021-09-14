import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  productsSelector,
  fetchFeaturedProducts,
} from "../../slices/products.slice";
import Product from "../Product/Product";
import Loader from "../Loader/Loader";
import { makeStyles } from "@material-ui/core/styles";
import StyledButton from "../StyledButton/StyledButton";
// import featuredProducts from "../../utils/getFeaturedProducts";
import "./Featured.scss";

const useStyles = makeStyles({
  allProducts: {
    fontWeight: "300",
  },
});

const Featured = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { featuredProducts, featuredLoading, featuredError } =
    useSelector(productsSelector);

  useEffect(() => {
    if (!featuredProducts.length) {
      dispatch(fetchFeaturedProducts());
    }
  }, []);

  return (
    <div className="featured">
      <h1>Featured Products</h1>
      <div className="brown-line"></div>
      <div className="featured-pdts">
        {featuredLoading ? (
          <h1>Loading...</h1>
        ) : (
          featuredProducts.map((item, index) => {
            return (
              // <div key={`feat-pdt-${index}`} className="feat-pdt">
              //   <img src={item.image} alt="" />
              //   <div>
              //     <span style={{ color: "black" }}>{item.name}</span>
              //     <span>{item.price}</span>
              //   </div>
              // </div>
              <Product
                image={item.image}
                name={item.name}
                price={item.price}
                id={item.id}
                key={item.id}
              />
            );
          })
        )}
      </div>
      <StyledButton
        text="All Products"
        className={classes.allProducts}
        onClickFn={() => history.push("/products")}
      />
    </div>
  );
};

export default Featured;
