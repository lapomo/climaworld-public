import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import {
  Alert,
  ButtonGroup,
  Form,
  InputGroup,
  ToggleButton,
} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import CTAButton from "../CTAButton";

const stripePromise = loadStripe(
  "STRIPESECRET"
);
const reUrl = window.location.protocol + "//" + window.location.host;

/* 

  Component:  Donation
  Function: - show a donation form where user can select the amount and type of donation
            - redirects to stripe checkout page
  Tags:     STRIPE
 */
export default function Donation() {
  const [treeError, setTreeError] = useState(false);
  const [valueError, setValueError] = useState(false);
  const [donationError, setDonationError] = useState(false);
  const [donationType, setDonationType] = useState("Subscribe");

  const { currentUser } = useAuth();

  const sliderRef = useRef();
  const valueRef = useRef();
  const treeRef = useRef();

  const initDonationValue = 20;
  const minDonationValue = 5;
  const treeCost = 0.15;

  function sliderChanged() {
    console.log(sliderRef.current.value);
    const donationVal = sliderRef.current.value;
    valueRef.current.value = donationVal;
    treeRef.current.value = Math.round(donationVal / treeCost);
  }
  function valueChanged() {
    const donationVal = valueRef.current.value;
    if (donationVal < minDonationValue) {
      setValueError("*The minimum amount is " + minDonationValue);
    } else {
      setValueError(false);
      setTreeError(false);
      sliderRef.current.value = donationVal;
      treeRef.current.value = Math.round(donationVal / treeCost);
    }
  }
  function treeChanged() {
    const treeVal = treeRef.current.value;
    const donationVal = Math.round(treeVal * treeCost * 100) / 100;
    if (donationVal < minDonationValue) {
      setTreeError(
        "*The minimum trees you can plant is " +
          Math.round(minDonationValue * treeCost)
      );
    } else {
      setValueError(false);
      setTreeError(false);
      sliderRef.current.value = donationVal;
      valueRef.current.value = donationVal;
    }
  }

  async function handleDonationClick() {
    const amount = Number(valueRef.current.value);
    if (amount < minDonationValue) {
      setDonationError("*The minimum donation amount is " + minDonationValue);
    } else {
      try {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          lineItems: [
            {
              price:
                donationType == "Subscribe"
                  ? "price_1Lsxa1CQupVPzoGaFKsfaDIa"
                  : "price_1Lsxa1CQupVPzoGabBDuS9Eg",
              quantity: amount,
            },
          ],
          mode: donationType == "Subscribe" ? "subscription" : "payment",
          successUrl: reUrl + "/payment-success?amt=" + { amount },
          cancelUrl: reUrl + "/get-tickets",
          // clientReferenceId: user.id,
          // metadata: {'secret_metadata_userId_ref': 'thisisanId123'}
        });
        setDonationError(error.message);
      } catch (err) {
        setDonationError(err.message);
      }
    }
  }

  return (
    <div className="text-center">
      <div className="fw-bolder fs-4 mt-4">Donate</div>
      <div className="mt-2">
        Donate directly to plant trees without getting tickets for prize draws
      </div>
      {/* <Alert onClick={() => console.log("clide")} variant={currentUser ? "success" : "danger"}>{currentUser ? "You are logged in so the planted trees will appear in your forest" : "You are not logged in, the trees will not be added to your account. Click here to create a free account and the trees planted with this donation will be added to your forest!" }</Alert> */}
      <div className="mt-4 d-flex flex-column gap-4 justify-items-center">
        <div className="d-flex flex-wrap align-items-center">
          <Form.Range
            style={styles.slider}
            min={minDonationValue}
            defaultValue={initDonationValue}
            onChange={sliderChanged}
            ref={sliderRef}
          />
          <InputGroup className="mt-3" style={styles.valueInput}>
            <Form.Control
              placeholder="Input"
              defaultValue={initDonationValue}
              type="number"
              ref={valueRef}
              onChange={valueChanged}
            />
            <InputGroup.Text>£</InputGroup.Text>
          </InputGroup>
          {valueError && (
            <span className="" style={styles.error}>
              {valueError}
            </span>
          )}
          <InputGroup className="mt-3" style={styles.treeInput}>
            <Form.Control
              placeholder="Input"
              defaultValue={Math.round(initDonationValue / treeCost)}
              type="number"
              ref={treeRef}
              onChange={treeChanged}
            />
            <InputGroup.Text>🌳</InputGroup.Text>
          </InputGroup>
          {treeError && (
            <span className="" style={styles.error}>
              {treeError}
            </span>
          )}
        </div>

        <div className="d-flex gap-3 align-items-center">
          <div style={styles.donationType}>
            <ButtonGroup>
              {[
                { name: "One-time", value: "Donate" },
                { name: "Recurring", value: "Subscribe" },
              ].map((radio, index) => (
                <ToggleButton
                  key={index}
                  id={`radio-${index}`}
                  type="radio"
                  name="radio"
                  variant={index == 1 ? "outline-success" : "outline-dark"}
                  value={radio.value}
                  checked={donationType === radio.value}
                  onChange={(e) => setDonationType(radio.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
              {/* <ToggleButton variant="outline-dark" checked={donationType === "onetime"}>One-time</ToggleButton>
                <ToggleButton variant="outline-success" checked={donationType === "subscription"}>Subscription</ToggleButton> */}
            </ButtonGroup>
          </div>
          <div className="" style={styles.donationButton}>
            <CTAButton
              disabled={valueError || treeError}
              text={donationType}
              handle_cta_click={handleDonationClick}
            />
          </div>
        </div>
        {donationError && <Alert variant="danger">{donationError}</Alert>}
      </div>
    </div>
  );
}

// slider--------------     amount trees
// one-time | subscribe     [donate/subscribe]

const styles = {
  slider: {
    // flex: 3
  },
  valueInput: {
    // flex: 1
  },
  treeInput: {
    // flex: 1.5
  },
  donationType: {
    // flex: 3
  },
  donationButton: {
    // flex: 2.5
    flex: "auto",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};
