import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import {
  ButtonGroup,
  Form,
  Image,
  InputGroup,
  Modal,
  ToggleButton,
} from "react-bootstrap";
import {
  climaworldLogo,
  edenprojectsLogo,
  MailIcon,
  theoceancleanupLogo,
  Verified,
} from "../../../assets/img";
import { useApi } from "../../../contexts/ApiContext";
import { useAppContext } from "../../../contexts/AppContext";
import { getProjectLogo } from "../../../utility/getProjects";
import AppContainer from "../components/AppContainer";
import PaymentOptions from "./PaymentOptions";

export default function FundForm() {
  const app = useAppContext();
  const api = useApi();
  const paymentAmountSliderRef = useRef();
  const paymentAmountInputRef = useRef();
  const [selectedProject, setSelectedProject] = useState("tree-planting");
  const [paymentFrequency, setPaymentFrequency] = useState("recurring");
  const [paymentAmount, setPaymentAmount] = useState(
    app.locale?.paymentAmount?.default
  );
  const [customAmount, setCustomAmount] = useState(false);
  const [paymentAmountError, setPaymentAmountError] = useState(false);

  const [showPostEntry, setShowPostEntry] = useState();

  function customValueChanged(type) {
    if (
      paymentAmountInputRef.current.value < app.locale?.paymentAmount?.minValue
    ) {
      setPaymentAmountError(
        "The minimum amount is " + app.locale?.paymentAmount?.minValue
      );
      setCustomAmount();
    } else {
      setPaymentAmount(paymentAmountInputRef.current.value);
    }
  }

  useEffect(() => {
    api.getProjects();
  }, []);
  return (
    <>
      <div className="pt-5 px-3 fs-4">
        Fund A Climate Project<br></br>& Enter The ClimaWorld Prize Draws
      </div>
      <div className="pt-5 px-3 d-flex flex-column gap-3 ">
        <div className="d-flex">
          <div className="d-flex gap-3 pb-3" style={{ overflowX: "auto" }}>
            {api.projects?.map((project, index) => {
              return (
                <ToggleButton
                  key={index}
                  id={`cw-selectProject-${index}`}
                  className="p-3 d-flex flex-column align-items-center gap-3"
                  type="radio"
                  name="cw-selectProjectRadio"
                  variant="cw-custom"
                  value={project.slug}
                  checked={selectedProject === project.slug}
                  onChange={(e) => setSelectedProject(project.slug)}
                  style={{ backgroundColor: "white" }}
                >
                  <Image height={60} src={getProjectLogo(project.slug)} />
                  <div>{project.name}</div>
                </ToggleButton>
              );
            })}
          </div>
        </div>
        <div style={style.infotext}>Select what project you want to fund</div>
      </div>
      {/* <div className="pt-5 d-flex flex-column align-items-center gap-3 ">
        <div>2. Select Payment Frequency</div>
        <div className="d-flex gap-3">
          {[
            { name: "One Time", value: "onetime" },
            { name: "Recurring monthly", value: "recurring" },
          ].map((radio, index) => (
            <ToggleButton
              key={index}
              id={`cw-paymentFrequency-${index}`}
              type="radio"
              name="cw-paymentFrequencyRadio"
              variant="outline-light"
              value={radio.value}
              checked={paymentFrequency === radio.value}
              onChange={(e) => setPaymentFrequency(radio.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </div>
      </div> */}
      <div className="pt-5 px-3 d-flex flex-column align-items-start gap-3 ">
        <div className="d-flex flex-wrap  gap-3">
          {app.locale.paymentAmount.boxes.map((amount, index) => {
            return (
              <div key={index}>
                <ToggleButton
                  key={`cw-fund-amount-${index}`}
                  id={`cw-fund-amount-${index}`}
                  name="paymentAmountRadio"
                  type="radio"
                  variant="cw-custom"
                  value={amount}
                  checked={String(paymentAmount) === String(amount)}
                  onChange={(e) => setPaymentAmount(e.currentTarget.value)}
                  style={{ backgroundColor: "white" }}
                >
                  {app.locale?.currency.currency_sign} {amount}
                </ToggleButton>
              </div>
            );
          })}
          <InputGroup style={{ width: "125px" }}>
            <InputGroup.Text>
              {app.locale?.currency.currency_sign}
            </InputGroup.Text>
            <Form.Control
              placeholder="Input"
              // defaultValue={app.locale?.paymentAmount?.default}
              type="number"
              ref={paymentAmountInputRef}
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.currentTarget.value)}
              //   min={app.locale?.paymentAmount?.minValue}
            />
          </InputGroup>
        </div>

        <div
          className="d-flex gap-3"
          style={{ width: "100%", maxWidth: "350px" }}
        >
          <Form.Range
            ref={paymentAmountSliderRef}
            min={app.locale?.paymentAmount?.minValue}
            defaultValue={app.locale?.paymentAmount?.default}
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.currentTarget.value)}
            style={{ flex: "2" }}
          />
        </div>

        {paymentAmount < app.locale?.paymentAmount?.minValue && (
          <span className="">
            The minimum amount is {app.locale?.paymentAmount?.minValue}
          </span>
        )}
        <div style={style.infotext}>
          Select or enter your monthly subscription amount
        </div>
      </div>
      <div className="pt-5 p-3 d-flex flex-column gap-3 ">
        <PaymentOptions
          params={{
            paymentFrequency: paymentFrequency,
            paymentAmount: paymentAmount,
            selectedProject: selectedProject,
          }}
        />

        {/* <div>Proceed to payment for your monthly subscription</div> */}
        <div
          className=" d-flex gap-2 align-items-center"
          style={style.infotext}
        >
          <div>
            <Verified fill="green" />
          </div>
          <div>Cancel anytime in your settings</div>
        </div>
        <div
          className=" d-flex gap-2 align-items-center"
          // className="ps-4 pt-3 text-start"
          style={{
            fontSize: "14px",
            // textDecoration: "underline",
            // color: "#d9d9d9",
          }}
          onClick={() => setShowPostEntry(true)}
        >
          <div>
          <MailIcon
            width={16}
            fill="currentColor"
            style={{ 
              margin: "4px",
              // marginRight: ".5em"
             }}
          /></div>
          <div>Alternatively enter by post</div>
        </div>
      </div>
      <Modal
        show={showPostEntry}
        onHide={() => setShowPostEntry(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter by post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>You can enter for free by post:</p>
          <p>
            On a 3x5 card, handprint your full name, complete address, phone
            number (including area code), date of birth, email address
            (optional) and the draw you would like to participate in. Please mail in an envelope with a proper postage affixed
            to:
          </p>
          <p>
            ClimaWorld, Inc.<br></br>600 N Broad St, Ste 5 PMB 2134<br></br>
            Middletown, DE 19709<br></br>USA
          </p>
          <p>
            1x entry per person or household. Entries will only be valid
            if they are received before the draw closes entries as shown in the countdown.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

const style = {
  infotext: {
    fontSize: "14px",
  },
};
