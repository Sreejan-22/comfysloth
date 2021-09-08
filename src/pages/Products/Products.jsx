import Navbar from "../../components/Navbar/Navbar";
import BreadCrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import "./Products.scss";

const breadcrumbArr = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Products",
    path: null,
  },
];

const Products = () => {
  return (
    <div>
      <Navbar />
      <BreadCrumbs arr={breadcrumbArr} />
    </div>
  );
};

export default Products;
