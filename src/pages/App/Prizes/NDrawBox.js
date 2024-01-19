import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useApi } from "../../../contexts/ApiContext";
import Box from "../components/Box";
import CountDown from "./CountDown";

export default function NDrawBox({ draw }) {
  const api = useApi();
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (api.user?.tickets[draw.draw_id]) setEntered(true);
  }, [api.user?.tickets]);

  return (
    <div className="text-center">
      <Box 
      style={{ width: "260px"}}
      >
        <div className="fw-bold fs-5">{draw.draw_name}</div>
        <div className="pt-3 d-flex justify-content-center">
          <CountDown draw={draw} />
        </div>
        <div className="pt-3">
          {entered ? (
            <div>Your Entry: {api.user.tickets[draw.draw_id]}</div>
          ) : (
            <div>
              {/* <div
                className="cw-clickable p-2 text-center rounded border"
                onClick={() => navigate("/fund")}
              >
                Enter Now
              </div> */}
              <button
              className="py-3 px-5 fw-bold rounded-pill cw-clickable"
              onClick={() => navigate("/fund")}
              variant="cw-custom"
              size="sm"
              style={{
                border: "1px solid",
                color: "var(--color-primary-inverted)",
                backgroundColor:"var(--color-primary)",
                // boxShadow: "grey 0px 0px 13px 0px !important",
                // padding: "0.7rem",
              }}
            >
              Enter Now
              {/* <div className="cw-fund-payemoji">🥳</div> */}
            </button>
            </div>
          )}
        </div>
      </Box>
    </div>
  );
}
