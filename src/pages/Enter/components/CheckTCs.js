import React from "react";
import { forwardRef } from "react";
import { Form } from "react-bootstrap";

export default forwardRef((props, ref) => {

  const tickText = (
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
  return (
    <div
      className={`${props.className || ""} ps-4 pt-3 text-start`}
      style={{ color: "white" }}
    >
      <Form.Check
        ref={ref}
        label={tickText}
        type="checkbox"
        id="legalTickBox"
        disabled={props.disabled}
      />
    </div>
  );
})
