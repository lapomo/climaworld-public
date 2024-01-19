import React from "react";
import { useRef } from "react";
import { Chameleon } from "../assets/img";
import AboutUs from "./AboutUs";

/* 

  Component:  Chameleon
  Function: - maskot, some fun on our pages
  
 */
export default function SupportChameleon() {
  const aboutusRef = useRef();
  return (
    <>
      <div
        style={styles.supportChameleon}
        onClick={() => aboutusRef.current.setShowSupport(true)}
      >
        <div style={styles.supportContainer}>
          <Chameleon />
          <div style={styles.supportBubble}>
            <span>Hi!</span>
            <div style={styles.notification}>
              <span>1</span>
            </div>
            <div style={styles.supportSB1}></div>
          </div>
        </div>
      </div>
      <AboutUs ref={aboutusRef} title="Welcome to ClimaWorld " />
    </>
  );
}

const styles = {
  supportContainer: {
    position: "relative",
  },
  supportBubble: {
    position: "absolute",
    top: "30px",
    width: "40px",
    border: "3px solid",
    padding: "4px 0px",
    borderRadius: "50%",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "900",
    backgroundColor: "white",
  },
  supportSB1: {
    position: "absolute",
    top: "18px",
    left: "28px",
    width: "20px",
    height: "14px",
    borderRadius: "50%",
    border: "3px solid",
    backgroundColor: "white",
  },
  notification: {
    position: "absolute",
    backgroundColor: "crimson",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "-5px",
    left: "28px",
    width: "18px",
    height: "18px",
    fontSize: "10px",
    fontWeight: "700",
    color: "white",
  },
  supportChameleon: {
    position: "fixed",
    // height: "fit-content",
    bottom: "-5.6rem",
    right: "-4.2rem",
    width: "224px",
    zIndex: "9999",
    cursor: "pointer",
  },
};
