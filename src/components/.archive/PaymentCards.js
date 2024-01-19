import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  EarthIcon,
  LeafIcon,
  TrophyIcon,
  waterfallForestGif,
  waterfallGif,
  waterfallRiverGif,
} from "../assets/img";
import { useApi } from "../contexts/ApiContext";
import CTAButton from "./CTAButton";


const stripePromise = loadStripe(
  "pk_test_51LjmQYCQupVPzoGaRvye72KTrn8W5vDKrMxTwhgw9YwauhpaJ25k8MdqoNjH5SV6mYk69KFSqyQAtr4Q7tv45LTP00ipgeF6mR"
);
const reUrl = window.location.protocol + "//" + window.location.host;

/* 

  Component:  Payment Cards
  Function: - show options to purchase more entries
  Tags:       STRIPE

 */
export default function PaymentCards() {

  const { user, stats } = useApi();
  const navigate = useNavigate();

  const paymentCards = [
    { amount: 5, trees: 5, tickets: 10, gif: waterfallGif },
    { amount: 10, trees: 10, tickets: 20, gif: waterfallForestGif },
    { amount: 20, trees: 20, tickets: 40, gif: waterfallRiverGif },
  ];

  const handleClick = async (amount) => {
    if (!user) {
      navigate("/signupflow");
      return;
    }

    const prizes = {
      5: "price_1LsxLZCQupVPzoGaleBK99Ou",
      10: "price_1LsxLZCQupVPzoGaSF1N47Ta",
      20: "price_1LsxLZCQupVPzoGaaXvYpMgl",
    };
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: prizes[amount],
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: reUrl + "/payment-success?amt=" + { amount },
      cancelUrl: reUrl + "/get-tickets",
      clientReferenceId: user.id,
      // metadata: {'secret_metadata_userId_ref': 'thisisanId123'}
    });
  };
  // console.log(user.tickets[stats.curr_draw_date.cwValue].paidT);

  return (
    <>
      {user && user.tickets[stats.curr_draw_date.cwValue] && user.tickets[stats.curr_draw_date.cwValue].paidT.length > 1 ? (
        <div className="">
          You already have tickets for this prize draw. The next prize draw will
          be soon! If you want to fund climate projects without getting more
          tickets, head to the donation section below.
        </div>
      ) : (
          paymentCards.map(({ amount, trees, tickets, gif }, index) => {
            return (
              <Card className="shadow border-0" style={styles.card} key={index}>
                <Card.Body className="text-center">
                  <h4 className="fw-bold">${amount}</h4>
                  <Card.Img style={styles.gif} src={gif} />
                  <div className="d-flex" style={styles.row}>
                    <LeafIcon style={styles.icon} />
                    <span>
                      Pay to plant {trees} trees with edenprojects.org
                    </span>
                  </div>
                  <div className="d-flex" style={styles.row}>
                    <EarthIcon style={styles.icon} />
                    <span>
                      Vote for the climate project our prize draw should fund
                    </span>
                  </div>
                  <div className="d-flex" style={styles.row}>
                    <TrophyIcon style={styles.icon} />
                    <span>
                      {tickets} tickets for the $100 Prize Draw September 9th
                    </span>
                  </div>
                  <CTAButton
                    className="mt-3"
                    handle_cta_click={() => handleClick(amount)}
                    text={user ? "Enter" : "Get started today"}
                  />
                </Card.Body>
              </Card>
            );
          })
      )}
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
    textAlign: "start",
    padding: "1rem",
    gap: "1rem",
    fontSize: "0.8rem",
    fontWeight: "600",
  },
};
