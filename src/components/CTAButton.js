import React from "react";
import { Button } from "react-bootstrap";

/* 

  Component:  CTA Button
  Function: - the main button for all CTAs

 */
export default function CTAButton({disabled, type, handle_cta_click, text, className, containerClassName, href, style}) {
  return (
    <a className={`w-100 ${containerClassName}`} style={style} href={href}>
    <Button
      className={`w-100 rounded-pill ${className}`}
      style={styles.flowButton}
      variant="success"
      onClick={handle_cta_click}
      disabled={disabled}
      type={type}
    >
      {text}
    </Button>
    </a>
  );
}

const styles = {
  flowButton: {
    padding: "0.7rem",
    fontWeight: "bold",
    // backgroundImage: "linear-gradient(#A6F77B, #2DBD6E)",
    backgroundColor: "var(--color-primary)",
    border: "none",
  },
};
