import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {
  Accordion,
  Alert,
  Button,
  Card,
  Carousel,
  Col,
  Form,
  Image,
  InputGroup,
  Modal,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {
  tree,
  carbon,
  monkey,
  trophy,
  earth,
  edenprojectsLogo,
  climaworldLogo,
  randomLogo,
  hero,
  CheckIcon,
  treeVideo,
  globeVideo,
  trophyVideo,
  howto_play,
  InfoIcon,
  atomEnergyVideo,
  howto_vote,
  howto_fund,
  TreeIcon,
  tortoise,
  activism,
  atomEnergy,
  co2capture,
  tortoiseVideo,
  activismVideo,
  TurtleIcon,
  co2captureVideo,
  AtomIcon,
  tortoiseShare,
  activismShare,
  atomEnergyShare,
  co2captureShare,
  ShareIcon,
  heroshortPreview,
  InstagramIcon,
  TwitterIcon,
  LinkedInIcon,
  ApplePayIcon,
  GooglePayIcon,
  WhatsappIcon,
} from "../../assets/img";
import company from "../../assets/text/company";
import faq from "../../assets/text/faq";
import {
  activismcontent,
  carboncapture,
  nuclear,
  ocean,
} from "../../assets/text/projects";
import AboutUs from "../../components/AboutUs";
import CompanyInfo from "../../components/CompanyInfo";
import ContactUs from "../../components/ContactUs";
import CountryPicker from "../../components/CountryPicker";
import CTAButton from "../../components/CTAButton";
import Loading from "../../components/Loading";
import PaymentCards from "../../components/PaymentCards";
import Privacy from "../../components/Privacy";
import Terms from "../../components/Terms";
import { useApi } from "../../contexts/ApiContext";
import { useAuth } from "../../contexts/AuthContext";

import "./LandingPage.css";

/* 

  Landing Page: Main entry point at https://climaworld.app/

  all sections are defined as functional components inside the main function. this makes it easier to switch the order. Could be outsourced at some point

 */
export default function LandingPage() {
  const [paramsExist, setParamsExist] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmationError, setConfirmationError] = useState(false);
  const [subscriberId, setSubscriberId] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState(false);
  const [voted, setVoted] = useState(false);
  const [votedProject, setVotedProject] = useState(false);

  const navigate = useNavigate();
  const { confirmSubscription, user } = useApi();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const subscrId = params.get("id");
    setSubscriberId(subscrId);
    const confCode = params.get("confirmationcode");
    setConfirmationCode(confCode);
    //  redirect to homepage if the link doesn't contain the required params
    if (subscrId && confCode) {
      setParamsExist(true);
      sendConfirmation(subscrId, confCode);
    }
  }, []);

  async function sendConfirmation(id, code) {
    setIsConfirming(true);
    const result = await confirmSubscription(id, code);
    console.log(result);
    if (
      result.data &&
      result.data.status === "success" &&
      result.data.item.confirmed
    ) {
      if (result.data.item.info && result.data.item.info.vote) {
        setVoted(result.data.item.info.vote);
        projects.forEach((project) => {
          if (result.data.item.info.vote === project.slug) {
            setVotedProject(project);
          }
        });
        setIsConfirming(false);
      } else {
        setIsConfirming(false);
      }
    } else {
      setConfirmationError(JSON.stringify(result.message));
      setIsConfirming(false);
    }
  }

  function shareVote() {
    // TODO: find out how to do the native sharing better
    // navigator.share didn't work on desktop, mobile safari/ecosia/chrome
    if (navigator.share) {
      fetch(votedProject.share)
        .then((response) => {
          return response.blob();
        })
        .then((blob) => {
          const file = new File([blob], "ClimaWorldVote.png", {
            type: "image/png",
          });
          navigator
            .share({
              // Title that occurs over
              // web share dialog
              title: "Share your ClimaWorld Vote!",
              text: "I voted for a climate project to fund on ClimaWorld!",
              // URL to share
              url: "https://climaworld.app/",
              files: [file],
            })
            .then(() => {
              console.log("Thanks for sharing!");
            })
            .catch((err) => {
              // Handle errors, if occured
              console.log("Error while using Web share API:");
              console.log(err);
            });
        });
      // const shareFile = new File(votedProject.share, "vote.png", {
      //   type: "image/png",
      // });
    } else {
      /*
      // Alerts user if API not available
      // alert("Browser doesn't support this API !");

      // the newly created image will be put here
      const attachy = document.getElementById("gohere");
      // this is the source for the to be created image (in svg)
      const tobeconverted = document.getElementById("cw-share-img").outerHTML;

      // set up a canvas to paint on
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.height = canvas.width = 2500;

      // create a temp img to convert the svg to
      const tempImg = document.createElement("img");
      tempImg.addEventListener("load", onTempImageLoad);
      tempImg.src = "data:image/svg+xml," + encodeURIComponent(tobeconverted);

      // create another img where the finished img will go
      const targetImg = document.createElement("img");
      attachy.appendChild(targetImg);

      // the temp img has to be loaded to paint it on the canvas
      function onTempImageLoad(e) {
        ctx.drawImage(e.target, 0, 0);
        targetImg.src = canvas.toDataURL();
      }
      */

      // create temporary link
      var tmpLink = document.createElement("a");
      tmpLink.download = "climaworld-vote.png"; // set the name of the download file
      tmpLink.href = votedProject.share;
      document.body.appendChild(tmpLink);
      tmpLink.click();
      document.body.removeChild(tmpLink);
      /*
      // wait a bit for the image to load before automatically clicking the button to download it
      // TODO: find a better solution, timeout to wait for a loading is by chance
      setTimeout(() => {
        tmpLink.href = canvas.toDataURL();
        document.body.appendChild(tmpLink);
        tmpLink.click();
        document.body.removeChild(tmpLink);
      }, 1000);
      // temporarily add link to body and initiate the download
      */
    }
  }

  const projects = [
    {
      title: "Ocean",
      icon: <TreeIcon height={"100%"} fill="black" />,
      video: tortoiseVideo,
      pic: tortoise,
      share: tortoiseShare,
      text: "Ocean Conservation",
      color: "#75d481",
      slug: "ocean",
      description: ocean(),
    },
    {
      title: "Activism & Content",
      icon: <AtomIcon height={"100%"} fill="black" />,
      video: activismVideo,
      pic: activism,
      share: activismShare,
      text: "Activism & Content",
      color: "#1b4a56",
      slug: "activismcontent",
      description: activismcontent(),
    },
    {
      title: "Nuclear Energy",
      icon: <TurtleIcon height={"100%"} fill="black" />,
      video: atomEnergyVideo,
      pic: atomEnergy,
      share: atomEnergyShare,
      text: "Nuclear Energy",
      color: "#81c3c9",
      slug: "nuclear",
      description: nuclear(),
    },
    {
      title: "Carbon Capture",
      icon: <TurtleIcon height={"100%"} fill="black" />,
      video: co2captureVideo,
      pic: co2capture,
      share: co2captureShare,
      text: "Carbon Capture",
      color: "#43b14b",
      slug: "carboncapture",
      description: carboncapture(),
    },
  ];

  const LandingHeader = () => {
    const { currentUser } = useAuth();
    return (
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="lg"
        // variant="dark"
        style={styles.headerContainer}
        className="w-100 px-3"
      >
        <Navbar.Brand href="/">
          <Image src={climaworldLogo} height={"48px"} />
        </Navbar.Brand>
        <Navbar.Toggle className="border-0 " />
        <Navbar.Collapse className="justify-content-end lg-my-5">
          <Nav className="gap-3 mx-4">
            {/* <Nav.Link href="#landing-projects" style={styles.navElement}>
              Projects
            </Nav.Link> */}
            {/* <Nav.Link href="#landing-impact" style={styles.navElement}>
              Impact
            </Nav.Link> */}
            {/* <Nav.Link href="#landing-subscriptions" style={styles.navElement}>
              Subscribe
            </Nav.Link> */}
            {/* <Nav.Link href="#landing-howitworks" style={styles.navElement}>
              How it works
            </Nav.Link>
            <Nav.Link href="#landing-faq" style={styles.navElement}>
              FAQ
            </Nav.Link> */}
          </Nav>
          <Button
            className="rounded-pill px-5 border-0 ms-3 me-5"
            style={styles.loginButton}
            onClick={() => navigate("/home")}
          >
            {currentUser ? "Go to App" : "Log In"}
          </Button>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  const SubscribeBox = ({ theme, layout, vote, className, text, style }) => {
    const [subscribeError, setSubscribeError] = useState(false);
    const [subscribeSuccess, setSubscribeSuccess] = useState(false);
    const [validateError, setValidateError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { subscribe, sendVote } = useApi();
    const subscribeRef = useRef();

    function validateEmail(email) {
      // TODO: remove white spaces before check
      let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return res.test(email);
    }

    async function handleSubscribe() {
      const email = subscribeRef.current ? subscribeRef.current.value : "";
      if ((paramsExist && !confirmationError) || validateEmail(email)) {
        // disable button and set loading
        setIsLoading(true);
        setValidateError(false);
        const subscrId = String(
          Date.now() + "K" + Math.floor(Math.random() * 99)
        );
        const result = subscriberId
          ? await sendVote(confirmationCode, subscriberId, vote)
          : await subscribe(email, subscrId, vote);
        if (result.status === "success") {
          if (result.data) {
            console.log(result.data);
          }
          setSubscribeSuccess(
            subscriberId
              ? "You placed your vote!"
              : "Please click the link in the email we will send you shortly to confirm your email address" +
                  (vote ? " and your vote." : ".")
          );
          if (subscriberId) {
            setVoted(vote);
            projects.forEach((project) => {
              if (vote === project.slug) {
                setVotedProject(project);
              }
            });
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        } else {
          setSubscribeError(result.message);
        }
        setIsLoading(false);
      } else {
        setValidateError("*Please enter a valid email.");
      }
    }
    
    return (
      <div className={className} style={style}>
        {subscribeSuccess ? (
          <Alert
            className="d-flex align-items-center"
            style={layout !== "stacked" ? { maxWidth: "520px" } : {}}
            variant="success"
          >
            <CheckIcon className="mx-2 flex-shrink-0" height={40} />
            <span>{subscribeSuccess}</span>
          </Alert>
        ) : isLoading || (paramsExist && isConfirming) ? (
          <div className="text-center">
            <Image className="loading-earth" height={40} src={earth} />
          </div>
        ) : paramsExist &&
          !isConfirming &&
          !confirmationError &&
          (!vote || (vote && voted)) ? (
          vote && voted ? (
            ""
          ) : (
            <Alert
              className="d-flex align-items-center"
              style={layout !== "stacked" ? { maxWidth: "520px" } : {}}
              variant="success"
            >
              <CheckIcon className="mx-2 flex-shrink-0" height={40} />
              <span>
                Email {voted && "and vote"} confirmed{" "}
                {!vote && !voted && "- You can place your vote below!"}
              </span>
            </Alert>
          )
        ) : (
          <>
            <InputGroup
              className={`border rounded-pill w-100 waitinglist-group ${theme}`}
              style={{
                maxWidth: layout !== "stacked" ? "520px" : "",
                boxShadow: "0px 0px 13px 0px grey",
              }}
            >
              {!paramsExist && !isConfirming && !confirmationError && (
                <Form.Control
                  ref={subscribeRef}
                  // autoFocus
                  onKeyUp={(e) => e.key === "Enter" && handleSubscribe()}
                  className="border-0 ps-4 py-3 text-center text-sm-start waitinglist-input"
                  style={{
                    backgroundColor: "transparent",
                    boxShadow: "0 0",
                  }}
                  placeholder="Email Address"
                />
              )}
              <button
                disabled={isLoading}
                className={`${
                  layout === "stacked" ? "d-none" : "d-none d-sm-block"
                } shadow rounded-pill py-3 px-5 fw-bold`}
                style={styles.ctaButton}
                onClick={handleSubscribe}
              >
                {text}
              </button>
            </InputGroup>
            <div>
              <button
                disabled={isLoading}
                className={`${
                  layout === "stacked" ? "" : "d-sm-none"
                } shadow rounded-pill mt-3 w-100 py-3 px-5 fw-bold`}
                style={styles.ctaButton}
                onClick={handleSubscribe}
              >
                {text}
              </button>
            </div>
            {validateError && (
              <div
                className="mt-2 text-start px-4"
                style={{ color: "red", fontSize: "14px" }}
              >
                {validateError}
              </div>
            )}
            {subscribeError && (
              <Alert
                className="mt-3 text-start p-1"
                variant="danger"
                style={layout !== "stacked" ? { maxWidth: "520px" } : {}}
              >
                <Accordion>
                  <Accordion.Header className="subscribeError">
                    <div>
                      There was an error, please contact us through the chat
                      support.
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>{subscribeError}</Accordion.Body>
                </Accordion>
              </Alert>
            )}
            {confirmationError && (
              <Alert
                className="mt-3 text-start p-1"
                variant="danger"
                style={layout !== "stacked" ? { maxWidth: "520px" } : {}}
              >
                <Accordion>
                  <Accordion.Header className="subscribeError">
                    <div>
                      There was an error, please contact us through the chat
                      support
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>{confirmationError}</Accordion.Body>
                </Accordion>
              </Alert>
            )}
          </>
        )}
      </div>
    );
  };

  const LandingHero = () => {
    return (
      <>
        <div
          className="d-flex justify-content-center flex-wrap align-items-center"
          style={styles.entryContainer}
        >
          <div className="px-3 my-5 py-3 d-flex flex-column justify-content-between text-center text-md-start">
            <div className="mb-4 px-0 px-md-3">
              <div className="fs-1 fw-bold">
                Get rewarded for<br></br>protecting the planet
              </div>
            </div>
            <div className="d-flex flex-column gap-3 mb-4 px-0 px-md-3 pb-2 pb-md-0">
              <div
                className=""
                style={{ maxWidth: "350px", lineHeight: "2rem" }}
              >
                Prize games & lotteries part-funded the Great Wall of China,
                Londons Water System & Now Solutions To The Climate Crisis
              </div>
            </div>
            <div className="text-center">
              {!user ? (
                <SubscribeBox theme="dark" text="Join the waiting list" />
              ) : (
                <button
                  className="mb-4 py-3 px-5 mt-3 fw-bold rounded-pill shadow"
                  style={styles.ctaButton}
                  onClick={() => navigate("/dashboard")}
                >
                  Go back to the App
                </button>
              )}
            </div>
            {/* <div className="d-flex pt-3 pt-sm-0 justify-content-sm-between gap-3 justify-content-center flex-wrap partnercards">
            <div className="d-flex flex-column align-items-center">
              <span style={styles.entryLogosText}>
                Trees planted in partnership with:
              </span>
              <div className="border rounded p-3 my-2 d-flex justify-content-center align-items-center">
                <Image src={edenprojectsLogo} />
              </div>
            </div>
            <div className="d-flex flex-column align-items-center">
              <span style={styles.entryLogosText}>
                Random prize draw winner chosen by:
              </span>
              <div className="border rounded p-3 my-2 d-flex justify-content-center align-items-center">
                <Image src={randomLogo} />
              </div>
            </div>
          </div> */}
          </div>
          <div className="">
            {/* {voted ? (
              <SharePic />
            ) : (
              <video
                muted
                loop
                autoPlay={true}
                width={500}
                style={{ maxWidth: "100vw" }}
              >
                <source src={spinningearthVideo} type="video/mp4"></source>
              </video>
            )} */}
            {/* <Image src={hero} style={{ minWidth: "150px", maxWidth: "550px" }} /> */}
          </div>
        </div>
        {/* <div
          className="py-5 d-flex justify-content-center position-relative"
          style={{ backgroundColor: "var(--color-secondary)" }}
        > */}
        {/* <div style={{
              position: "absolute",
              // backgroundColor: "gray",
              top: "45%",
              // borderRadius: "50%",
              // height: "85px",
          }}>
          <button
            style={{
              border: "0",
              background: "transparent",
              boxSizing: "border-box",
              width: "0",
              height: "74px",
              borderColor: "transparent transparent transparent var(--color-primary)",
              transition: "100ms all ease",
              cursor: "pointer",
              borderStyle: "solid",
              borderWidth: "37px 0 37px 60px",
            }}
          /></div> */}

        {/* </div> */}
      </>
    );
  };

  const LandingSubscription = ({ className }) => {
    return (
      <div
        className={`position-relative ${className}`}
        style={styles.subscriptionContainer}
      >
        <div
          className="position-absolute"
          id="landing-subscriptions"
          style={styles.anchor}
        ></div>
        <h3 className="fw-bold text-center">Our subscriptions</h3>
        <div
          className="container-fluid py-2 mt-4 d-flex justify-content-center"
          style={styles.scrollContainer}
        >
          <div
            className="d-flex flex-row flex-nowrap overflow-auto p-4 "
            style={styles.subscriptionCardsContainer}
          >
            <PaymentCards />
          </div>
        </div>
        {/* <div className="w-100 d-flex justify-content-center">
        <Donation />
        </div> */}
      </div>
    );
  };

  const Entry = () => {
    const [showEnterModal, setShowEnterModal] = useState(false);
    const [enterPage, setEnterPage] = useState(0);

    const [handlingUserDetails, setHandlingUserDetails] = useState(false);
    const [userDetailEmailError, setUserDetailEmailError] = useState(false);
    const [userDetailNameError, setUserDetailNameError] = useState(false);
    const [userDetailCountryError, setUserDetailCountryError] = useState(false);
    const [userDetailTermError, setUserDetailTermError] = useState(false);
    const [userDetailError, setUserDetailError] = useState(false);
    const [userData, setUserData] = useState({});
    const [selectedCountry, setSelectedCountry] = useState();

    const [handlingEntering, setHandlingEntering] = useState();
    const [selectedProject, setSelectedProject] = useState();
    const [selectedProjectError, setselectedProjectError] = useState();

    const nameRef = useRef();
    const emailRef = useRef();
    const countryTickRef = useRef();
    const legalTickRef = useRef();

    const { signup, login } = useAuth();
    const { createUser, updateUser, localeCountry, setLocaleCountry } =
      useApi();

    console.log(localeCountry);

    async function handleUserDetails() {
      setHandlingUserDetails(true);
      var validated = true;
      //validate fields
      setUserDetailEmailError(false);
      setUserDetailNameError(false);
      setUserDetailError(false);
      if (!validateEmail(emailRef.current.value)) {
        setUserDetailEmailError("*Please enter a valid email");
        validated = false;
      }
      if (nameRef.current.value < 4) {
        setUserDetailNameError("*Please enter your name");
        validated = false;
      }
      if (!selectedCountry) {
        setUserDetailCountryError("*Please select your country");
        validated = false;
      }
      if (!legalTickRef.current.checked) {
        setUserDetailTermError("*It's necessary to agree in order to continue");
        validated = false;
      }

      // create user
      if (validated) {
        // call api
        // create the username
        const tempUsername = String(
          Date.now() + "K" + Math.floor(Math.random() * 99)
        );
        const prefUsername = nameRef.current.value;
        // create a temporary password so user doesn't have to create one
        let charset =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!§%{[()]}+*#@€";
        let n = charset.length,
          a = ["c!0"];
        for (let i = 0, l = 8; i < l; i++) {
          a.push(charset[Math.floor(Math.random() * n)]);
        }
        const tempPassword = a.join("");
        // create user in aws cognito OUTCALLAUTHAWS
        const signupResult = await signup(
          tempUsername,
          tempPassword,
          emailRef.current.value
          // prefUsername,
        ).catch((err) => {
          setUserDetailError(err.message);
          return false;
        });
        if (!signupResult) {
          setHandlingUserDetails(false);
          return;
        }
        setUserData({
          id: signupResult.userSub,
          email: emailRef.current.value,
          password: tempPassword,
        });
        login(tempUsername, tempPassword);
        // create database entry OUTCALLAPIAWS
        const createUserReturn = await createUser(signupResult.userSub, {
          username: signupResult.user.username,
          prefUsername: prefUsername,
          tempPassword: tempPassword,
          email: emailRef.current.value,
          country: selectedCountry,
        });

        // handle api return
        if (createUserReturn.status == "success") {
          setEnterPage(1);
        } else {
          setUserDetailError(
            "Something went wrong while creating your account"
          );
        }
      }
      setHandlingUserDetails(false);
    }

    async function handleEnter() {
      setHandlingEntering(true);
      if (!selectedProject) {
        setselectedProjectError("*Please select a project");
      }
      // update user with selected project
      const updateUserResult = await updateUser(userData.id, {
        "userdata.projects": [{ name: selectedProject }],
      });

      // forward to stripe checkout page
      // stripe will call api to update user data about payment and ticket
      const { error } = await loadStripe(
        "pk_test_51LjmQYCQupVPzoGaRvye72KTrn8W5vDKrMxTwhgw9YwauhpaJ25k8MdqoNjH5SV6mYk69KFSqyQAtr4Q7tv45LTP00ipgeF6mR"
      ).then((stripe) =>
        stripe.redirectToCheckout({
          lineItems: [{ price: "price_1M7byLCQupVPzoGafxLTGlQX", quantity: 1 }],
          mode: "subscription",
          customerEmail: userData.email,
          clientReferenceId: userData.id,
          // metadata: {},

          successUrl:
            window.location.protocol + "//" + window.location.host + "/home",
          cancelUrl: window.location.protocol + "//" + window.location.host,
        })
      );

      setHandlingEntering(false);
    }

    function validateEmail(email) {
      // TODO: remove white spaces before check
      let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return res.test(email);
    }

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

    const supportedCountries = [
      "GB",
      "US",
      "BE",
      "BG",
      "CZ",
      "DK",
      "DE",
      "EE",
      "IE",
      "EL",
      "ES",
      "FR",
      "HR",
      "IT",
      "CY",
      "LV",
      "LT",
      "LU",
      "HU",
      "MT",
      "NL",
      "AT",
      "PL",
      "PT",
      "RO",
      "SI",
      "SK",
      "FI",
      "SE",
    ];

    return (
      <div
        className="d-flex justify-content-center"
        style={{
          backgroundColor: "var(--color-secondary)",
          color: "var(--color-secondary-inverted)",
        }}
      >
        <div className="d-flex justify-content-center gap-3 text-center">
          <div className="border rounded px-3 py-3 d-flex flex-column gap-2">
            <span className="fw-bold">$10 Entry</span>
            <div className="d-flex flex-column">
              <span>$6 goes to Projects</span>
              <span>$2.50 goes to Prize Fund</span>
              <span>$1.50 funds ClimaWorld</span>
            </div>
            <CTAButton
              handle_cta_click={() => setShowEnterModal(true)}
              text="Enter Now"
            />
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="border rounded d-flex flex-column p-3">
              <span className="fw-bold">$1000</span>
              <span>Prize Pot</span>
            </div>
            <div className="border rounded d-flex flex-column p-3">
              <span className="fw-bold">$3000</span>
              <span>Climate Pot</span>
            </div>
          </div>
        </div>
        <Modal
          show={showEnterModal}
          centered
          onHide={() => setShowEnterModal(false)}
        >
          <div className="p-3">
            <h3 className="text-center mb-3">Enter our $1000 prize draw</h3>
            {enterPage === -1 && (
              <div className="my-5 py-3 text-center">
                <Image className="loading-earth" height={40} src={earth} />
              </div>
            )}
            {enterPage === 0 && (
              <div className="mb-3">
                <Form className="mb-3 d-flex flex-column gap-3">
                  <div>
                    <Form.Control
                      // className="mb-3"
                      ref={nameRef}
                      disabled={handlingUserDetails}
                      placeholder="First Name"
                    />
                    {userDetailNameError && (
                      <div style={{ color: "red" }}>{userDetailNameError}</div>
                    )}
                  </div>
                  <div>
                    <Form.Control
                      ref={emailRef}
                      type="email"
                      disabled={handlingUserDetails}
                      placeholder="Enter email"
                    />
                    {userDetailEmailError && (
                      <div style={{ color: "red" }}>{userDetailEmailError}</div>
                    )}
                  </div>
                  <div>
                    <CountryPicker
                      setSelectedCountry={setSelectedCountry}
                      disabled={handlingUserDetails}
                    />
                    {/* <Form.Check
                    ref={countryTickRef}
                    label="I am a citizen of the US, UK or EU"
                    type="checkbox"
                    disabled={handlingUserDetails}
                  /> */}
                    {userDetailCountryError && (
                      <div style={{ color: "red" }}>
                        {userDetailCountryError}
                      </div>
                    )}
                    {selectedCountry &&
                      !supportedCountries.includes(selectedCountry) && (
                        <div>
                          We currently operate only in US, UK and EU. Join the
                          waitinglist to let us know you want us to operate in
                          your country as well, and we will let you know as soon
                          as we do!
                        </div>
                      )}
                  </div>
                  <div>
                    <Form.Check
                      ref={legalTickRef}
                      label={tickText}
                      type="checkbox"
                      disabled={handlingUserDetails}
                    />
                    {userDetailTermError && (
                      <div style={{ color: "red" }}>{userDetailTermError}</div>
                    )}
                  </div>
                </Form>
                {handlingUserDetails ? (
                  <div className="text-center">
                    <Image className="loading-earth" height={40} src={earth} />
                  </div>
                ) : (
                  <CTAButton
                    handle_cta_click={handleUserDetails}
                    text="Choose your Project"
                  />
                )}
                {userDetailError && (
                  <Alert className="mt-3" variant="danger">
                    {userDetailError}
                  </Alert>
                )}
              </div>
            )}
            {enterPage === 1 && (
              <div>
                <div className="mb-3 text-center">
                  You can choose a new project to fund every month
                </div>
                <div className="mb-3 d-flex justify-content-center gap-3">
                  <div
                    onClick={() => setSelectedProject(1)}
                    className="p-3 border rounded"
                    style={{ cursor: "pointer" }}
                  >
                    Project 1
                  </div>
                  <div
                    onClick={() => setSelectedProject(2)}
                    className="p-3 border rounded"
                    style={{ cursor: "pointer" }}
                  >
                    Project 2
                  </div>
                  <div
                    onClick={() => setSelectedProject(3)}
                    className="p-3 border rounded"
                    style={{ cursor: "pointer" }}
                  >
                    Project 3
                  </div>
                </div>
                {selectedProject}
                {selectedProjectError && (
                  <div className="px-3" style={{ color: "red" }}>
                    {selectedProjectError}
                  </div>
                )}
                {handlingEntering ? (
                  <div className="text-center">
                    <Image className="loading-earth" height={40} src={earth} />
                  </div>
                ) : (
                  <CTAButton
                    disabled={!selectedProject}
                    handle_cta_click={handleEnter}
                    text="Enter Now"
                  />
                )}
              </div>
            )}
          </div>
        </Modal>
      </div>
    );
  };

  const LandingHowitworks = ({ className }) => {
    return (
      <div
        className={`position-relative ${className}`}
        style={{
          backgroundColor: "var(--color-secondary)",
          color: "var(--color-secondary-inverted)",
        }}
      >
        <div
          className="position-absolute"
          id="landing-howitworks"
          style={styles.anchor}
        ></div>
        {/* <h3 className="fw-bold text-center">How it works</h3> */}
        <div className="d-flex flex-wrap py-5 px-3 gap-3 justify-content-evenly">
          <div className="text-center p-2" style={styles.partnerCards}>
            <h3 className="fw-bold pb-4">Vote</h3>
            <Image height={450} src={howto_vote} />
            {/* <p>
              Plant trees in your account with Eden Projects at their planting
              sites in Brasil, Kenya and more.
            </p> */}
            {/* <video muted loop autoPlay={true} height={140}>
              <source src={treeVideo} type="video/mp4"></source>
            </video> */}
            {/* <CTAButton
              className="mt-4"
              text={"Get started"}
              handle_cta_click={() => navigate("/signupflow")}
            /> */}
          </div>
          <div className="text-center p-2" style={styles.partnerCards}>
            <h3 className="fw-bold pb-4">Fund</h3>
            <Image height={450} src={howto_fund} />

            {/* <p>
              People within the app vote on which climate projects we should
              fund during each prize draw.
            </p> */}
            {/* <video muted loop autoPlay={true} height={140}>
              <source src={globeVideo} type="video/mp4"></source>
            </video> */}
            {/* <CTAButton
              className="mt-4"
              text={"View our climate projects"}
              href="#landing-projects"
            /> */}
          </div>
          <div className="text-center p-2" style={styles.partnerCards}>
            <h3 className="fw-bold pb-4">Play</h3>
            <Image height={450} src={howto_play} />
            {/* <p>
              We livestream our prize draws from random.org to social media to
              make them exciting & trusted.
            </p> */}
            {/* <video muted loop autoPlay={true} height={140}>
              <source src={trophyVideo} type="video/mp4"></source>
            </video> */}
            {/* <CTAButton
              className="mt-4"
              text={"Enter our prize draws"}
              handle_cta_click={() => navigate("/signupflow")}
            /> */}
          </div>
        </div>
      </div>
    );
  };

  const LandingImpact = ({ className }) => {
    return (
      <div
        className={`position-relative ${className}`}
        style={{
          backgroundColor: "var(--color-secondary)",
          color: "var(--color-secondary-inverted)",
        }}
      >
        <div
          className="position-absolute"
          id="landing-impact"
          style={styles.anchor}
        ></div>
        <h3 className="fw-bold text-center">Our Climate Impact</h3>
        <div className="d-flex flex-wrap justify-content-center align-items-center py-5">
          <div className="d-flex flex-wrap">
            <div className="d-flex align-items-center p-3 gap-3">
              <Image src={tree} height={80} />
              <div className="">
                <p className="m-0 fw-bold fs-5">5551</p>
                <p className="m-0">Trees planted</p>
              </div>
            </div>
            <div className="d-flex align-items-center p-3 gap-3">
              <Image src={carbon} height={80} />
              <div className="">
                <p className="m-0 fw-bold fs-5">237 tonnes</p>
                <p className="m-0">Carbon captured</p>
              </div>
            </div>
            <div className="d-flex align-items-center p-3 gap-3">
              <Image src={monkey} height={80} />
              <div className="">
                <p className="m-0 fw-bold fs-5">4000+</p>
                <p className="m-0">Species protected</p>
              </div>
            </div>
            <div className="d-flex align-items-center p-3 gap-3">
              <Image src={trophy} height={80} />
              <div className="">
                <p className="m-0 fw-bold fs-5">£3,000+</p>
                <p className="m-0">Prizes won</p>
              </div>
            </div>
            <div className="d-flex align-items-center p-3 gap-3">
              <Image src={earth} height={80} />
              <div className="">
                <p className="m-0 fw-bold fs-5">16</p>
                <p className="m-0">Projects funded</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LandingProjects = ({ className }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const { stats } = useApi();

    function showProject(index) {
      setSelectedIndex(index);
      setShowModal(true);
    }

    return (
      <div
        className={`d-flex flex-column align-items-center position-relative ${className}`}
        style={{
          backgroundColor: "var(--color-secondary)",
          color: "var(--color-secondary-inverted)",
        }}
      >
        <div
          className="position-absolute"
          id="landing-projects"
          style={styles.anchor}
        ></div>
        {voted ? (
          <div
            className="pb-5"
            style={{ animation: "3s ease 0s infinite shake" }}
          >
            <CTAButton
              containerClassName=""
              className="px-5 py-3 fs-3 fw-semibold"
              text="Share your vote!"
              handle_cta_click={shareVote}
            />
          </div>
        ) : (
          <h3 className="fw-bold text-center pt-5">
            Vote for a project in <br></br>our global prize game!
          </h3>
        )}
        <div
          className="d-flex gap-3 my-5 flex-wrap justify-content-center"
          style={styles.subscriptionCardsContainer}
        >
          {projects.map((project, index) => {
            return (
              <div
                className="shadow rounded position-relative text-center p-1"
                style={{
                  minWidth: "180px",
                  maxWidth: "320px",
                  width: "280px",
                  // borderRadius: "30px",
                  cursor: "pointer",
                  backgroundColor: "white",
                  color: "black",
                }}
                key={index}
                onClick={() => showProject(index)}
              >
                <InfoIcon
                  className="position-absolute"
                  style={{ top: "15px", right: "15px" }}
                  height={32}
                />
                <div
                  className="d-flex justify-content-center align-item-center"
                  style={{ maxWidth: "100%", maxHeight: "240px" }}
                >
                  {/* {project.icon} */}
                  {/* <video
                    muted
                    loop
                    onLoadedData={(_event) => (_event.target.currentTime = 2)}
                    onMouseOver={(_event) => _event.target.play()}
                    onMouseOut={(_event) => {
                      _event.target.pause();
                      _event.target.currentTime = 2;
                    }}
                    controls={false}
                    height="260px"
                    width="100%"
                    src={project.video}
                  >
                  </video> */}
                  <Image height="260px" src={project.pic} />
                </div>
                <div className="fs-5 fw-bold">{project.text}</div>
                <div className="mt-3 mb-1 mx-3">
                  <CTAButton
                    text={voted ? "Learn more" : `Vote ${project.title}`}
                    handle_cta_click={(e) => {
                      // buttonClick is now same behavior as click on whole card
                      // e.stopPropagation();
                      // subscribeRef.current.focus();
                      // window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                </div>
              </div>
            );
          })}
          {/* {stats.Projects.map(({ title, countryCode, img, short }, index) => {
              return (
                <Card
                  className="shadow border-0"
                  style={styles.projectCard}
                  key={index}
                  onClick={() => showProject(index)}
                >
                  <Card.Body className="text-center p-0">
                    <div className="w-100 position-relative">
                      <Card.Img className="border-radius-3 pb-3" src={img} />
                    </div>
                    <div className="d-flex justify-content-center gap-3 align-items-center px-5 pb-3">
                      <Image
                        className="shadow border"
                        src={`https://flagcdn.com/h80/${countryCode.toLowerCase()}.png`}
                        height={22}
                      />
                      <span>{title}</span>
                    </div>
                  </Card.Body>
                </Card>
              );
            })} */}
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{projects[selectedIndex].title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="w-100 position-relative mb-3 text-center">
              {/* <video
                muted
                loop
                autoPlay
                height="260px"
                width="100%"
                controls={false}
              >
                <source
                  src={projects[selectedIndex].video}
                  type="video/mp4"
                ></source>
              </video> */}
              <Image height="260px" src={projects[selectedIndex].pic} />
            </div>
            {projects[selectedIndex].description}
            <SubscribeBox
              vote={projects[selectedIndex].slug}
              className="py-3 px-md-3 position-sticky"
              style={{ bottom: "0", backgroundColor: "white" }}
              layout="stacked"
              text="Vote now!"
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  };

  const CWVideo = () => {
    return (
      <div
        className="py-5 d-flex justify-content-center position-relative"
        style={{
          backgroundColor: "var(--color-secondary)",
          color: "var(--color-secondary-inverted",
        }}
      >
        <div>
          <h3 className="pb-5 fw-bold text-center">Meet ClimaWorld</h3>
          {/* <video
            className="rounded"
            muted
            controls
            loop
            style={{ maxWidth: "100%", maxHeight: "calc(100vh - 140px)" }}
            poster={heroshortPreview}
          >
            <source src={heroshortVideo} type="video/mp4"></source>
          </video> */}
        </div>
      </div>
    );
  };

  const CTABanner = () => {
    return (
      <div
        className="d-flex justify-content-center"
        style={{
          backgroundColor: "var(--color-secondary)",
          color: "var(--color-primary-inverted",
        }}
      >
        <div className="my-5">
          <div className="pb-5 fs-3 fw-bold text-center">
            <span className="d-inline-block">Take a chance on ClimaWorld.</span>{" "}
            <span className="d-inline-block">Not on Climate Change.</span>
          </div>
          <div className="d-flex justify-content-center">
            {!user ? (
              <SubscribeBox theme="dark" text="Join the waiting list" />
            ) : (
              <button
                className="mb-4 py-3 px-5 mt-3 fw-bold rounded-pill shadow"
                style={styles.ctaButton}
                onClick={() => navigate("/dashboard")}
              >
                Go back to the App
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ShareImg = () => {
    function shareVote() {
      // TODO: find out how to do the native sharing better
      // navigator.share didn't work on desktop, mobile safari/ecosia/chrome
      if (navigator.share) {
        navigator
          .share({
            // Title that occurs over
            // web share dialog
            title: "ClimaWorld Title",

            // URL to share
            url: "https://climaworld.app/",
            // files: TODO get some content in here
          })
          .then(() => {
            console.log("Thanks for sharing!");
          })
          .catch((err) => {
            // Handle errors, if occured
            console.log("Error while using Web share API:");
            console.log(err);
          });
      } else {
        // Alerts user if API not available
        // alert("Browser doesn't support this API !");

        // the newly created image will be put here
        const attachy = document.getElementById("gohere");
        // this is the source for the to be created image (in svg)
        const tobeconverted = document.getElementById("cw-share-img").outerHTML;

        // set up a canvas to paint on
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.height = canvas.width = 2500;

        // create a temp img to convert the svg to
        const tempImg = document.createElement("img");
        tempImg.addEventListener("load", onTempImageLoad);
        tempImg.src = "data:image/svg+xml," + encodeURIComponent(tobeconverted);

        // create another img where the finished img will go
        const targetImg = document.createElement("img");
        attachy.appendChild(targetImg);

        // the temp img has to be loaded to paint it on the canvas
        function onTempImageLoad(e) {
          ctx.drawImage(e.target, 0, 0);
          targetImg.src = canvas.toDataURL();
        }

        // create temporary link
        var tmpLink = document.createElement("a");
        tmpLink.download = "climaworld-vote.png"; // set the name of the download file

        // wait a bit for the image to load before automatically clicking the button to download it
        // TODO: find a better solution, timeout to wait for a loading is by chance
        setTimeout(() => {
          tmpLink.href = canvas.toDataURL();
          document.body.appendChild(tmpLink);
          tmpLink.click();
          document.body.removeChild(tmpLink);
        }, 1000);
        // temporarily add link to body and initiate the download
      }
    }

    // this is the image in svg/xhtml to be downloaded on sharing
    const ShareImg = ({ typ, styles }) => {
      const share = typ === "cw-share-img";
      const downFactor = share ? 1 : 8;
      console.log(typ);
      return (
        <svg
          id={String(typ)}
          xmlns="http://www.w3.org/2000/svg"
          height={`${2500 / downFactor}px`}
          width={`${2500 / downFactor}px`}
          style={styles}
        >
          <foreignObject width="100%" height="100%">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ height: "100%" }}
            >
              <div style={{ height: "100%" }}>
                <div
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    position: "relative",
                    textAlign: "center",
                    borderRadius: 48 / downFactor + "px",
                    padding: 24 / downFactor + "px",
                    fontFamily: "Poppins, sans-serif",
                    height: "100%",
                  }}
                >
                  <Image
                    style={{
                      padding: "0 " + 45 / (downFactor / 2) + "px",
                      width: "100%",
                      // position: "relative",
                      // zIndex: "1005",
                    }}
                    src={climaworldLogo}
                  />
                  <video
                    muted
                    loop
                    onLoadedData={(_event) => (_event.target.currentTime = 2)}
                    onMouseOver={(_event) => _event.target.play()}
                    onMouseOut={(_event) => {
                      _event.target.pause();
                      _event.target.currentTime = 2;
                    }}
                    controls={false}
                    height={1160 / downFactor + "px"}
                    width="100%"
                    style={
                      {
                        // position: "relative",
                        // top: "-30px",
                        // zIndex: "1004",
                      }
                    }
                    src={votedProject.video}
                  >
                    {/* <source src={project.video} type="video/mp4"></source> */}
                  </video>
                  <div
                    style={{
                      fontWeight: "300",
                      fontSize: 246 / downFactor + "px",
                      lineHeight: 320 / downFactor + "px",
                      position: "relative",
                      // bottom: 130 / downFactor + "px",
                      // left: "0",
                      // right: "0",
                      zIndex: "1006",
                      paddingBottom: "12px",
                    }}
                  >
                    I voted<br></br>
                    {votedProject.title}
                  </div>
                </div>
              </div>
            </div>
          </foreignObject>
        </svg>
      );
    };

    return (
      <div
        className="d-flex justify-content-center"
        style={{
          backgroundColor: "var(--color-secondary)",
          color: "var(--color-secondary-inverted)",
        }}
      >
        <div style={{ maxWidth: "450px" }}>
          <div
            className="mb-3"
            style={{
              //   flex: "1",
              //   flexGrow: "1",
              textDecoration: "none",
              color: "inherit",
              //   position: "relative",
            }}
          >
            <ShareImg typ="cw-share-preview" />
          </div>
          <div id="gohere" style={{ display: "none" }}></div>
          <div style={{ display: "none" }}>
            <ShareImg typ="cw-share-img" />
          </div>
          <div
            className="shadow rounded-pill mb-5 py-3 px-5 fs-4 wl-card"
            onClick={shareVote}
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-inverted)",
              cursor: "pointer",
            }}
          >
            Share your vote
          </div>
        </div>
      </div>
    );
  };

  const SharePic = () => {
    return (
      <div
        className="d-flex justify-content-center"
        style={{
          backgroundColor: "var(--color-secondary)",
          color: "var(--color-secondary-inverted)",
        }}
      >
        <div style={{ maxWidth: "450px" }}>
          <div
            id="landing-share-pic"
            className="mb-5 mb-sm-0"
            style={{
              //   flex: "1",
              //   flexGrow: "1",
              textDecoration: "none",
              color: "inherit",
              position: "relative",
              cursor: "pointer",
              boxShadow: "white 0px 0px 32px 12px",
              borderRadius: "12px",
            }}
            onClick={shareVote}
          >
            <Image height="320px" src={votedProject.share} />
          </div>

          {/* <div
            className="shadow rounded-pill py-3 px-5 fs-4 wl-card text-center"
            onClick={shareVote}
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-inverted)",
              cursor: "pointer",
            }}
          >
            Share your vote
          </div> */}
        </div>
      </div>
    );
  };

  const LandingFAQ = ({ className }) => {
    return (
      <div
        className={`position-relative ${className}`}
        style={{
          backgroundColor: "var(--color-secondary)",
          color: "var(--color-secondary-inverted)",
        }}
      >
        <div
          className="position-absolute"
          id="landing-faq"
          style={styles.anchor}
        ></div>
        <h3 className="fw-bold text-center">Frequently asked questions</h3>
        <Accordion
          className="d-flex flex-column align-items-center py-5"
          style={styles.faqAccordion}
        >
          {faq.map(({ question, answers }, index) => {
            return (
              <Accordion.Item
                eventKey={String(index)}
                className="w-100"
                style={styles.faqItems}
                key={index}
              >
                <Accordion.Header>{question}</Accordion.Header>
                <Accordion.Body>
                  {answers.map((answer, index) => {
                    return <p key={index}>{answer}</p>;
                  })}
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    );
  };
  const LandingFooter = ({ className }) => {
    const termRef = useRef();
    const aboutusRef = useRef();
    const privacyRef = useRef();
    const coInfoRef = useRef();
    const contactRef = useRef();

    return (
      <div className={`px-5 text-center ${className}`} style={styles.footer}>
        <h4 className="">Protecting planet earth</h4>
        <div className="d-flex justify-content-center gap-4 pt-5">
          <div className="border rounded px-3">
            <ApplePayIcon height={55} />
          </div>
          <div className="border rounded px-3">
            <GooglePayIcon height={55} />
          </div>
        </div>
        <div
          className="d-flex flex-column flex-md-row-reverse justify-content-center gap-4 pt-5"
          style={styles.footerfooter}
        >
          <span
            style={styles.footerlink}
            onClick={() => contactRef.current.setShowContact(true)}
          >
            Contact
          </span>
          <span
            style={styles.footerlink}
            onClick={() => aboutusRef.current.setShowSupport(true)}
          >
            About
          </span>
          <span
            style={styles.footerlink}
            onClick={() => termRef.current.getTerms()}
          >
            Terms and conditions
          </span>
          <span
            style={styles.footerlink}
            onClick={() => privacyRef.current.getPrivacy()}
          >
            Privacy
          </span>
          <span
            style={styles.footerlink}
            onClick={() => coInfoRef.current.setShowCoInfo(true)}
          >
            Copyright Climaworld 2022
          </span>
        </div>
        <div className="d-flex justify-content-center gap-4 pt-5 pb-5">
          <a href={company.links.linkedin} target="_blank">
            <LinkedInIcon height={32} fill="white" />
          </a>
          <a href={company.links.twitter} target="_blank">
            <TwitterIcon height={32} fill="white" />
          </a>
          <a href={company.links.instagram} target="_blank">
            <InstagramIcon height={32} fill="white" />
          </a>
          <a href={company.links.whatsapp} target="_blank">
            <WhatsappIcon height={32} fill="white" />
          </a>
        </div>
        <Terms ref={termRef} />
        <Privacy ref={privacyRef} />
        <AboutUs ref={aboutusRef} title="Welcome to ClimaWorld " />
        <ContactUs ref={contactRef} title="Contact Us" />
        <CompanyInfo ref={coInfoRef} title="Company Info" />
      </div>
    );
  };

  return (
    <div className="" style={styles.landingContainer}>
      <LandingHeader />
      <LandingHero />
      <Entry />
      {/* {voted && <SharePic />} */}
      <LandingProjects />
      <CWVideo />
      {/* <LandingImpact className="pt-5" /> */}
      {/* <LandingSubscription className="pt-5" /> */}
      <LandingHowitworks className="" />
      <CTABanner />
      <LandingFAQ className="pt-5" />
      <LandingFooter className="pt-5" />
      {/* <SupportChameleon /> */}
    </div>
  );
}

const styles = {
  // The anchor is needed for every section header so hrefs scroll to the right position below the header.
  // Adjust to header height accordingly
  anchor: {
    top: "-75px",
  },
  landingContainer: {
    position: "relative",
    // width: "100vw",
    // overflow: ""
  },
  headerContainer: {
    // backgroundColor: "#54a8b3",
    color: "var(--color-secondary-inverted)",
    backgroundColor: "var(--color-secondary)",
  },
  navElement: {
    // color: "white",
    color: "inherit",
    textDecoration: "none",
    fontWeight: "800",
    fontSize: "18px",
  },
  loginButton: {
    whiteSpace: "nowrap",
    color: "var(--color-primary-inverted)",
    backgroundColor: "var(--color-primary)",
    fontWeight: "800",
    // padding: "0.375rem 2.5rem",
  },
  entryContainer: {
    marginTop: "74px",
    // backgroundColor: "#54a8b3",
    // color: "white",
    columnGap: "120px",
    color: "var(--color-secondary-inverted)",
    backgroundColor: "var(--color-secondary)",
  },
  entryTextContainer: {
    maxWidth: "615px",
    // lineHeight: "3rem",
  },
  entryTextHeader: {
    // maxWidth: "700px",
    color: "#54a8b3",
  },
  waitingListInput: {
    borderRadius: "50rem 0 0 50rem",
    fontSize: "12px",
    maxWidth: "500px",
  },
  waitingListButton: {
    borderRadius: "0 50rem 50rem 0",
    backgroundImage: "linear-gradient(#A6F77B, #2DBD6E)",
    border: "0",
    fontWeight: "500",
    fontSize: "14px",
    padding: "0.45rem 1.2rem",
  },
  ctaButton: {
    border: "1px solid",
    color: "var(--color-primary-inverted)",
    backgroundColor: "var(--color-primary)",
    boxShadow: "grey 0px 0px 13px 0px !important",
    // color: "#54a8b3",
    // backgroundColor: "white",
  },
  trustText: {
    fontSize: "10px",
    // maxWidth: "500px",
  },
  entryLogosText: {
    fontSize: "8px",
    fontWeight: "bold",
    paddingBottom: "5px",
    color: "gray",
  },
  entryLogos: {
    // width: "180px",
    // height: "80px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "15px",
  },
  sliderContainer: {
    // backgroundColor: "white",
    maxWidth: "100%",
  },
  subscriptionContainer: {
    backgroundColor: "var(--color-secondary)",
    color: "var(--color-secondary-inverted)",
  },
  subscriptionCardsContainer: {
    maxWidth: "96p0px",
  },
  subscriptionCard: {
    minWidth: "300px",
    maxWidth: "380px",
    borderRadius: "30px",
    color: "black",
  },
  subscriptionGif: {
    height: "120px",
    width: "auto",
  },
  subscriptionIcon: {
    width: "3rem",
    fill: "#2381a1",
  },
  subscriptionRow: {
    padding: "1rem",
    gap: "1rem",
    fontSize: "0.8rem",
  },
  partnerlogosContainer: {
    // height: "80px",
    rowGap: "18px",
  },
  partnerLogo: {
    height: "60px",
  },
  partnerCards: {
    width: "300px",
    // border: "solid 1px #6c757d7d",
    // borderRadius: "2rem",
  },
  faqItems: {
    maxWidth: "750px",
  },
  footer: {
    backgroundColor: "var(--color-secondary)",
    color: "var(--color-secondary-inverted)",
    borderTop: "1px solid",
  },
  footerfooter: {
    // fontSize: "14px",
  },
  footerlink: {
    cursor: "pointer",
  },
  projectImgTitle: {
    color: "white",
    backgroundColor: "#54a8b38c",
    borderRadius: "0 0 5px 5px",
  },
  projectCard: {
    // minWidth: "180px",
    // maxWidth: "320px",
    // // borderRadius: "30px",
    // cursor: "pointer",
  },
};
