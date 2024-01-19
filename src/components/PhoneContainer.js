import React from "react";
import { Container } from "react-bootstrap";

/* 

  Component:  Phone Container
  Function: - provide a container for app pages
  
 */
export default function PhoneContainer(props) {
  return (
    <Container
      className="d-flex flex-column align-items-center"
      style={{ height: "100vh" }}
    >
      <div
        className="w-100 d-flex flex-column align-items-center p-2"
        style={{ maxWidth: "600px" }} // before 400px
      >
        {props.children}
      </div>
    </Container>
  );
}
