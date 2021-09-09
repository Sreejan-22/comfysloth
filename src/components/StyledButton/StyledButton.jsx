import Button from "@material-ui/core/Button";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ab7a5f",
    },
  },
});

const StyledButton = ({ text, variant, size, className, onClickFn }) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant={variant}
        size={size}
        color="primary"
        className={className}
        disableElevation
        onClick={onClickFn}
      >
        {text}
      </Button>
    </ThemeProvider>
  );
};

StyledButton.defaultProps = {
  variant: "contained",
  size: "medium",
  className: "",
};

export default StyledButton;
