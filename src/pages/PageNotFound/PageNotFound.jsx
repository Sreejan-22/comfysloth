import { useHistory } from "react-router-dom";

import Footer from "../../components/Footer/Footer";
import StyledButton from "../../components/StyledButton/StyledButton";

const PageNotFound = () => {
  const history = useHistory();
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#eaded7",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "200px",
          width: "100vw",
          height: "40vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "5rem" }}>404</h1>
        <h3 style={{ fontSize: "2rem" }}>
          Sorry, the page you tried cannot be found
        </h3>
        <StyledButton text="Back Home" onClickFn={() => history.push("/")} />
      </div>
      <Footer absolute="true" />
    </div>
  );
};

export default PageNotFound;
