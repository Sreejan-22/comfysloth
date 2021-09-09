import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import BreadCrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Footer from "../../components/Footer/Footer";

const breadcrumbArr = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Products",
    path: "/products",
  },
  {
    text: "Albany Sectional",
    path: null,
  },
];

const SingleProduct = () => {
  let { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    console.log(id);
    fetch(`https://course-api.com/react-store-single-product?id=${id}`)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />
      <BreadCrumbs arr={breadcrumbArr} />
      <Footer />
    </div>
  );
};

export default SingleProduct;
