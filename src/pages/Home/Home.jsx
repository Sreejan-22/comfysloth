import Intro from "../../components/Intro/Intro";
import Featured from "../../components/Featured/Featured";
import Footer from "../../components/Footer/Footer";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home-container">
      <Intro />
      <Featured />
      <Footer />
    </div>
  );
};

export default Home;
