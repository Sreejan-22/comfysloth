import BreadCrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Footer from "../../components/Footer/Footer";
import store from "../../assets/store.jpeg";
import "./About.scss";

const breadcrumbArr = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "About",
    path: null,
  },
];

const About = () => {
  return (
    <div>
      <BreadCrumbs arr={breadcrumbArr} />
      <div className="about-content">
        <div>
          <img src={store} alt="" />
        </div>
        <div>
          <h1>Our Story</h1>
          <div className="under-line"></div>
          <br />
          <br />
          <h4>
            A long tradition of making furniture now becomes an online venture.
            Our mission is to create world-class and best quality products.
          </h4>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
