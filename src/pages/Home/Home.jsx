import Navbar from "../../components/Navbar/Navbar";
import Intro from "../../components/Intro/Intro";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <Intro />
    </div>
  );
};

export default Home;
