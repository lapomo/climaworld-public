import React, { useRef, useState } from "react";

import CTAButton from "../../CTAButton";
import SingleInput from "../../SingleInput";

import edenProject from "../../../assets/img/logos/edenprojects.svg";

import { Image } from "react-bootstrap";

/* 

  Component:  Sign Up Name
  Function: - show form for user to input a name
            - forward input to higher component

  TODO: get real first and last name, show information that the name can be anonymised later
 */
export default function SignUpName({ setUsername, setCountry, continueFlow }) {
  const [error, setError] = useState(false);
  const [countryError, setCountryError] = useState();
  const [country, setSelectedCountry] = useState();

  const inputRef = useRef();

  function validateName(name) {
    // console.log(name);
    let res = /^$|\s+/;
    return !res.test(name);
  }
  function validateCountry(country) {
    // console.log(country);
    return country && country !== "";
  }

  function handleSubmit() {
    setError(false);
    setCountryError(false);
    const value = inputRef.current.value;
    let flag = true;
    if (!validateName(value)) {
      flag = false;
      setError("*Please enter a username without spaces");
    }
    if (!validateCountry(country)) {
      flag = false;
      setCountryError("*Please select one of the options to proceed");
    }
    if (flag) {
      setError(false);
      setUsername(value);
      setCountry(country);
      continueFlow();
    }
  }
  return (
    <div>
      <h2 className="fw-bolder">Plant a Tree, for free</h2>
      <p className="mt-5 px-2">
        We'll give you your own digital forest where you can track your climate
        contributions
      </p>
      <SingleInput
        type="text"
        placeholder="Username"
        inputRef={inputRef}
        error={error}
        handleEnter={handleSubmit}
        elements={
          <CountryPicker
            className="w-100 mt-3"
            error={countryError}
            setSelectedCountry={setSelectedCountry}
          />
        }
      />

      {/* <CountryPicker className="mt-3" /> */}

      <CTAButton
        className="mt-4"
        handle_cta_click={handleSubmit}
        text={"Plant a tree"}
      />
      <p className="mt-5 mb-0">Trees planted in partnership with:</p>
      <Image className="mt-4 w-50 align-self-center" src={edenProject} />
    </div>
  );
}
