import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import CTAButton from "../CTAButton";
import Privacy from "../Privacy";
import SingleInput from "../SingleInput";
import Terms from "../Terms";

/* 

  Component:  Sign Up Password
  Function: - show form for user to input a password
            - forward input to higher component

 */
export default function SignUpPassword({ continueFlow, goBack }) {
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [termsTicked, setTermsTicked] = useState("init");

  const inputRef = useRef();
  const tickRef = useRef();
  const termRef = useRef();
  const privacyRef = useRef();

  const tickText = (
    <div>
      Agree to our{" "}
      <a
        href="#"
        onClick={() => termRef.current.getTerms()}
        style={{ color: "inherit" }}
      >
        T's&C's
      </a>{" "}
      and{" "}
      <a
        href="#"
        onClick={() => privacyRef.current.getPrivacy()}
        style={{ color: "inherit" }}
      >
        Privacy Policy
      </a>
      .
    </div>
  );

  function validatePassword(password) {
    // checks for > 8 chars with at least one special char
    let res = /^(?=.*[ -/:-@\[-`{-~]).{8,64}$/;
    return res.test(password);
  }

  function handleSubmit() {
    setDisabled(true);
    const value = inputRef.current.value;
    if (validatePassword(value)) {
      setError(false);
      if (!tickRef.current.checked) {
        setTermsTicked(false);
        setDisabled(false);
        return;
      }
      continueFlow(value);
    } else {
      setError("*Please enter a valid password");
      setDisabled(false);
    }
  }
  const styles = {
    checkBox: {
      // fontSize: "14px"
      color: termsTicked == "init" ? "grey" : termsTicked ? "green" : "red",
    },
  };
  return (
    <div>
      <h2 className="fw-bolder">Your password</h2>
      <p className="mt-5 px-2">
        Let's keep your account secure.<br></br>Choose a password with a minimum
        of 8 characters and 1 symbol.
      </p>
      <SingleInput
        type="password"
        placeholder="Password"
        inputRef={inputRef}
        error={error}
        handleEnter={handleSubmit}
      />
      <Form.Check
        className="mt-4 text-start mx-3"
        style={styles.checkBox}
        type="checkbox"
        label={tickText}
        ref={tickRef}
        onClick={() => setTermsTicked(tickRef.current.checked)}
      />
      <CTAButton
        disabled={disabled || !termsTicked}
        className="mt-4"
        handle_cta_click={handleSubmit}
        text={"Create my account"}
      />
      <Terms ref={termRef} />
      <Privacy ref={privacyRef} />
    </div>
  );
}
