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

const DrawerCartIcon = () => {
  return (
    <ThemeProvider theme={theme}>
      <Badge badgeContent={4} color="primary" style={{ marginLeft: "-7.5rem" }}>
        <ShoppingDrawerCartIcon />
      </Badge>
    </ThemeProvider>
  );
};

export default function NavbarDrawer({ state, setState }) {
  const classes = useStyles();
  // const [state, setState] = useState(false);

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
        {["Home", "About", "Cart", "Login"].map((text) => (
          <ListItem
            button
            key={text}
            alignItems="center"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <ListItemText primary={text} />
            {text === "Cart" ? (
              <ListItemIcon>
                <DrawerCartIcon />
              </ListItemIcon>
            ) : null}
          </ListItem>
        ))}
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
