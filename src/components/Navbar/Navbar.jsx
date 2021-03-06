import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartSelector } from "../../slices/cart.slice";
import { useAuth0 } from "@auth0/auth0-react";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import comfysloth from "../../assets/comfysloth.svg";
import NavbarDrawer from "./NavbarDrawer";
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

const CartIcon = ({ number }) => {
  return (
    <Badge badgeContent={number} color="primary">
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
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useSelector(cartSelector);

  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <nav className="navbar">
      <div>
        <img
          src={comfysloth}
          alt=""
          className="company-logo"
          onClick={() => {
            history.push("/");
          }}
        />
      </div>
      <div className="navlinks">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        {isAuthenticated && <Link to="/checkout">Checkout</Link>}
      </div>
      <div className="navmenu">
        <ThemeProvider theme={theme}>
          <Button
            // variant="outlined"
            color="primary"
            disableElevation
            endIcon={<CartIcon number={totalItems} />}
            className={classes.cartButton}
            onClick={() => history.push("/cart")}
          >
            Cart
          </Button>
          {!isAuthenticated && (
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={loginWithRedirect}
            >
              Login
            </Button>
          )}
          {isAuthenticated && (
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={logout}
            >
              Logout
            </Button>
          )}
        </ThemeProvider>
      </div>
      <div className="menu-icon-wrapper">
        <MenuIcon
          color="#ab7a5f"
          className="menu-icon"
          fontSize="large"
          htmlColor="#ab7a5f"
          onClick={() => setIsOpen(true)}
        />
      </div>
      <NavbarDrawer state={isOpen} setState={setIsOpen} number={totalItems} />
    </nav>
  );
};

export default Navbar;
