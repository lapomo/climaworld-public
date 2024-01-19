import React, { useRef, useState } from "react";
import CTAButton from "../CTAButton";
import SingleInput from "../SingleInput";

/* 

  Component:  Sign Up Verify
  Function: - show form for user to input the verification code
            - option to resend the code
            - forward input to higher component

 */
export default function SignUpVerify({ email, continueFlow }) {
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const inputRef = useRef();

  function validateCode(code) {
    // checks for > 8 chars with at least one special char
    let res = /^[0-9]+$/;
    return res.test(code);
  }

  function handleSubmit() {
    setDisabled(true);
    const value = inputRef.current.value;
    if (validateCode(value)) {
      setError(false);
      continueFlow(value);
    } else {
      setError("*Please enter only numbers");
      setDisabled(false);
    }
  }

  function resendConfirmation() {
    continueFlow("resend");
  }

  return (
    <div>
      <h2 className="fw-bolder">Confirmation Code</h2>
      <p className="mt-5 px-2">
        Check your email inbox, we sent you a code at {email} :)
      </p>
      <SingleInput
        type="number"
        placeholder="Confirmation Code"
        inputRef={inputRef}
        error={error}
        handleEnter={handleSubmit}
      />
      <CTAButton
        disabled={disabled}
        className="mt-4"
        handle_cta_click={handleSubmit}
        text={"Go to the App"}
      />
      <div className="mt-3">
        <a href="#" onClick={resendConfirmation}>
          Resend Code
        </a>
      </div>
    </div>
  );
}
