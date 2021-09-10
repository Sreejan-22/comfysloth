import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Rating from "@material-ui/lab/Rating";
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
];

const useStyles = makeStyles({
  backToProducts: {
    marginBottom: "3rem",
    fontWeight: "300",
  },
});

const SingleProduct = () => {
  const classes = useStyles();
  let { id } = useParams();
  const history = useHistory();
  const [productData, setproductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  useEffect(() => {
    console.log(id);
    fetch(`https://course-api.com/react-store-single-product?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (breadcrumbArr.length === 2) {
          breadcrumbArr.push({
            text: data.name,
            path: null,
          });
        }
        setproductData(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));

    return () => breadcrumbArr.pop();
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
              className={classes.backToProducts}
            />
            <div className="main-content">
              <div className="pdt-images">
                <img
                  src={productData.images[0].url}
                  alt=""
                  className="big-img"
                />
                <div className="small-images">
                  {productData.images.map((item) => (
                    <img src={item.url} alt="" key={item.id} />
                  ))}
                </div>
              </div>
              <div className="pdt-details">
                <h1>{productData.name}</h1>
                <br />
                <h3 className="pdt-price">&#8377; {productData.price}</h3>
                <br />
                <div className="pdt-review">
                  <Rating name="read-only" value={productData.stars} readOnly />
                  <div>
                    &nbsp;&nbsp; ({productData.reviews} customer reviews)
                  </div>
                </div>
                <br />
                <div className="pdt-desc">{productData.description}</div>
                <br />
                <div className="pdt-info">
                  <span>Availability:&nbsp;&nbsp;&nbsp;</span>
                  <>{productData.stock ? "In stock" : "Out of stock"}</>
                </div>
                <div className="pdt-info">
                  <span>SKU:&nbsp;&nbsp;&nbsp;</span>
                  <>{productData.id}</>
                </div>
                <div className="pdt-info">
                  <span>Brand:&nbsp;&nbsp;&nbsp;</span>
                  <>{productData.company}</>
                </div>
                <div className="pdt-count">
                  <span style={{ position: "relative", top: "-10px" }}>_</span>
                  <div>{count}</div>
                  <span>+</span>
                </div>
                <StyledButton
                  text="Add to Card"
                  // onClickFn={() => history.push("/products")}
                  className={`${classes.backToProducts}`}
                />
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
