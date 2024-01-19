import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../../contexts/ApiContext';
import EnterEmail from './EnterEmail';

export default function CTABanner() {
    const api = useApi()
    const navigate = useNavigate()
    return (
        <div
          className="py-5 d-flex justify-content-center"
          style={{color: "var(--c-txt1)", backgroundColor: "var(--c-bg1)"}}
        >
          <div className="">
            <div className="fs-3 fw-bold text-center">
              <span className="d-inline-block">Take a chance on ClimaWorld.</span>{" "}
              <span className="d-inline-block">Not on Climate Change.</span>
            </div>
            <div className="pt-5 d-flex justify-content-center">
              {!api.user ? (
                <EnterEmail className="d-flex flex-column align-items-center" text="Claim your Entry" />
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
        </div>
      );
}

const styles = {
  ctaButton: {
    border: "1px solid",
    color: "var(--color-primary-inverted)",
    backgroundColor: "var(--color-primary)",
    boxShadow: "grey 0px 0px 13px 0px !important",
    // color: "#54a8b3",
    // backgroundColor: "white",
  },
}