import Button from "@material-ui/core/Button";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ab7a5f",
    },
  },
});

const StyledButton = ({ text, variant, size, className }) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant={variant}
        size={size}
        color="primary"
        className={className}
        disableElevation
      >
        {text}
      </Button>
    </ThemeProvider>
  );
};

StyledButton.defaultProps = {
  variant: "contained",
  size: "medium",
};

export default StyledButton;
