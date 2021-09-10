import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ab7a5f",
    },
  },
});

const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "5rem",
      }}
    >
      <ThemeProvider theme={theme}>
        <CircularProgress color="primary" size="5rem" />
      </ThemeProvider>
    </div>
  );
};

export default Loader;
