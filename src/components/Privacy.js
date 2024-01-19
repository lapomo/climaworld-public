import privacyFile from "../assets/text/privacy.txt";

import React, { useEffect } from "react";
import { forwardRef } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useImperativeHandle } from "react";
import { ShieldIcon } from "../assets/img";

/* 

  Component:  Privacy
  Function: - shows the privacy policy
  
 */
export default forwardRef((props, ref) => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  useImperativeHandle(ref, () => ({
    getPrivacy,
  }));

  function getPrivacy() {
    if (!privacy) {
      fetch(privacyFile)
        .then((result) => {
          return result.text();
        })
        .then((data) => {
          setPrivacy(data);
        });
    }
    setShowPrivacy(true);
  }

  useEffect(() => {
    if (props.standalone){
      getPrivacy();
    }
  },[])


  return (
    <Modal
      show={showPrivacy}
      onHide={() => setShowPrivacy(false)}
      centered
      fullscreen={true}
    >
      <Modal.Header closeButton={props.standalone ? false : true}>
        <Modal.Title>
          <ShieldIcon width={32} /> Privacy Policy
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column text-center">
        <p style={{ whiteSpace: "pre-line" }}>
          {privacy ? privacy : <span>loading ...</span>}
        </p>
        <script
          id="CookieDeclaration"
          src="https://consent.cookiebot.com/09bcc26d-f98b-435f-b26d-02344866034f/cd.js"
          type="text/javascript"
          async
        ></script>
      </Modal.Body>
    </Modal>
  );
});
