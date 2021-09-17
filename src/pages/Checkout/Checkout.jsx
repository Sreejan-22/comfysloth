import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartSelector } from "../../slices/cart.slice";
import StyledButton from "../../components/StyledButton/StyledButton";
import Navbar from "../../components/Navbar/Navbar";
import BreadCrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Footer from "../../components/Footer/Footer";
import "./Checkout.scss";

const breadcrumbArr = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Checkout",
    path: null,
  },
];

const Checkout = () => {
  const history = useHistory();
  const { cartItems } = useSelector(cartSelector);

  return (
    <div>
      <Navbar />
      <BreadCrumbs arr={breadcrumbArr} />
      {!cartItems.length ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <br />
          <br />
          <br />
          <h1>Your cart is empty</h1>
          <br />
          <StyledButton
            text="Fill it"
            onClickFn={() => history.push("/products")}
          />
        </div>
      ) : (
        <div>Checkout Form</div>
      )}
      <Footer absolute="true" />
    </div>
  );
};

export default Checkout;
