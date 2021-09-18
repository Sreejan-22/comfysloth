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
// import { useAuth0 } from "@auth0/auth0-react";
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
  // const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (!featuredProducts.length) {
      dispatch(fetchFeaturedProducts());
    }
    // console.log(isAuthenticated);
    // console.log(user);
  }, []);

  if (featuredLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="featured">
      <h1>Featured Products</h1>
      <div className="brown-line"></div>
      <div className="featured-pdts">
        {featuredLoading && <h1>Loading...</h1>}
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
