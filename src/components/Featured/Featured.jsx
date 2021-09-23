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
import { notifyError } from "../../utils/notifyToasts";
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (featuredLoading) {
    return <Loader />;
  }

  return (
    <div className="featured">
      <h1>Featured Products</h1>
      <div className="brown-line"></div>
      <div className="featured-pdts">
        {featuredLoading && <Loader />}
        {featuredError && notifyError("Couldn't fetch featured products!!")}
        {featuredProducts.map((item, index) => {
          return (
            <Product
              image={item.image}
              name={item.name}
              price={item.price}
              id={item.id}
              key={item.id}
            />
          );
        })}
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
