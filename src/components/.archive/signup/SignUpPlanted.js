import React from "react";
import { Card, Image } from "react-bootstrap";
import CTAButton from "../CTAButton";

import { forestCartoon } from "../../assets/img";
import { useApi } from "../../contexts/ApiContext";

/* 

  Component:  Sign Up Planted
  Function: - show a success message for planting a tree

 */
export default function SignUpPlanted({ name, continueFlow }) {
  const { countrySupported } = useApi();
  return (
    <div>
      <div className="w-100" style={styles.cartoonContainer}>
        <Image className="w-100" style={styles.cartoon} src={forestCartoon} />
        <div style={styles.dataContainer}>
          <Card className="text-center" style={styles.dataCard}>
            <Card.Header style={styles.dataHeader}>{name}'s Forest</Card.Header>
            <Card.Body style={styles.dataBody}>
              <span>1 Tree planted!</span>
            </Card.Body>
          </Card>
        </div>
      </div>
      <h2 className="fw-bolder mt-5">You planted a tree!</h2>
      <p className="mt-4 px-2">
        You can {countrySupported ? "subscribe" : "donate"} later in the app if
        you would like to plant more trees.
      </p>
      <CTAButton
        className="mt-4"
        handle_cta_click={continueFlow}
        text={
          countrySupported ? "Enter our £100 prize draw" : "Enter your email"
        }
      />
    </div>
  );
}
const styles = {
  cartoonContainer: {
    position: "relative",
  },
  cartoon: {
    borderRadius: "30px",
  },
  dataContainer: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dataCard: {
    minWidth: "200px",
    color: "#35424a",
    background: "transparent",
    border: "none",
  },
  dataHeader: {
    border: "none",
    borderRadius: "12px 12px 0 0",
    background: "#fff",
    fontWeight: "bold",
  },
  dataBody: {
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    borderRadius: "0 0 20px 20px",
    background: "#ffffffad",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
};
