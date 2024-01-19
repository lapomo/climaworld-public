import React, { useRef, useState } from "react";
import { Alert, Form, Image, InputGroup, Modal } from "react-bootstrap";
import { CheckIcon, earth, MailIcon } from "../../../assets/img";
import { useApi } from "../../../contexts/ApiContext";
import { useAppContext } from "../../../contexts/AppContext";

import "./EnterEmail.css";
import ErrorComponent from "../../../components/ErrorComponent";
import LoadingEarth from "../../../components/LoadingEarth";
import { useLocation, useNavigate } from "react-router-dom";
import GoBack from "./GoBack";
import { validateEmail } from "../../../utility/validate";
import { useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import CTAInputComponent from "./CTAInputComponent";
import SignUpComponent from "./SignUpComponent";

export default function EnterEmail({ theme, layout, className, style }) {
  const { createUser, subscribe } = useApi();
  const app = useAppContext();
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [enterEmailError, setEnterEmailError] = useState(false);
  const [enterEmailSuccess, setEnterEmailSuccess] = useState(false);
  const [validateError, setValidateError] = useState(false);
  const [legalTickValidationError, setLegalTickValidationError] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const [isBillionaire, setIsBillionaire] = useState(false);
  const [isNotEligible, setIsNotEligible] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const [isUS, setIsUS] = useState(true);
  const [isProject, setIsProject] = useState();
  const [isBusiness, setIsBusiness] = useState(false);

  const nameRef = useRef();
  const enterEmailRef = useRef();
  const legalTickRef = useRef();

  useEffect(() => {
    setIsBillionaire(false);
    setIsNotEligible(false);
    setIsEligible(false);
    setIsUS(false);
    setIsProject(false);
    setIsBusiness(false);
    switch (location.pathname) {
      case "/billionaire":
        setIsBillionaire(true);
        setButtonText("Request an Entry");
        break;
      case "/us":
        setIsUS(true);
        setButtonText("Join the waiting list");
        break;
      case "/project-partner":
        setIsProject(true);
        setButtonText("Get in touch");
        break;
      case "/business":
        setIsBusiness(true);
        setButtonText("Get in touch");
        break;
      default:
        if (app.isEligible) {
          setIsEligible(true);
          setButtonText("Join ClimaWorld");
        } else {
          setIsNotEligible(true);
          setButtonText("Notify me");
        }
    }
  }, [location, app.isEligible]);

  async function handleEnterEmailClick() {
    const email = String(enterEmailRef.current?.value)
      .toLowerCase()
      .replace(/\s+/g, "");
    let validated = true;
    setValidateError(false);
    setLegalTickValidationError(false);
    if (!validateEmail(email)) {
      setValidateError("Please enter a valid email.");
      validated = false;
    }
    const name = nameRef.current?.value;
    if (isProject && (!name || name === "")) {
      setValidateError("Please enter the name of your project");
    }
    if (!legalTickRef.current.checked) {
      setLegalTickValidationError("Please agree in order to continue");
      validated = false;
    }
    if (validated) {
      // show loading and disable button
      setIsLoading(true);
      // reset feedback messages
      setValidateError(false);
      setEnterEmailError(false);
      setEnterEmailSuccess(false);

      if (isBusiness || isProject || isNotEligible || isUS || isBillionaire) {
        // send an entry to waitinglist table in database
        // { email: email, id: id, info: info}
        const id = String(Date.now() + "K" + Math.floor(Math.random() * 99));
        const response = await subscribe(email, id, {
          location: location.pathname,
          country: app.locale?.country_code,
        });
        if (response.status === "success") {
          setEnterEmailSuccess(
            "Amazing! Check your inbox to confirm your email"
          );
        } else {
          setEnterEmailError(response.message);
        }
      } else if (isEligible) {
        // send api call
        const responseUser = await createUser({
          email: email,
          country: app.locale?.country_code,
        });
        if (responseUser.status === "success") {
          if (responseUser.response.success) {
            console.log(JSON.stringify(responseUser));
            await auth.signup(
              responseUser.response.body.id,
              responseUser.response.body.meta.tempPassword,
              email
            );
            setEnterEmailSuccess("Success!");
          } else {
            navigate("/login", {
              state: {
                message: {
                  type: "success",
                  text: "You already subscribed. You can find your login details in the email we sent you or you can reset your password.",
                },
                email: email,
              },
            });
          }
        } else {
          setEnterEmailError(responseUser.message);
        }
      }
      setIsLoading(false);
    }
  }

  function handleSetPasswordClick() {
    console.log("password set");
    setShowPasswordInput(false);
  }

  const EnterEmailSuccessComponent = () => {
    return (
      <Alert
        className="d-flex align-items-center"
        style={layout !== "stacked" ? { maxWidth: "520px" } : {}}
        variant="success"
      >
        <CheckIcon className="mx-2 flex-shrink-0" height={40} />
        <span className="ps-2 text-start">{enterEmailSuccess}</span>
      </Alert>
    );
  };

  const tickText = (
    <div>
      I agree to{" "}
      <a
        href="https://climaworld.app/terms"
        target="_blank"
        style={{ color: "inherit" }}
      >
        T&C
      </a>{" "}
      and{" "}
      <a
        href="https://climaworld.app/privacy"
        target="_blank"
        style={{ color: "inherit" }}
      >
        Privacy Policy
      </a>
      .
    </div>
  );

  return (
    <div className={`${className} px-3 w-100`}>
      {enterEmailSuccess && <EnterEmailSuccessComponent />}
      {isLoading && <LoadingEarth />}
      {!enterEmailSuccess && !isLoading && (
        <>
          {location.pathname === "/enter" && (
            <div className="py-5">
              <h1 className=" text-center" style={{ color: "white" }}>
                Enter your email to create your account
              </h1>
            </div>
          )}
          {isProject && (
            <div
              className={`mb-3 enterEmail-group border rounded-pill w-100 ${theme}`}
              style={{
                maxWidth: layout !== "stacked" ? "520px" : "",
                boxShadow: "0px 0px 13px 0px grey",
                backgroundColor: "var(--c-bg2)"
              }}
            >
              <Form.Control
                ref={nameRef}
                onKeyUp={(e) => e.key === "Enter" && handleEnterEmailClick()}
                className="border-0 ps-4 py-3 text-center text-sm-start"
                style={{
                  backgroundColor: "transparent",
                  boxShadow: "0 0",
                }}
                placeholder="Project Name"
                id="cw-enter-projectname"
                // autoComplete="email"
                // defaultValue={app.entryTempStorage?.email}
              />
            </div>
          )}
          {isEligible && 
          <SignUpComponent />}
          {!isEligible &&
          <><InputGroup
              className={`enterEmail-group border rounded-pill w-100 ${theme}`}
              style={{
                maxWidth: layout !== "stacked" ? "520px" : "",
                boxShadow: "0px 0px 13px 0px grey",
                backgroundColor: "var(--c-bg2)"
              }}
            >
              <Form.Control
                ref={enterEmailRef}
                // autoFocus
                onKeyUp={(e) => e.key === "Enter" && handleEnterEmailClick()}
                className="border-0 ps-4 py-3 text-center text-sm-start"
                style={{
                  backgroundColor: "transparent",
                  boxShadow: "0 0",
                }}
                placeholder="Email Address"
                id="cw-enter-email"
                autoComplete="email"
                defaultValue={app.entryTempStorage?.email} />
              <button
                disabled={isLoading}
                className={`${layout === "stacked" ? "d-none" : "d-none d-sm-block"} shadow rounded-pill py-3 px-5 fw-bold`}
                style={styles.enterEmailButton}
                onClick={handleEnterEmailClick}
              >
                {buttonText}
              </button>
            </InputGroup><div>
                <button
                  disabled={isLoading}
                  className={`${layout === "stacked" ? "" : "d-sm-none"} shadow rounded-pill mt-3 w-100 py-3 px-5 fw-bold`}
                  style={styles.enterEmailButton}
                  onClick={handleEnterEmailClick}
                >
                  {buttonText}
                </button>
              </div></>}
          {validateError && (
            <div
              className="mt-2 text-start px-4"
              style={{ color: "var(--c-txt1)", fontSize: "14px" }}
            >
              {validateError}
            </div>
          )}
          {!isEligible && <div
            className="ps-4 pt-3 text-start"
            style={{ color: theme === "dark" && "white" }}
          >
            <Form.Check
              ref={legalTickRef}
              label={tickText}
              type="checkbox"
              id="legalTickBox"
              disabled={isLoading}
            />
            {legalTickValidationError && (
              <div style={{ color: "var(--c-txt1)", fontSize: "14px" }}>
                {legalTickValidationError}
              </div>
            )}
          </div>}
          {/* {isEligible && (
            <div
              className="ps-4 pt-3 text-start"
              style={{
                fontSize: "14px",
                textDecoration: "underline",
                color: "#d9d9d9",
              }}
              onClick={() => setShowModal(true)}
            >
              <MailIcon
                width={16}
                fill="#d9d9d9"
                style={{ marginRight: ".5em" }}
              />
              Enter for free by post
            </div>
          )} */}
          {location.pathname === "/enter" && (
            <div className="pt-3 text-center">
              <GoBack to="/" />
            </div>
          )}
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Free entry by post</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>
                On a 3x5 card, handprint your full name, complete address, phone
                number (including area code), date of birth, email address
                (optional). Please mail in an envelope with a proper postage
                affixed to:
              </p>
              <p>
                ClimaWorld, Inc.<br></br>600 N Broad St, Ste 5 PMB 2134<br></br>
                Middletown, DE 19709<br></br>USA
              </p>
              <p>
                1x Mail in entry per person or household. Entries will only be
                valid for the period in which they are received
              </p>
            </Modal.Body>
          </Modal>
          {enterEmailError && <ErrorComponent error={enterEmailError} />}
        </>
      )}
    </div>
  );
}

const styles = {
  enterEmailButton: {
    border: "1px solid",
    color: "var(--color-primary-inverted)",
    backgroundColor: "var(--color-primary)",
    boxShadow: "grey 0px 0px 13px 0px !important",
    // color: "#54a8b3",
    // backgroundColor: "white",
  },
};
