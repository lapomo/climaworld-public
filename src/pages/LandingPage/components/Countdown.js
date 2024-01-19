import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  drawbg_christmas,
  drawbg_monthly,
  drawbg_newyear,
  draw_bg,
} from "../../../assets/img";
import CTAButton from "../../../components/CTAButton";
import DrawCountdown from "../../../components/DrawCountdown";
import { useApi } from "../../../contexts/ApiContext";

export default function Countdown() {
  const [showModal, setShowModal] = useState(false);
  const [currentDraws, setCurrentDraws] = useState([])
  const [pastDraws, setPastDraws] = useState([])
  const navigate = useNavigate();
  const api = useApi()

  return (
    <>
      <div className="py-5" style={{ color: "white" }}>
        {/* <h3 className=" px-3 fw-bold text-center">This months prize draw</h3> */}
        <div className="px-3 d-flex flex-wrap justify-content-center align-items-center gap-5">
            <div className="fs-1 p-3 text-center" style={{borderBottom: "4px solid white", borderTop: "4px solid white"}}>New daily and weekly draws starting now!</div>
        </div>
      </div>
      <div className="py-5" style={{ color: "white" }}>
        <h3 className=" px-3 fw-bold text-center">Previous prize draws</h3>
        <div className="pt-5 px-3 d-flex flex-wrap justify-content-center align-items-center gap-5">
        {api?.draws?.sort((a, b) => new Date(b.date_closing).getTime() - new Date(a.date_closing).getTime()).map((draw, index) => {
            if(new Date(draw.date_closing).getTime() - new Date().getTime() <= -(1000 * 60 * 60 * 24 * 5)){
             return <DrawCountdown key={index}
              bg={draw.draw_tag === "new-year-22-23" ? drawbg_newyear : draw.draw_tag === "christmas-2022" ? drawbg_christmas : draw.draw_tag === "january-2023" ? drawbg_monthly : draw_bg}
              draw={draw}
              />
            }
          })}
          {/* <DrawCountdown bg={drawbg_monthly} special="january-2023" />
          <DrawCountdown special="1" bg={drawbg_christmas} />
          <DrawCountdown special="2" bg={drawbg_newyear} /> */}
        </div>
        <Modal centered show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Enter the draw</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Enter the draw by subscribing to a climate project!
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <div className="w-100" style={{ maxWidth: "350px" }}>
              <CTAButton
                text={"Subscribe"}
                handle_cta_click={() => navigate("/enter")}
              />
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
