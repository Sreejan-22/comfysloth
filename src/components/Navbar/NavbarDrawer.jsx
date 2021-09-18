import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ShoppingDrawerCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#ab7a5f",
    },
  },
});

const DrawerCartIcon = ({ number }) => {
  return (
    <ThemeProvider theme={theme}>
      <Badge
        badgeContent={number}
        color="primary"
        style={{ marginLeft: "-7.5rem" }}
      >
        <ShoppingDrawerCartIcon />
      </Badge>
    </ThemeProvider>
  );
};

export default function NavbarDrawer({ state, setState, number }) {
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const menu = [
    { text: "Home", onClickFn: () => history.push("/") },
    { text: "About", onClickFn: () => history.push("/about") },
    { text: "Products", onClickFn: () => history.push("/products") },
    { text: "Cart", onClickFn: () => history.push("/cart") },
    {
      text: isAuthenticated ? "Logout" : "Login",
      onClickFn: isAuthenticated ? () => logout() : () => loginWithRedirect(),
    },
  ];

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menu.map((item) => (
          <ListItem
            button
            key={item.text}
            alignItems="center"
            style={{ display: "flex", justifyContent: "center" }}
            onClick={item.onClickFn}
          >
            <ListItemText primary={item.text} />
            {item.text === "Cart" ? (
              <ListItemIcon>
                <DrawerCartIcon number={number} />
              </ListItemIcon>
            ) : null}
          </ListItem>
        ))}
        {isAuthenticated && (
          <ListItem
            button
            alignItems="center"
            style={{ display: "flex", justifyContent: "center" }}
            onClick={() => history.push("/checkout")}
          >
            <ListItemText primary="Checkout" />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
}
