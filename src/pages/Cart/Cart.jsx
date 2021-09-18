import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSelector,
  removeFromCart,
  clearCart,
  increment,
  decrement,
} from "../../slices/cart.slice";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../../components/Navbar/Navbar";
import BreadCrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Footer from "../../components/Footer/Footer";
import DeleteIcon from "@material-ui/icons/Delete";
import StyledButton from "../../components/StyledButton/StyledButton";
import "./Cart.scss";

const breadcrumbArr = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Cart",
    path: null,
  },
];

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cartState = useSelector(cartSelector);
  const { cartItems, shippingFee, subtotal } = cartState;
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <div>
      <Navbar />
      <BreadCrumbs arr={breadcrumbArr} />
      <div className="cart-wrapper">
        <div className="cart-container">
          {!cartItems.length ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1>Your cart is empty</h1>
              <br />
              <StyledButton
                text="Fill it"
                onClickFn={() => history.push("/products")}
              />
            </div>
          ) : (
            <>
              <div className="cart-titles-wrapper">
                <div className="cart-titles">
                  <h5>Item</h5>
                  <h5>Price</h5>
                  <h5>Quantity</h5>
                  <h5>Subtotal</h5>
                  <span></span>
                </div>
                <hr
                  style={{
                    marginTop: "1rem",
                    marginBottom: "3rem",
                    borderTop: "1px solid #bcccdc",
                  }}
                />
              </div>
              {/* CART ITEMS */}
              {cartItems.map((item, index) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-desc">
                    <img src={item.img} alt="" />
                    <h4 className="cart-item-name capitalize">{item.name}</h4>
                    <div className="cart-item-info-sm">
                      <h4 className="capitalize">{item.name}</h4>
                      <div className="cart-item-price-sm">
                        &#8377;{item.price}
                      </div>
                    </div>
                  </div>
                  <div className="cart-item-price">&#8377;{item.price}</div>
                  <div className="cart-item-qty">
                    <span
                      style={{ position: "relative", top: "-7px" }}
                      onClick={() => dispatch(decrement({ item, index }))}
                    >
                      _
                    </span>
                    <div className="cart-item-qty-info">{item.qty}</div>
                    <span onClick={() => dispatch(increment({ item, index }))}>
                      +
                    </span>
                  </div>
                  <h4 className="cart-item-subtotal">
                    &#8377;{item.price * item.qty}
                  </h4>
                  <DeleteIcon
                    className="delete-cart-item"
                    htmlColor="red"
                    onClick={() => dispatch(removeFromCart(item))}
                  />
                </div>
              ))}

              <hr style={{ borderTop: "1px solid #bcccdc" }} />
              <div className="cart-other-links">
                <button onClick={() => history.push("/products")}>
                  Continue Shopping
                </button>
                <button
                  className="clear-cart-btn"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Shopping Cart
                </button>
              </div>
              <div className="cart-order-wrapper">
                <div className="cart-order">
                  <div className="cart-order-content">
                    <h4>
                      Subtotal <span>&#8377;{subtotal}</span>
                    </h4>
                    <p>
                      Shipping fee <span>&#8377;{shippingFee}</span>
                    </p>
                    <hr />
                    <h3>
                      Order Total <span>&#8377;{subtotal + shippingFee}</span>
                    </h3>
                  </div>
                  {isAuthenticated ? (
                    <button
                      className="checkout-btn"
                      onClick={() => history.push("/checkout")}
                    >
                      Proceed to Checkout
                    </button>
                  ) : (
                    <button
                      className="checkout-btn"
                      onClick={loginWithRedirect}
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer absolute={!cartItems.length ? "true" : "false"} />
    </div>
  );
};

export default Cart;
