import { makeStyles } from "@material-ui/core/styles";
import StyledButton from "../StyledButton/StyledButton";
import "./Featured.scss";

const useStyles = makeStyles({
  allProducts: {
    fontWeight: "300",
  },
});

const Featured = () => {
  const classes = useStyles();
  return (
    <div className="featured">
      <div>
        <h1>Featured Products</h1>
        <div></div>
      </div>
      <div className="featured-products"></div>
      <StyledButton text="All Products" className={classes.allProducts} />
    </div>
  );
};

export default Featured;
