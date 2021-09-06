import Navbar from "../../components/Navbar/Navbar";
import Intro from "../../components/Intro/Intro";
import Featured from "../../components/Featured/Featured";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <Intro />
      <Featured />
    </div>
  );
};

export default Home;
