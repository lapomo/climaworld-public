import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import {
  ApplePayIcon,
  GooglePayIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  WhatsappIcon,
} from "../../../assets/img";
import company from "../../../assets/text/company";
import AboutUs from "../../../components/AboutUs";
import CompanyInfo from "../../../components/CompanyInfo";
import ContactUs from "../../../components/ContactUs";
import Privacy from "../../../components/Privacy";
import PrizeDraws from "../../../components/PrizeDraws";
import Sweepstakes from "../../../components/Sweepstakes";
import Terms from "../../../components/Terms";
import { useApi } from "../../../contexts/ApiContext";

export default function Footer({ className }) {
  const location = useLocation()
  const api = useApi();
  const navigate = useNavigate()
  const termRef = useRef();
  const drawTermsRef = useRef();
  const prizedrawTermsRef = useRef();
  const aboutusRef = useRef();
  const privacyRef = useRef();
  const coInfoRef = useRef();
  const contactRef = useRef();

  const [isLP, setIsLP] = useState()

  useEffect(() => {
    if(["/", "/business", "/project-partner", "/us"].includes(location.pathname)){
      setIsLP(true)
    }
  }, [location.pathname])

  const styles = {
    footer: {
      backgroundColor: isLP ? "var(--c-bg1)" : "var(--c-p2)",
      color: isLP ? "var(--c-txt1)" : "var(--c-txt1)",
      // borderTop: "1px solid",
    },
    footerlink: {
      cursor: "pointer",
    },
  };

  return (
    <div
      className={`${className} px-5 text-center pt-5 pb-md-0 pb-5`}
      style={styles.footer}
    >
      <div className="w-100 d-flex justify-content-center">
        <div
          style={{ borderTop: isLP ? ".1px solid var(--c-gs1)" : ".1px solid var(--c-gs1)", width: "90%" }}
        ></div>
      </div>
      <h4 className="pt-5">Protecting planet earth</h4>
      <div className="d-flex justify-content-center gap-4 py-5">
        <div
          className="rounded px-3"
          style={{ border: isLP ? "1px solid var(--c-gs1)" : "1px solid var(--c-gs1)" }}
        >
          <ApplePayIcon fill={isLP ? "var(--c-gs1)" : "var(--c-gs1)"} height={55} />
        </div>
        <div
          className="rounded px-3"
          style={{ border: isLP ? "1px solid var(--c-gs1)" : "1px solid var(--c-gs1)" }}
        >
          <GooglePayIcon fill={isLP ? "var(--c-gs1)" : "var(--c-gs1)"} height={55} />
        </div>
      </div>
      {api?.user && (
        <div className="pb-4">
          <span
          // variant="outline-dark"
            style={styles.footerlink}
            onClick={() => navigate("/settings")}
          >
            Settings
          </span>
        </div>
      )}
      <div
        className="d-flex flex-column flex-md-row-reverse justify-content-center gap-4 "
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
        {/* <span
          style={styles.footerlink}
          onClick={() => drawTermsRef.current.getSweepstakes()}
        >
          Sweepstakes Policy
        </span> */}
        <span
          style={styles.footerlink}
          onClick={() => prizedrawTermsRef.current.getPrizedraws()}
        >
          Prize Draw Rules
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
          Copyright Climaworld 2023
        </span>
      </div>
      <div className="d-flex justify-content-center gap-4 pt-5 pb-5">
        <a href={company.links.linkedin} target="_blank">
          <LinkedInIcon height={32} fill={isLP ? "var(--c-gs1)" : "var(--c-gs1)"} />
        </a>
        <a href={company.links.twitter} target="_blank">
          <TwitterIcon height={32} fill={isLP ? "var(--c-gs1)" : "var(--c-gs1)"} />
        </a>
        <a href={company.links.instagram} target="_blank">
          <InstagramIcon height={32} fill={isLP ? "var(--c-gs1)" : "var(--c-gs1)"} />
        </a>
        <a href={company.links.whatsapp} target="_blank">
          <WhatsappIcon height={32} fill={isLP ? "var(--c-gs1)" : "var(--c-gs1)"} />
        </a>
      </div>
      <Terms ref={termRef} />
      <Sweepstakes ref={drawTermsRef} />
      <PrizeDraws ref={prizedrawTermsRef} />
      <Privacy ref={privacyRef} />
      <AboutUs ref={aboutusRef} title="Welcome to ClimaWorld " />
      <ContactUs ref={contactRef} title="Contact Us" />
      <CompanyInfo ref={coInfoRef} title="Company Info" />
    </div>
  );
}
