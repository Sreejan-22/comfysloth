import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const SingleProduct = () => {
  let { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Single Product</h1>
    </div>
  );
};

export default SingleProduct;
