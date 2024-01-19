import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  HeartIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  WhatsappIcon,
} from "../assets/img";
import company from "../assets/text/company";

/* 

  Component:  About Us
  Function: - show some info about ourselves
            - show options to get in touch

 */
export default forwardRef((props, ref) => {
  const [showContact, setShowContact] = useState();

  useImperativeHandle(ref, () => ({
    setShowContact,
  }));

  return (
    <Modal show={showContact} onHide={() => setShowContact(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.title} <HeartIcon width={32} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column text-center">
        <span className="mb-3">
          We would <b>love</b> to
        </span>
        <span>~ hear your feedback </span>
        <span>~ answer your questions </span>
        <span>~ talk with you about our mission </span>
        <div className="mt-3 mb-3">
          Please contact us via{" "}
          <a
            href={`mailto:${company.mail}`}
            title="Send us an Email!"
            style={{ color: "inherit" }}
          >
            email
          </a>{" "}
          or set up a{" "}
          <a
            href={company.links.zcal}
            target="_blank"
            rel="noreferrer"
            title="Set up a meeting with us!"
            style={{ color: "inherit" }}
          >
            meeting
          </a>{" "}
          with us directly!
        </div>
        <p>See you there :)</p>
        <p></p>
        <p>
          You can also get in touch with us via your preferred social media
          platform:
        </p>
        <div className="d-flex justify-content-center gap-3 pb-3">
          <a href={company.links.linkedin} target="_blank" rel="noreferrer">
            <LinkedInIcon height={45} />
          </a>
          <a href={company.links.twitter} target="_blank" rel="noreferrer">
            <TwitterIcon height={45} />
          </a>
          <a href={company.links.instagram} target="_blank" rel="noreferrer">
            <InstagramIcon height={45} />
          </a>
          <a href={company.links.whatsapp} target="_blank" rel="noreferrer">
            <WhatsappIcon height={45} />
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
});