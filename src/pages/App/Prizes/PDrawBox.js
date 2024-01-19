import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useApi } from "../../../contexts/ApiContext";
import Box from "../components/Box";

export default function PDrawBox({ draw }) {
  const api = useApi();
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);
  const [wonPrize, setWonPrize] = useState("$0");
  const [drawing, setDrawing] = useState(false)

  useEffect(() => {
    if (api.user && api?.user?.tickets[draw.draw_id]) {
      setEntered(true);
      const prizeWon = draw.draw_result.find(
        (result) => result.winner_id === api.user.id
      );
      if (prizeWon) {
        setWonPrize(prizeWon.prize);
      }
    }
  }, [api?.user?.tickets, draw.draw_result]);

  useEffect(() => {
    if (draw.draw_result.find((item) => item.winner_id === "")) {
      setDrawing(true);
    }
  },[draw.draw_result])

  return (
    <div className="text-center" >
      <Box style={{ width: "210px", height: "160px"}}>
        <div className="fw-bold">{draw.draw_name}</div>
        <div className="pt-3 d-flex justify-content-center">
          <div
            className="cw-clickable p-2 px-3 text-center rounded border"
            onClick={() => navigate("/draw?tag=" + draw.draw_tag)}
          >
            {drawing ? "Drawing Winners" : "Show Winners"}
          </div>
        </div>
        <div className="pt-3">
          {entered ? drawing ? (<div style={{fontSize: "14px"}}>Live Draw on Instagram!</div>) : (
            <div>You won: {wonPrize}</div>
          ) : (
            <div>
              <div>No Entry</div>
            </div>
          )}
        </div>
      </Box>
    </div>
  );
}
