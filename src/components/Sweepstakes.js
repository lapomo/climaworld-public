import sweepstakesFile from "../assets/text/sweepstakes.txt";

import React, { useEffect } from "react";
import { forwardRef } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useImperativeHandle } from "react";
import { ShieldIcon } from "../assets/img";

/* 

  Component:  Sweepstakes
  Function: - shows the sweepstakes policy
  
 */
export default forwardRef((props, ref) => {
  const [showSweepstakes, setShowSweepstakes] = useState(false);
  const [sweepstakes, setSweepstakes] = useState(false);

  useImperativeHandle(ref, () => ({
    getSweepstakes,
  }));

  function getSweepstakes() {
    if (!sweepstakes) {
      fetch(sweepstakesFile)
        .then((result) => {
          return result.text();
        })
        .then((data) => {
          setSweepstakes(data);
        });
    }
    setShowSweepstakes(true);
  }

  useEffect(() => {
    if (props.standalone){
      getSweepstakes();
    }
  },[])


  return (
    <Modal
      show={showSweepstakes}
      onHide={() => setShowSweepstakes(false)}
      centered
      fullscreen={true}
    >
      <Modal.Header closeButton={props.standalone ? false : true}>
        <Modal.Title>
          <ShieldIcon width={32} /> Sweepstakes Policy
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column text-center">
        <p style={{ whiteSpace: "pre-line" }}>
          {sweepstakes ? sweepstakes : <span>loading ...</span>}
        </p>
      </Modal.Body>
      <Modal.Footer className="justify-content-evenly p-4">
        <a href="ClimaWorld Sweepstakes Policy.pdf" download>
          <Button variant="outline-dark">
            Download as pdf
          </Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
});
