import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Image } from "react-bootstrap";
import ReactCanvasConfetti from "react-canvas-confetti";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { tree, trophy } from "../assets/img";
import CTAButton from "../components/CTAButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PhoneContainer from "../components/PhoneContainer";

/* 

  Payment Success Page: celebrate the purchase and show option to share

 */
export default function Success() {
  const [message, setMessage] = useState("");
  const [intervalId, setIntervalId] = useState();

  const navigate = useNavigate();
  const amount = new URLSearchParams(useLocation().search).get("amt");

  const refAnimationInstance = useRef(null);
  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
    // setTimeout(() => requestAnimationFrame(nextTickAnimation), 5000)
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(requestAnimationFrame(nextTickAnimation));
    }
  }, [intervalId, nextTickAnimation]);

  useEffect(() => {
    //     const c = new Date(Date.now()).getTime()
    //     const d = new Date("2022-09-09T16:00:00Z").getTime();
    //     const r = d-c
    //     setMessage(JSON.stringify(r/(1000*60*60*24)))
    //     setMessage(Date.now())

    //     let curr_max_ticketNo = 10;
    //     const ticket_amount = 10;
    //     const ticketList = [];
    //   for (let i = curr_max_ticketNo+1 ; i <= curr_max_ticketNo + ticket_amount; i++){
    //     ticketList.push({ticketNo: i});
    //   }
    //   console.log(ticketList);

    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    nextTickAnimation();
  }, []);

  return (
    <>
      <PhoneContainer>
        <Header />
        <h2 className="py-3 fw-bold">Payment Successful</h2>
        <p className="text-center">
          Thank you for planting more trees with Eden Projects!
        </p>
        <p className="text-center">
          You have {amount} tickets for our £100 prize draw next week!
        </p>

        <div>
          <Card className="shadow mt-4">
            <Card.Body className="d-flex gap-3">
              <Image src={tree} height="25" />
              <span>{amount} trees planted</span>
            </Card.Body>
          </Card>
          <Card className="shadow mt-4">
            <Card.Body className="d-flex gap-3">
              <Image src={trophy} height="25" />
              <span>{amount} prize draw tickets</span>
            </Card.Body>
          </Card>
        </div>
        <CTAButton
          className="mt-4"
          text={"View my profile"}
          handle_cta_click={() => navigate("/dashboard")}
        />
        <Footer />
        <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      </PhoneContainer>
    </>
  );
}

function getAnimationSettings(originXA, originXB) {
  return {
    startVelocity: 20,
    spread: 360,
    ticks: 100,
    zIndex: 0,
    particleCount: 800,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  };
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};
