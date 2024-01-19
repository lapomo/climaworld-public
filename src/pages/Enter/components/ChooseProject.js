import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useState } from "react";
import CTAButton from "../../../components/CTAButton";
import { useApi } from "../../../contexts/ApiContext";
import { useAppContext } from "../../../contexts/AppContext";
import ErrorComponent from "../../../components/ErrorComponent";
import ProjectCarouselwPops from "../../../components/ProjectCarouselwPops";
import LearnMore from "./LearnMore";
import GoBack from "./GoBack";

export default function ChooseProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [validateError, setValidateError] = useState(false);
  const [error, setError] = useState(false);

  const { updateUser } = useApi();
  const app = useAppContext();

  function chooseCurrency() {
    const eur = [ 
      "BE",
    "BG",
    "CZ",
    "DK",
    "DE",
    "EE",
    "IE",
    "EL",
    "ES",
    "GR",
    "FR",
    "HR",
    "IT",
    "CY",
    "LV",
    "LT",
    "LU",
    "HU",
    "MT",
    "NL",
    "AT",
    "PL",
    "PT",
    "RO",
    "SI",
    "SK",
    "FI",
    "SE",]
    if(app.entryTempStorage.country === "GB"){
        return 'price_1MTSjiCQupVPzoGaxVAp8fNc';
    }else if (eur.includes(app.entryTempStorage.country)){
      return 'price_1MGlReCQupVPzoGatMNxzqbK';
    }else{
      return 'price_1MGk1jCQupVPzoGa5hAwuq17';
    }
  }

  async function handleClick() {
    if (!app.entryTempStorage.project) {
      setValidateError("Please select the project you want to fund");
      return;
    }
    setIsLoading(true);
    // update user with project
    const updateResponse = await updateUser(app.entryTempStorage.id, {
      "userdata.projects": [{ name: app.entryTempStorage.project }],
    });
    if (updateResponse.status === "success") {
      // forward to stripe checkout page
      // stripe will call api to update user data about payment and ticket
      const { error } = await loadStripe(
        "STRIPESECRET"
      )
        .then((stripe) =>
          stripe.redirectToCheckout({
            lineItems: [
              { price: chooseCurrency(), quantity: 1 },
            ],
            mode: "subscription",
            customerEmail: app.entryTempStorage.email,
            clientReferenceId: app.entryTempStorage.id,
            successUrl:
              window.location.protocol +
              "//" +
              window.location.host +
              "/enter?token=" +
              app.entryTempStorage.id,
            cancelUrl:
              window.location.protocol + "//" + window.location.host + "/enter",
          })
        )
        .catch((err) => setError(err));
      if (error) {
        setError(error);
      }
    } else {
      setError(updateResponse.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="py-5 p-3" style={{ color: "white", maxWidth: "450px" }}>
      <h3 className="text-center">Choose your project</h3>
      <ProjectCarouselwPops className="pt-5" selecting />
      {validateError && (
        <div className="ps-3 pt-3" style={{ color: "white", fontSize: "14px" }}>
          {validateError}
        </div>
      )}
      <CTAButton
        className="mt-5"
        handle_cta_click={handleClick}
        text="Fund the project"
      />
      {error && <ErrorComponent error={error} />}
      <LearnMore
        text={
          <div>
            Choose the project you want to fund for the next prize draw. You can
            change the project you want to fund for every new prize draw.
          </div>
        }
      />
      <div className="pt-3 text-center">
        <GoBack to={"1"} />
      </div>
    </div>
  );
}
