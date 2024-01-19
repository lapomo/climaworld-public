import React from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { howto1, howto2 } from "../assets";

export default function HowTo() {
  const navigate = useNavigate();
  return (
    <div className="py-5" style={{ color: "white" }}>
      <h3 className="fw-bold text-center">How to enter</h3>
      <div
        className="pt-3 pb-3 px-3 d-flex flex-wrap justify-content-center"
        style={{ rowGap: "0", columnGap: "3rem" }}
      >
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-center">
            <div className="px-3 py-1 border rounded fs-3 fw-bold">1</div>
          </div>
          <Image
            src={howto1}
            style={{ maxHeight: "80vh", maxWidth: "100%" }}
            onClick={() => navigate("/enter")}
          />
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-center">
            <div className="px-3 py-1 border rounded fs-3 fw-bold">2</div>
          </div>
          <Image
            src={howto2}
            style={{ maxHeight: "80vh", maxWidth: "100%" }}
            onClick={() => navigate("/enter")}
          />
        </div>
      </div>
    </div>
  );
}
