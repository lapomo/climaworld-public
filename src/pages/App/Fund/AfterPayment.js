import { Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import AppContainer from "../components/AppContainer";

const stripePromise = loadStripe(
  "STRIPESECRET"
);

export default function AfterPayment() {
  function CheckIntent() {
    const stripe = useStripe();
    const [paymentMessage, setPaymentMessage] = useState(false);

    useEffect(() => {
      console.log("Check for stripe");
      if (!stripe) {
        return;
      }

      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );

      if (!clientSecret) {
        return;
      }

      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        console.log(JSON.stringify(paymentIntent));
        switch (paymentIntent.status) {
          case "succeeded":
            setPaymentMessage("Payment succeeded");
            break;
          case "processing":
            setPaymentMessage("Your payment is processing");
            break;
          case "requires_payment_method":
            setPaymentMessage(
              "Your payment was not successful, please try again."
            );
            break;
          default:
            setPaymentMessage("Something went wrong.");
            break;
        }
      });
    }, [stripe]);

    return (
      <div className="d-flex justify-content-center">
        {paymentMessage && paymentMessage}
      </div>
    );
  }

  return (
    <AppContainer>
      <Elements stripe={stripePromise}>
        <CheckIntent />
      </Elements>
    </AppContainer>
  );
}
