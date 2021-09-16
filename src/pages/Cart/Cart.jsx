import Navbar from "../../components/Navbar/Navbar";
import BreadCrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Footer from "../../components/Footer/Footer";
import DeleteIcon from "@material-ui/icons/Delete";
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
  return (
    <div>
      <Navbar />
      <BreadCrumbs arr={breadcrumbArr} />
      <div className="cart-wrapper">
        <div className="cart-container">
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
          <div className="cart-item">
            <div className="cart-item-name">
              <img
                src="https://dl.airtable.com/.attachments/e2eef862d9b7a2fb0aa74fa24fbf97bb/25c4bc17/0-pexels-pixabay-462235.jpg"
                alt=""
              />
              <h4 className="capitalize">modern poster</h4>
            </div>
            <div className="cart-item-price">₹774.75</div>
            <div className="cart-item-qty">
              <span
                style={{ position: "relative", top: "-7px" }}
                // onClick={decrement}
              >
                _
              </span>
              <div style={{ fontSize: "2rem" }}>1</div>
              <span /*onClick={increment}*/>+</span>
            </div>
            <h4 className="cart-item-subtotal">₹1549.50</h4>
            <DeleteIcon className="delete-cart-item" htmlColor="red" />
          </div>
          <div className="cart-item">
            <div className="cart-item-name">
              <img
                src="https://dl.airtable.com/.attachments/4197bf0b9c139435ced145c2613b0b1d/1bbc5b2d/suade-armchair.jpeg"
                alt=""
              />
              <h4 className="capitalize">suede armchair</h4>
            </div>
            <div className="cart-item-price">₹58,749.75</div>
            <div className="cart-item-qty">
              <span
                style={{ position: "relative", top: "-7px" }}
                // onClick={decrement}
              >
                _
              </span>
              <div style={{ fontSize: "2rem" }}>1</div>
              <span /*onClick={increment}*/>+</span>
            </div>
            <h4 className="cart-item-subtotal">₹1549.50</h4>
            <DeleteIcon className="delete-cart-item" htmlColor="red" />
          </div>
          <div className="cart-item">
            <div className="cart-item-name">
              <img
                src="https://dl.airtable.com/.attachments/2581b1487fb0dd13c4abea9274f72f25/9304207f/pexels-dominika-roseclay-1139785.jpg"
                alt=""
              />
              <h4 className="capitalize">wooden table</h4>
            </div>
            <div className="cart-item-price">₹774.75</div>
            <div className="cart-item-qty">
              <span
                style={{ position: "relative", top: "-7px" }}
                // onClick={decrement}
              >
                _
              </span>
              <div style={{ fontSize: "2rem" }}>1</div>
              <span /*onClick={increment}*/>+</span>
            </div>
            <h4 className="cart-item-subtotal">₹1549.50</h4>
            <DeleteIcon className="delete-cart-item" htmlColor="red" />
          </div>
          <hr style={{ borderTop: "1px solid #bcccdc" }} />
          <div className="cart-other-links">
            <button>Continue Shopping</button>
            <button className="clear-cart-btn">Clear Shopping Cart</button>
          </div>
          <div className="cart-order-wrapper">
            <div className="cart-order">
              <div className="cart-order-content">
                <h4>
                  Subtotal <span>₹60149.50</span>
                </h4>
                <p>
                  Shipping fee <span>₹133.50</span>
                </p>
                <hr />
                <h3>
                  Order Total <span>₹60283</span>
                </h3>
              </div>
              <button className="checkout-btn">Login</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
