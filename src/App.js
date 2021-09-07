import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Products from "./pages/Products/Products.jsx";
import About from "./pages/About/About.jsx";
import Error from "./pages/Error/Error.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/products" component={Products} />
          <Route path="/about" component={About} />
          <Route exact path="/" component={Home} />
          <Route path="/" component={Error} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
