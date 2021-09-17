import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cart.slice";
import { makeStyles } from "@material-ui/styles";
import Rating from "@material-ui/lab/Rating";
import Navbar from "../../components/Navbar/Navbar";
import BreadCrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Footer from "../../components/Footer/Footer";
import StyledButton from "../../components/StyledButton/StyledButton";
import Loader from "../../components/Loader/Loader";
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
  const [currImage, setCurrImage] = useState(null);
  const dispatch = useDispatch();
  // const { addToCart } = useSelector(cartSelector);

  useEffect(() => {
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
        setCurrImage(data.images[0].url);
        setLoading(false);
      })
      .catch((err) => console.log(err));

    return () => breadcrumbArr.pop();
  }, []);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count === 0) {
      return;
    }
    setCount(count - 1);
  };

  const handleAddToCart = () => {
    const item = {
      name: productData.name,
      id,
      img: productData.images[0].url,
      qty: count,
      price: productData.price,
      company: productData.company,
    };
    dispatch(addToCart(item));
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <>
          <br />
          <br />
          <br />
          <Loader />
        </>
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
                <img src={currImage} alt="" className="big-img" />
                <div className="small-images">
                  {productData.images.map((item) => (
                    <img
                      src={item.url}
                      alt=""
                      key={item.id}
                      onClick={() => setCurrImage(item.url)}
                      className={`${
                        currImage === item.url ? "active-img" : null
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="pdt-details">
                <h1 className="capitalize">{productData.name}</h1>
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
                <div className="pdt-info capitalize">
                  <span>SKU:&nbsp;&nbsp;&nbsp;</span>
                  <>{productData.id}</>
                </div>
                <div className="pdt-info capitalize">
                  <span>Brand:&nbsp;&nbsp;&nbsp;</span>
                  <>{productData.company}</>q
                </div>
                <div className="pdt-count">
                  <span
                    style={{ position: "relative", top: "-10px" }}
                    onClick={decrement}
                  >
                    _
                  </span>
                  <div>{count}</div>
                  <span onClick={increment}>+</span>
                </div>
                <StyledButton
                  text="Add to Cart"
                  className={`${classes.backToProducts}`}
                  onClickFn={() => {
                    handleAddToCart();
                    history.push("/cart");
                  }}
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
