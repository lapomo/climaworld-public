import React from "react";
import { Form } from "react-bootstrap";

export default function AcceptTerms({acceptTermsRef}) {

  return (
    <div>
      <Form.Check
        ref={acceptTermsRef}
        label={acceptTermsText}
        type="checkbox"
        id="cw-signup-acceptterms"
      />
    </div>
  );
}

const acceptTermsText = (
  <div>
    I agree to{" "}
    <a
      href="https://climaworld.app/terms"
      target="_blank"
      style={{ color: "inherit" }}
    >
      T&C
    </a>{" "}
    and{" "}
    <a
      href="https://climaworld.app/privacy"
      target="_blank"
      style={{ color: "inherit" }}
    >
      Privacy Policy
    </a>
    .
  </div>
);
