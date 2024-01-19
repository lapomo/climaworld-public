import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Form, Image } from "react-bootstrap";
import CountryPicker from "./CountryPicker";
import CTAButton from "../../../components/CTAButton";
import { useApi } from "../../../contexts/ApiContext";
import { useAppContext } from "../../../contexts/AppContext";
import ErrorComponent from "../../..//components/ErrorComponent";
import GoBack from "./GoBack";
import LearnMore from "./LearnMore";
import { climaworldWhiteLogo, TicketTemplate } from "../../../assets/img";

export default function NameTicket() {
  const [nameError, setNameError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [error, setError] = useState(false);

  const [country, setCountry] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef();
  const anonymRef = useRef();

  const { updateUser } = useApi();
  const app = useAppContext();

  async function handleClick() {
    const name = nameRef.current.value;

    setNameError(false);
    setCountryError(false);
    setError(false);
    setIsLoading(true);

    let validated = true;
    if (name === "") {
      setNameError("Please enter your name");
      validated = false;
    }
    if (!country) {
      setCountryError("Please select your country");
      validated = false;
    }
    if (validated) {
      // update user with name and country
      const updateResponse = await updateUser(app.entryTempStorage.id, {
        "userdata.name": name,
        "userdata.country": country,
        "userdata.anonymize": false // anonymRef.current.checked,
      });
      if (updateResponse.status === "success") {
        app.setEntryTempStorage({
          ...app.entryTempStorage,
          name: name,
          country: country,
          enterPage: "2",
          anonymize: anonymRef?.current?.checked
        });
      } else {
        setError(updateResponse.message);
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="p-3" style={{ color: "white", maxWidth: "450px"}}>
      
      <h3 className="text-center">Name your Entry</h3>
      <div className="mt-5 position-relative d-flex justify-content-center" >
        <TicketTemplate fill="var(--color-primary)" width={"100%"} />
        <Image
          className="position-absolute"
          src={climaworldWhiteLogo}
          style={{ width: "50%", top: "16px" }}
        />
        <div className="position-absolute top-0 bottom-0 start-0 end-0 d-flex flex-column justify-content-center align-items-center">
          <Form.Control
            ref={nameRef}
            className="w-75 text-center"
            // style={{ boxShadow: "0 0", }}
            placeholder="Your first and last name"
            disabled={isLoading}
            autoComplete="name"
            id="cw-enter-name"
            defaultValue={app.entryTempStorage.name}
          />
        </div>
        <div className="position-absolute" style={{ bottom: "21px" }}>
          1 Entry: $1000 prize game
        </div>
      </div>
      {nameError && (
        <div style={{ color: "white", fontSize: "14px" }}>{nameError}</div>
      )}
      <div className="d-flex justify-content-center">
        <CountryPicker
          className="pt-3 w-75"
          setSelectedCountry={setCountry}
          disabled={isLoading}
          defaultValue={app.entryTempStorage.country}
        />
      </div>
      {countryError && (
        <div style={{ color: "white", fontSize: "14px" }}>{countryError}</div>
      )}
      {/* <div className="pt-5 d-flex justify-content-center">
        <Form.Check
          className="mx-3 text-center"
          ref={anonymRef}
          label="Do not publish my surname and country if I am the winner of a prize"
          type="checkbox"
          id="anonymizeCheckbox"
          defaultValue={app.entryTempStorage.anonymize}
        />
      </div> */}
      <CTAButton
        className="mt-5"
        handle_cta_click={handleClick}
        disabled={isLoading}
        text={"Choose Your Project"}
      />
      {error && <ErrorComponent error={error} />}
      <LearnMore
        text={
          <div>
            <p>
              We need your name for the ticket in case you win the prize draw!
            </p>
            <p>
              Our prize games are 100% transparent and we can't give the prize
              to a stranger.
            </p>
            <p>
              At the moment we only support prize draws in certain countries, so
              we have to ask for your country of citizenship.
            </p>
          </div>
        }
      />
      <div className="pt-3 text-center">
      <GoBack to={"0"} />
      </div>
    </div>
  );
}
