import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://live.laposolutions.de/after-payment",
        //   receipt_email: email,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="cw-payment-form" onSubmit={handleSubmit}>
      {/* <div>CheckoutForm</div> */}
      <PaymentElement id="cw-payment-element" options={paymentElementOptions} />
      <button className="cw-payment-submit-btn" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="cw-spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="cw-payment-message">{message}</div>}
    </form>
  );
}
