import { useHistory } from "react-router-dom";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import comfysloth from "../../assets/comfysloth.svg";
import "./Navbar.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ab7a5f",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

const CartIcon = () => {
  return (
    <Badge badgeContent={4} color="primary">
      <ShoppingCartIcon />
    </Badge>
  );
};

const useStyles = makeStyles({
  cartButton: {
    fontSize: "1.5rem",
  },
});

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <nav className="navbar">
      <div>
        <img
          src={comfysloth}
          alt=""
          className="company-logo"
          onClick={() => {
            // history.push("/");
          }}
        />
      </div>
      <div className="navlinks">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/products">Products</a>
      </div>
      <div className="navmenu">
        {/* <a href="/cart">Cart</a> */}
        <ThemeProvider theme={theme}>
          <Button
            // variant="outlined"
            color="primary"
            disableElevation
            endIcon={<CartIcon />}
            className={classes.cartButton}
          >
            Cart
          </Button>
          <Button variant="contained" color="primary" disableElevation>
            Login
          </Button>
        </ThemeProvider>
        {/* <a href="/login">Login</a> */}
      </div>
    </nav>
  );
};

export default Navbar;
