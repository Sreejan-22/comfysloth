import Navbar from "../../components/Navbar/Navbar";

const Error = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f1f5f8",
        marginTop: "5rem",
      }}
    >
      <Navbar />
      <h1 style={{ textAlign: "center", paddingTop: "5rem" }}>
        Oops! Page Not Found!!
      </h1>
    </div>
  );
};

export default Error;
