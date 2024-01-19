import React from "react";
import { useState } from "react";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";
import { Image, Modal } from "react-bootstrap";
import {
  HeartIcon,
  jon,
  lapo,
  LinkedInIcon,
  MailIcon,
  Smiley,
  smiley,
  UmbrellasIcon,
} from "../assets/img";
import company from "../assets/text/company";

/* 

  Component:  About Us
  Function: - show some info about ourselves
            - show options to get in touch

 */
export default forwardRef((props, ref) => {
  const [showSupport, setShowSupport] = useState();

  useImperativeHandle(ref, () => ({
    setShowSupport,
  }));

  return (
    <Modal show={showSupport} onHide={() => setShowSupport(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.title} <HeartIcon width={32} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column text-center">
        <div>Hi! We are Jon and Lapo, the founders of ClimaWorld.<br></br><br></br>Our mission is to fight climate change.</div>
        <div
          className="d-flex justify-content-around mt-4"
          style={styles.avatars}
        >
          <div className="d-flex flex-column mb-3">
            <Image
              className="rounded-circle mb-1"
              src={jon}
              style={styles.avatar}
            />
            <span>Jon Mawson</span>
            <a href={company.founders.jon.linkedin}>
              <LinkedInIcon height={24} fill="var(--color-primary)" />
            </a>
          </div>
          <div className="d-flex flex-column mb-3">
            <Image
              className="rounded-circle mb-1"
              src={lapo}
              style={styles.avatar}
            />
            <span>Lapo Moreau</span>
            <a href={company.founders.lapo.linkedin}>
              <LinkedInIcon height={24} fill="var(--color-primary)" />
            </a>
          </div>
          {/* <Smiley className="rounded-circle"  style={styles.avatar}/> */}
        </div>
      </Modal.Body>
    </Modal>
  );
});

const styles = {
  avatars: {
    // gap: "20px",
  },
  avatar: {
    height: "100px",
  },
};
