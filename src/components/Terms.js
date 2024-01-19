import React, { useEffect } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { forwardRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { ScrollIcon } from "../assets/img";
import termsFile from "../assets/text/terms.txt";

/* 

  Component:  Terms
  Function: - shows Terms and Conditions and option to download them as pdf
  
 */
export default forwardRef((props, ref) => {
  const [showTerms, setShowTerms] = useState(false);
  const [terms, setTerms] = useState(false);

  useImperativeHandle(ref, () => ({
    getTerms,
  }));

  function getTerms() {
    if (!terms) {
      fetch(termsFile)
        .then((result) => {
          return result.text();
        })
        .then((data) => {
          setTerms(data);
        });
    }
    setShowTerms(true);
  }

  useEffect(() => {
    if (props.standalone){
      getTerms();
    }
  },[])

  return (
    <Modal
      show={showTerms}
      onHide={() => setShowTerms(false)}
      centered
      fullscreen={true}
    >
      <Modal.Header closeButton={props.standalone ? false : true}>
        <Modal.Title>
          <ScrollIcon width={32} /> Terms & Conditions
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column text-center">
        <p style={{ whiteSpace: "pre-line" }}>
          {terms ? terms : <span>loading ...</span>}
        </p>
      </Modal.Body>
      <Modal.Footer className="justify-content-evenly p-4">
        <a href="ClimaWorld Terms and Conditions.pdf" download>
          <Button variant="outline-dark">
            Download as pdf
          </Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
});
