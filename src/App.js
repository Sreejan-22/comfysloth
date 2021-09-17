import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth0ProviderWithHistory from "./Auth0Provider.js";
import Home from "./pages/Home/Home.jsx";
import Products from "./pages/Products/Products.jsx";
import SingleProduct from "./pages/SingleProduct/SingleProduct.jsx";
import About from "./pages/About/About.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Error from "./pages/Error/Error.jsx";

import "./App.css";

function App() {
  return (
    <Auth0ProviderWithHistory>
      <Router>
        <Switch>
          <Route path="/products/:id" component={SingleProduct} />
          <Route path="/products" component={Products} />
          <Route path="/about" component={About} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route exact path="/" component={Home} />
          <Route path="/" component={Error} />
        </Switch>
      </Router>
    </Auth0ProviderWithHistory>
  );
}

export default App;
