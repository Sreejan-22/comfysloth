import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./pages/Home/Home.jsx";
import Products from "./pages/Products/Products.jsx";
import SingleProduct from "./pages/SingleProduct/SingleProduct.jsx";
import About from "./pages/About/About.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Error from "./pages/PageNotFound/PageNotFound.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Loader from "./components/Loader/Loader";

import "./App.css";

function App() {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/products/:id" component={SingleProduct} />
          <Route path="/products" component={Products} />
          <Route path="/about" component={About} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout">
            {isAuthenticated ? <Checkout /> : loginWithRedirect}
          </Route>
          <Route exact path="/" component={Home} />
          <Route path="/" component={Error} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
