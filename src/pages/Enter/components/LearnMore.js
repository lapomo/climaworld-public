import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function LearnMore({text}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className="pt-3 text-center"
        style={{ textDecoration: "underline", cursor: "pointer" }}
        onClick={() => setShowModal(true)}
      >
        Learn more
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Learn more</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {text}
        </Modal.Body>
      </Modal>
    </>
  );
}
