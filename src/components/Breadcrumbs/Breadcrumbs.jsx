import { Link } from "react-router-dom";
import "./Breadcrumbs.scss";

const BreadCrumbs = ({ arr }) => {
  return (
    <div className="breadcrumb">
      <h1>
        {arr.map((item) => (
          <span key={item.text}>
            {item.path ? (
              <>
                <Link to={item.path}>{item.text}</Link>&nbsp; / &nbsp;
              </>
            ) : (
              item.text
            )}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default BreadCrumbs;
