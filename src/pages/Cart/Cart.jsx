import Navbar from "../../components/Navbar/Navbar";
import BreadCrumbs from "../../components/Breadcrumbs/Breadcrumbs";
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
    </div>
  );
};

export default Cart;
