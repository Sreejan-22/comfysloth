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
  return (
    <div>
      <Navbar />
      <BreadCrumbs arr={breadcrumbArr} />
      <Footer absolute="true" />
    </div>
  );
};

export default Checkout;
