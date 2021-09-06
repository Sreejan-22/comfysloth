import Navbar from "../../components/Navbar/Navbar";
import Intro from "../../components/Intro/Intro";
import Featured from "../../components/Featured/Featured";
import Footer from "../../components/Footer/Footer";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <Intro />
      <Featured />
      <Footer />
    </div>
  );
};

export default Home;
