import { useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import AppContainer from "../components/AppContainer";
import FundForm from "./FundForm";

export default function Fund() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  //TODO: check if already subscribed or payed for this draw period and show sth different instead
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("success")) {
      setPaymentSuccess(true);
    }
  }, []);

  const SubscriptionPaused = () => (
    <div className="pt-5 p-3 d-flex flex-column gap-3">
      <div className="">⏳ Payments are closed at the moment!</div>
      <div>❤️ We are working on improving ClimaWorld for you</div>
      <div>
        🌍 We are looking for humans helping us develop the product by answering
        questions and testing at different stages.
      </div>
      <div>💬 Feel free to get in touch with us!</div>
      <div>- Jon and Lapo, the Founders of ClimaWorld</div>
    </div>
  );

  return (
    <AppContainer>
      {true ? <SubscriptionPaused /> : paymentSuccess ? (
        <div className="pt-5 p-3 d-flex flex-column gap-3">
          <div className="">🥳 Your payment was successful!</div>
          <div>🌍 Your Impact is now updated on the climate page</div>
          <div>
            🏆 And check out your new prize draw entry on the prizes page!
          </div>
          <div>
            Thank you for your subscription, have fun and save the planet ❤️
          </div>
          <div>- Jon and Lapo, the Founders of ClimaWorld</div>
        </div>
      ) : (
        <FundForm />
      )}
    </AppContainer>
  );
}
