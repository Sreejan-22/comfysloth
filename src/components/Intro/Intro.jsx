import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import store from "../../assets/store.jpeg";
import "./Intro.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ab7a5f",
    },
  },
});

const useStyles = makeStyles({
  shopNowBtn: {
    fontSize: "1.2rem",
    fontWeight: "300",
  },
});

const Intro = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className="intro-container">
      <div className="intro-description">
        <h1 className="intro-description-heading">
          Design Your
          <br />
          Comfort Zone
        </h1>
        <div className="intro-description-text">
          Search and filter for products, add to cart, checkout, and make
          payment.
        </div>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            disableElevation
            className={classes.shopNowBtn}
            onClick={() => history.push("/products")}
          >
            Shop Now
          </Button>
        </ThemeProvider>
      </div>
      <div className="intro-img-container">
        <img src={store} alt="" className="intro-img" />
      </div>
    </div>
  );
};

export default Intro;
