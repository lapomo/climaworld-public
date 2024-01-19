import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import { DiscordLogo, MailIcon, HeartIcon } from "../assets/img";

import Terms from "./Terms";
import { useRef } from "react";
import Privacy from "./Privacy";

/* 

  Component:  Footer
  Function: - show links to further information and display that info if clicked
  
 */
export default function Footer({ className }) {
  const [showSupport, setShowSupport] = useState(false);

  const termRef = useRef();
  const privacyRef = useRef();

  return (
    <>
      <div className={`mt-5 w-100 ${className}`} style={styles.footerContainer}>
        {/* <BackButton justAButton={true}/> */}
        <a
          href="#"
          onClick={() => termRef.current.getTerms()}
          style={{ color: "inherit" }}
        >
          Terms
        </a>
        |
        <a
          href="#"
          onClick={() => privacyRef.current.getPrivacy()}
          style={{ color: "inherit" }}
        >
          Privacy
        </a>
        |
        <a href="/" style={{ color: "inherit" }}>
          Homepage
        </a>
        |
        <a
          href="#"
          onClick={() => setShowSupport(true)}
          style={{ color: "inherit" }}
        >
          Chat Support
        </a>
      </div>

      <Modal show={showSupport} onHide={() => setShowSupport(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Support <HeartIcon width={32} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column text-center">
          <span className="mb-3">
            We would <b>love</b> to
          </span>
          <span>- hear your feedback -</span>
          <span>- answer all your questions and -</span>
          <span>- solve any problems you might have within the app -</span>
          <span className="mt-3 mb-3">
            Please contact us via email or join our discord channel to talk with
            us!
          </span>
          <span>See you there :)</span>
        </Modal.Body>
        <Modal.Footer className="justify-content-evenly p-4">
          <a href="mailto:support@climaworld.co.uk">
            <MailIcon width={55} />
          </a>
          <a href="https://discord.gg/yXU5E5UzdK" target="_blank">
            <DiscordLogo width={55} />
          </a>
        </Modal.Footer>
      </Modal>

      <Terms ref={termRef} />
      <Privacy ref={privacyRef} />
    </>
  );
}

const styles = {
  footerContainer: {
    display: "flex",
    justifyContent: "space-between",
    color: "#00000070",
    marginBottom: "80px",
    // position: "fixed",
    // bottom: "0",
    // maxWidth: "400px",
    // padding: "8px 20px",
    backgroundColor: "#fff",
  },
};
