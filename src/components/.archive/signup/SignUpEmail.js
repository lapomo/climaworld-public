import React, { useRef, useState } from "react";
import { useApi } from "../../../contexts/ApiContext";
import CTAButton from "../../CTAButton";
import SingleInput from "../../SingleInput";

/* 

  Component:  Sign Up Email
  Function: - show form for user to input email
            - foward input to higher component

 */
export default function SignUpEmail({ setEmail, continueFlow }) {
  const [error, setError] = useState(false);

  const { countrySupported } = useApi();

  const inputRef = useRef();

  function validateEmail(email) {
    let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return res.test(email);
  }

  function handleSubmit() {
    const value = inputRef.current.value;
    if (validateEmail(value)) {
      setError(false);
      setEmail(value);
      continueFlow();
    } else {
      setError("*Please enter a valid email");
    }
  }

  return (
    <div>
      <h2 className="fw-bolder">
        {countrySupported
          ? "Claim your free £100 prize draw ticket"
          : "Prize draws in your region soon!"}
      </h2>
      <p className="mt-5 px-2">
        {countrySupported
          ? "We reward users for taking action on climate change. We've given you a free ticket into our next prize draw. Enter your email to claim your ticket."
          : "We are excited to launch prize draws in your country soon. Get as many of your fellow nationals signed up as you can to make it happen even faster!"}
      </p>
      <SingleInput
        type="email"
        placeholder="Email"
        inputRef={inputRef}
        error={error}
        handleEnter={handleSubmit}
      />
      <CTAButton
        className="mt-4"
        handle_cta_click={handleSubmit}
        text={countrySupported ? "Claim my prize draw ticket" : "Submit Email"}
      />
    </div>
  );
}
