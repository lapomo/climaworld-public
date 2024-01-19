import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Alert, Image } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckIcon,
  hero_phones,
  spinningearthVideo,
  Verified,
} from "../../../assets/img";
import LoadingEarth from "../../../components/LoadingEarth";
import TypewriteLines from "../../../components/TypeWriteLines";
import Typewriter from "../../../components/Typewriter";
import { useApi } from "../../../contexts/ApiContext";
import { useAppContext } from "../../../contexts/AppContext";
import { useAuth } from "../../../contexts/AuthContext";
import EnterEmail from "../../Enter/components/EnterEmail";
import SignUp from "../../Enter/components/signup/SignUp";

// import "./Hero.css"

export default function Hero() {
  const auth = useAuth();
  const api = useApi();
  const app = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [isBillionaire, setIsBillionaire] = useState(false);
  const [isNotEligible, setIsNotEligible] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const [isUS, setIsUS] = useState(false);
  const [isProject, setIsProject] = useState();
  const [isBusiness, setIsBusiness] = useState(false);
  const [loading, setLoading] = useState(true)

  const [confirmEmail, setConfirmEmail] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("id") && params.has("confirmationcode")) {
      confirmSubscription(params);
    }
  }, []);

  async function confirmSubscription(params) {
    setConfirmEmail("loading");
    const result = await api.confirmSubscription(
      params.get("id"),
      params.get("confirmationcode")
    );
    if (result.status === "success" && result.response.success) {
      setConfirmEmail({
        success: true,
        text: "Thank you, Your email was confirmed",
      });
    } else {
      setConfirmEmail({
        success: false,
        text: "Please contact us through the chat button, there was an error.",
      });
    }
  }

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
        break;
      case "/us":
        setIsUS(true);
        break;
      case "/project-partner":
        setIsProject(true);
        break;
      case "/business":
        setIsBusiness(true);
        break;
      default:
        if (app.isEligible) {
          setIsEligible(true);
        } else {
          setIsNotEligible(true);
        }
    }
    setLoading(false)
  }, [location.pathname, app.isEligible]);

  return loading ? <div style={{height: "100vh", width: "100vw"}}><LoadingEarth /></div> : (
    <>
      <div
        className="pt-md-5 pb-5 d-flex justify-content-center flex-wrap align-items-center"
        style={styles.entryContainer}
      >
        <div
          className="px-3 my-5 py-3 d-flex flex-column justify-content-between text-center text-xl-start"
          style={{ maxWidth: "584px" }}
        >
          <div className="mb-4 px-0 px-md-4">
            <div
              className="fw-bold"
              style={{ color: "var(--c-p1)", fontSize: "3rem" }}
            >
              {isBillionaire && <div>Climate Sweepstakes for billionaires</div>}
              {(isEligible || isNotEligible) && (
                <TypewriteLines
                  style={{
                    // color: "inherit",
                    // fontSize: "inherit",
                    // fontWeight: "inherit",
                    // fontFamily: "'Poppins', sans-serif",
                  }}
                  words={["Climate", "Sweepstakes"]}
                />
              )}
              {isProject && <div>Get funding for your climate project</div>}
              {isBusiness && <div>Climate Sweepstakes For Your Employees</div>}
              {isUS && (
                <div>Our Climate Sweepstakes are coming to the USA!</div>
              )}
            </div>
          </div>
          <div className="d-flex flex-column align-items-center align-items-xl-start gap-3 mb-4 px-0 px-md-4 pb-2 pb-md-0">
            <div
              className=""
              style={{ lineHeight: "2rem", fontSize: "1.4rem" }}
            >
              {/* Lotteries part funded the great wall of China.<br></br>Your subscription funds climate projects. */}
              {/* <span className="fw-bold">& Now Solutions To The Climate Crisis</span> */}
              {isBillionaire && (
                <div>
                  Enter from $5000<br></br>60% funds your project of choice
                  <br></br>Keep, donate or split if you win
                </div>
              )}
              {isEligible && (
                <>
                  {/* <div className="d-flex align-items-center gap-2">
                    <Verified fill="green" />
                    <div>
                      Subscribe from {app?.locale?.currency?.currency_sign}
                      {app?.locale?.paymentAmount.minValue}/month
                    </div>
                  </div> */}
                  <div className="pb-3 d-flex align-items-center gap-2">
                    {/* <Verified fill="green" /> */}
                    <div>Get&nbsp;rewarded for&nbsp;protecting&nbsp;the&nbsp;planet</div>
                  </div>
                  {/* <div className="d-flex align-items-center gap-2">
                    <Verified fill="green" />
                    <div>Verifiably random $1000 prizes</div>
                  </div> */}
                </>
              )}
              {isNotEligible && (
                <div>
                  We are excited to launch sweepstakes in your country soon.
                  <br></br>Enter your email to be notified as soon as we do!
                </div>
              )}
              {isProject && (
                <div>
                  Unlike guaranteed grant funding, there is no limit to the
                  amount you can raise with ClimaWorld
                </div>
              )}
              {isBusiness && (
                <div>
                  Easy, exciting & affordable climate subscriptions for your
                  employees and teams
                </div>
              )}
              {isUS && (
                <div>
                  After proving the concept in Europe we're opening entries to
                  our climate sweepstakes in the USA!
                </div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center justify-content-xl-start">
            {!api.user || !isEligible ? (
              confirmEmail ? (
                confirmEmail === "loading" ? (
                  <div className="pt-3 w-100 text-center">
                    <LoadingEarth />
                  </div>
                ) : (
                  <div className="px-3">
                    <Alert
                      className="d-flex align-items-center"
                      variant={`${
                        confirmEmail.success ? "success" : "secondary"
                      }`}
                    >
                      {confirmEmail.success && (
                        <CheckIcon className="mx-2 flex-shrink-0" height={40} />
                      )}
                      <span className="ps-2 text-start">
                        {confirmEmail.text}
                      </span>
                    </Alert>
                  </div>
                )
              ) : (
                <EnterEmail />
              )
            ) : (
              <button
                className="mb-4 py-3 px-5 mt-3 fw-bold rounded-pill shadow"
                style={styles.ctaButton}
                onClick={() => navigate("/home")}
              >
                Go back to the App
              </button>
            )}
          </div>
        </div>
        <div className="d-none d-md-block" style={{ flexShrink: 1 }}>
          <Image height={450} src={hero_phones} />
          {/* <video
            muted
            loop
            autoPlay={true}
            width={500}
            style={{ maxWidth: "100vw" }}
          >
            <source src={spinningearthVideo} type="video/mp4"></source>
          </video> */}
        </div>
      </div>
    </>
  );
}

const styles = {
  entryContainer: {
    // marginTop: "74px",
    backgroundColor: "var(--c-bg1)",
    // background: "linear-gradient(to right, #ACB6E5, #74ebd5)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    // background: "linear-gradient(to right, #f2fcfe, #1c92d2)",
    // background: "linear-gradient(to right, #C4E0E5, #4CA1AF)",
    // backgroundImage: "linear-gradient( 135deg, #79F1A4 10%, #0E5CAD 100%)",
    // color: "white",
    columnGap: "120px",
    color: "var(--c-txt1)",
    // backgroundColor: "var(--c-p2)",
  },
  entryTextContainer: {
    maxWidth: "615px",
    // lineHeight: "3rem",
  },
  entryTextHeader: {
    // maxWidth: "700px",
    color: "#54a8b3",
  },
  ctaButton: {
    border: "1px solid",
    color: "var(--color-primary-inverted)",
    backgroundColor: "var(--color-primary)",
    boxShadow: "grey 0px 0px 13px 0px !important",
    // color: "#54a8b3",
    // backgroundColor: "white",
  },
};
