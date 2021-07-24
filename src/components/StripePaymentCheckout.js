import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "../styles/global.css";
import professional from "../images/professional.png";

const stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);

function App() {
  const [stripeError, setStripeError] = useState();
  const [loading, setLoading] = useState();

  const handleClick = async () => {
    setLoading(true);

    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: `${process.env.REACT_APP_STRIPE_PRICE_ID}`,
          quantity: 3,
        },
      ],
      mode: "payment",
      cancelUrl: window.location.origin,
      successUrl: `${window.location.origin}/thankyou`,
    });

    if (error) {
      setLoading(false);
      setStripeError(error);
    }
  };

  return (
    <>
      {stripeError && <p style={{ color: "red" }}> {stripeError} </p>}

      {/* <button role="link" onClick={handleClick} disabled={loading}>
        Proceed to Checkout
      </button> */}

      <div className="togethere-background"></div>
      <div className="sr-root">
        <div className="sr-main">
          <header className="sr-header">
            <div className="sr-header__logo"></div>
          </header>
          <h1>Choose a collaboration plan</h1>

          <div className="price-table-container">
            <section>
              <form>
                <input type="hidden" id="proPrice" name="priceId" />
                <img src={professional} height="120" width="120" />
                <div className="name">Professional</div>
                <div className="price">19,999 INR</div>
                <div className="duration">One Time Payment</div>
                <button
                  role="link"
                  onClick={handleClick}
                  disabled={loading}
                  id="pro-plan-btn"
                >
                  Proceed to Checkout
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
      <div id="error-message" classNameName="error-message"></div>
    </>
  );
}

export default App;
