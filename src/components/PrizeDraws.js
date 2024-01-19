import prizedrawsFile from "../assets/text/prizedraws.txt";

import React, { useEffect } from "react";
import { forwardRef } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useImperativeHandle } from "react";
import { ShieldIcon } from "../assets/img";

/* 

  Component:  Prizedraws
  Function: - shows the prizedraws policy
  
 */
export default forwardRef((props, ref) => {
  const [showPrizedraws, setShowPrizedraws] = useState(false);
  const [prizedraws, setPrizedraws] = useState(false);

  useImperativeHandle(ref, () => ({
    getPrizedraws,
  }));

  function getPrizedraws() {
    if (!prizedraws) {
      fetch(prizedrawsFile)
        .then((result) => {
          return result.text();
        })
        .then((data) => {
          setPrizedraws(data);
        });
    }
    setShowPrizedraws(true);
  }

  useEffect(() => {
    if (props.standalone){
      getPrizedraws();
    }
  },[])


  return (
    <Modal
      show={showPrizedraws}
      onHide={() => setShowPrizedraws(false)}
      centered
      fullscreen={true}
    >
      <Modal.Header closeButton={props.standalone ? false : true}>
        <Modal.Title>
          <ShieldIcon width={32} /> Prize Draw Policy
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column text-center">
        <p style={{ whiteSpace: "pre-line" }}>
          {prizedraws ? prizedraws : <span>loading ...</span>}
        </p>
      </Modal.Body>
      <Modal.Footer className="justify-content-evenly p-4">
        <a href="ClimaWorld Prize Draw Policy.pdf" download>
          <Button variant="outline-dark">
            Download as pdf
          </Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
});
