import React, { useState } from "react";
import Stripe from "stripe";

function App() {
  const stripe = Stripe(
    "pk_test_51I0laqARXzKvrwSUrR6C2Y2DdI01fofrHCoujDF3TCvxvlTyoJyWRh5ZMCJkhwuZy7Y3A5d0z8pHOD24oDcwNbPl00fnIC6kXV"
  );

  const [quantity, setQuantity] = useState(3);

  const handlePay = () => {
    fetch("/crete-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: quantity.value,
      }),
    })
      .then((res) => res.json())
      .then((session) => {
        stripe.redirectToCheckout({
          sesstionId: session.id,
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleInput = (e) => {
    setQuantity(e.target.value);
    console.log(quantity);
  };

  return (
    <div>
      <div>
        <div>
          <h1>Office Hours</h1>
          <input
            type="number"
            step="1"
            className="quantity"
            value={quantity}
            onChange={handleInput}
          />
          <button type="submit" className="button" onClick={handlePay}>
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
