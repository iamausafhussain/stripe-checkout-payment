import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StripePaymentCheckout from "./components/StripePaymentCheckout";
import CheckoutPage from "./components/CheckoutPage";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <StripePaymentCheckout />
      </Route>
      <Route exact path="/thankyou">
        <CheckoutPage />
      </Route>
    </Router>
  );
}

export default App;
