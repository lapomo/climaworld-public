import React, { useRef } from "react";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

import "./CTAInputComponent.css";

export default function CTAInputComponent({
  className,
  buttonText,
  onClick,
  placeholder,
  autoComplete,
  defaultValue,
  isLoading,
}) {
  const inputRef = useRef();

  return (
    <div className={`${className} ctainputcomponent`}>
      <InputGroup
        className={` ctainputcomponent-group dark border rounded-pill w-100`}
        style={{backgroundColor: "var(--c-bg2)"}}
      >
        <Form.Control
          className="border-0 ps-4 py-3 text-center text-md-start"
          style={{ backgroundColor: "transparent", boxShadow: "0 0" }}
          ref={inputRef}
          placeholder={placeholder}
          id={`cw-ctainputcomponent-${autoComplete}`}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          onKeyUp={(e) => e.key === "Enter" && onClick(inputRef.current.value)}
        />
        <button
          className="ctainputcomponent-button d-none d-md-block shadow rounded-pill py-3 px-5 fw-bold"
          disabled={isLoading}
          onClick={() => onClick(inputRef.current.value)}
        >
          {buttonText}
        </button>
      </InputGroup>
      <div>
        <button
          className="ctainputcomponent-button d-md-none shadow rounded-pill py-3 px-5 fw-bold mt-3 w-100"
          disabled={isLoading}
          onClick={() => onClick(inputRef.current.value)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
