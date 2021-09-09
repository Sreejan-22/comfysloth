import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import BreadCrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Footer from "../../components/Footer/Footer";
import StyledButton from "../../components/StyledButton/StyledButton";
import "./SingleProduct.scss";

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
  const [productData, setproductData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log(id);
    fetch(`https://course-api.com/react-store-single-product?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setproductData(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />
      {loading ? (
        <h1 style={{ textAlign: "center", marginTop: "10rem" }}>Loading...</h1>
      ) : (
        <>
          <BreadCrumbs arr={breadcrumbArr} />
          <div className="main-section">
            <StyledButton
              text="Back to Products"
              onClickFn={() => history.push("/products")}
              className="backToProducts-btn"
            />
            <div className="pdt-details">
              <div className="pdt-images">
                <img
                  src={productData.images[0].url}
                  alt=""
                  className="big-img"
                />
                <div className="small-images">
                  {productData.images.map((item) => (
                    <img src={item.thumbnails.small.url} alt="" />
                  ))}
                </div>
              </div>
              <div className="pdt-decscription">
                <h1>{productData.name}</h1>
                <br />
                <br />
                <h3>&#8377;{productData.price}</h3>
                <br />
                <br />
                <div>{productData.description}</div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default SingleProduct;
