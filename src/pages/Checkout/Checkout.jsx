import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { cartSelector } from "../../slices/cart.slice";
import StyledButton from "../../components/StyledButton/StyledButton";
import Navbar from "../../components/Navbar/Navbar";
import BreadCrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
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
  const { cartItems, subtotal, shippingFee } = useSelector(cartSelector);
  const { user } = useAuth0();

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
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#324d67",
            }}
          >
            <br />
            <br />
            <br />
            <h1 style={{ color: "#102a42" }}>Hello, {user.nickname}</h1>
            <p
              style={{
                letterSpacing: "1px",
                lineHeight: "1.2rem",
                marginTop: "0.5rem",
              }}
            >
              Your total is <b>&#8377;{subtotal + shippingFee}</b>
            </p>
            <br />
            <h4>Test Card Number: 4242 4242 4242 4242</h4>
          </div>
          <div className="checkout-form" style={{ marginTop: "2rem" }}>
            <CheckoutForm />
          </div>
        </>
      )}
      <Footer absolute="true" />
    </div>
  );
};

export default Checkout;
