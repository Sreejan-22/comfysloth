import { useHistory } from "react-router-dom";
import "./Product.scss";

const Product = ({ image, name, price, id }) => {
  const history = useHistory();

  return (
    <div className="pdt" onClick={() => history.push(`/products/${id}`)}>
      <img src={image} alt="" />
      <div style={{ fontWeight: "500" }}>
        <span style={{ color: "#102a42" }} className="capitalize">
          {name}
        </span>
        <span>&#8377;{price}</span>
      </div>
    </div>
  );
};

export default Product;
