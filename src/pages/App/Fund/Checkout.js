import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useApi } from "../../../contexts/ApiContext";
import { useAppContext } from "../../../contexts/AppContext";
import CheckoutForm from "./CheckoutForm";

import "./Checkout.css";
import { Spinner } from "react-bootstrap";
import Loading from "../../../components/Loading";
import LoadingEarth from "../../../components/LoadingEarth";


export default function Checkout({ params }) {
  const [clientSecret, setClientSecret] = useState();
  // const [stripePromise, setStripePromise] = useState();

  const api = useApi();
  const app = useAppContext();

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  async function createPaymentIntent() {
    const sessionStorageKey = "stripePaymentIntent";
    if (
      sessionStorage.getItem(sessionStorageKey) &&
      new Date().getTime() - sessionStorage.getItem(sessionStorageKey) < 2000
    ) {
      console.log("repeated createIntent");
      return;
    }
    sessionStorage.setItem(sessionStorageKey, new Date().getTime());

    const result = await api.createStripeIntent({
      amount: params.paymentAmount,
      currency: app.locale.currency.currency_code,
      client_id: api?.user.id,
      email: api?.user.userdata.email,
      project: params.selectedProject,
      subscription: params.paymentFrequency === "recurring" ? true : false,
    });

    console.log(JSON.stringify(result));
    if (result.status === "success") {
      window.location.href = result.response.url;
      setClientSecret(result.response.clientSecret);
    } else {
      console.log(JSON.stringify(result));
    }
  }

  useEffect(() => {
    createPaymentIntent();
  }, []);

  return (
    <div className="p-3 d-flex justify-content-center">
      <LoadingEarth  />
    </div>
  );

  //   return (
  //     <div>
  //       {clientSecret && (
  //         <>
  //           {/* <div>Csheckout</div> */}
  //           <Elements options={options} stripe={stripePromise}>
  //             <CheckoutForm />
  //           </Elements>
  //         </>
  //       )}
  //     </div>
  //   );
}
