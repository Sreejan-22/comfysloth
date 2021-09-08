import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import StyledButton from "../StyledButton/StyledButton";
import featuredProducts from "../../utils/getFeaturedProducts";
import "./Featured.scss";

console.log(featuredProducts);

const useStyles = makeStyles({
  allProducts: {
    fontWeight: "300",
  },
});

const Featured = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className="featured">
      <h1>Featured Products</h1>
      <div className="brown-line"></div>
      <div className="featured-pdts">
        {featuredProducts.map((item, index) => {
          return (
            <div key={`feat-pdt-${index}`} className="feat-pdt">
              <img src={item.image} alt="" />
              <div>
                <span style={{ color: "black" }}>{item.name}</span>
                <span>{item.price}</span>
              </div>
            </div>
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
