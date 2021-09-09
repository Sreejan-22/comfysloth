import "./Product.scss";

const Product = ({ image, name, price }) => {
  return (
    <div className="pdt">
      <img src={image} alt="" />
      <div>
        <span style={{ color: "#102a42" }}>{name}</span>
        <span>&#8377;{price}</span>
      </div>
    </div>
  );
};

export default Product;
