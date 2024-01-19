import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CTAButton from "../../../components/CTAButton";
import { useAppContext } from "../../../contexts/AppContext";
import Checkout from "./Checkout";

import "./PaymentOptions.css";

export default function PaymentOptions({ params }) {
  const app = useAppContext();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const paymentOptions = [
    {
      display_name: "Proceed with payment",
      slug: "card",
      paymentBox: <Checkout params={params} />,
    },
    // { display_name: "PayPal", slug: "paypal" },
    // { display_name: "Sofort", slug: "sofort" },
  ];

  return (
    <div className="d-flex gap-3 ">
      {paymentOptions.map((paymentOption, index) => {
        return (
          <div key={index}>
            <button
              disabled={
                params.paymentAmount < app.locale?.paymentAmount?.minValue
              }
              className="py-3 px-5 fw-bold rounded-pill shadow"
              onClick={() => setShowPaymentModal(paymentOption)}
              variant="cw-custom"
              size="lg"
              style={{
                border: "1px solid",
                color: "var(--color-primary-inverted)",
                backgroundColor: params.paymentAmount < app.locale?.paymentAmount?.minValue ? "var(--c-gs3)" : "var(--color-primary)",
                boxShadow: "grey 0px 0px 13px 0px !important",
                // padding: "0.7rem",
              }}
            >
              {paymentOption.display_name}
              {/* <div className="cw-fund-payemoji">🥳</div> */}
            </button>
          </div>
        );
      })}
      <Modal
        show={showPaymentModal}
        fullscreen
        // onHide={() => setShowPaymentModal(false)}
        // style={{backgroundColor: "gray"}}
        backdrop={false}
      >
        {/* <Modal.Header closeButton>{showPaymentModal.display_name}</Modal.Header> */}
        <Modal.Body className="d-flex align-items-center justify-content-center">
          {showPaymentModal.paymentBox}
        </Modal.Body>
      </Modal>
    </div>
  );
}
