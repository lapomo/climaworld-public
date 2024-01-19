import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { useApi } from "../contexts/ApiContext";
import PhoneContainer from "../components/PhoneContainer";
import PaymentCards from "../components/PaymentCards";
import Donation from "../components/.archive/Donation";

/* 

  Payments Page: all payment options are displayed, step right before redirecting to stripe

  ? if country not supported, only show donation feature. Otherwise if user has not bought tickets yet, show payment cards.
 */
export default function Payments() {
  const { user, stats, countrySupported } = useApi();

  return (
    <>
      <PhoneContainer>
        <Header />
        {countrySupported ? (
          user.tickets[stats.curr_draw_date.cwValue].paidT.length > 1 ? (
            <div className="">
              You already have tickets for this prize draw. The next prize draw
              will be soon! If you want to fund climate projects without getting
              more tickets, you can make a donation below!
            </div>
          ) : (
            <>
              <span className="fw-bolder fs-4 mt-4">
                How many trees will it be? 🌳
              </span>
              <span className="mt-2">Choose your entry option</span>
              <div
                className="container-fluid py-2 mt-4"
                style={styles.scrollContainer}
              >
                <div className="d-flex justify-content-center">
                  <div
                    className="d-flex flex-row flex-nowrap overflow-auto p-4"
                    style={styles.cardsContainer}
                  >
                    <PaymentCards />
                  </div>
                </div>
              </div>
            </>
          )
        ) : (
          <Alert variant="dark" className="text-center">
            <div>
              We are excited to launch prize draws in your country soon. Get as
              many of your fellow nationals signed up as you can to make it
              happen even faster!
            </div>
            <br></br>
            <div>
              In the meantime you can still support climate projects by donating
              below!
            </div>
          </Alert>
        )}
        <Donation />
        <Footer />
      </PhoneContainer>
    </>
  );
}

const styles = {
  scrollContainer: {
    width: "100vw",
    margin: "0",
    padding: "0",
  },
  cardsContainer: {
    gap: "1rem",
  },
  card: {
    minWidth: "300px",
    maxWidth: "350px",
    borderRadius: "30px",
  },
  gif: {
    height: "120px",
    width: "auto",
  },
  icon: {
    width: "3rem",
    fill: "#2381a1",
  },
  row: {
    padding: "1rem",
    gap: "1rem",
    fontSize: "0.8rem",
  },
};
