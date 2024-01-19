import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import "./CountDown.css";

export default function CountDown({ draw }) {
  const [countdown, setCountdown] = useState(false);
  const [closed, setClosed] = useState(false);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    console.log("countdowneffect");

    const deadline = new Date(draw.date_closing).getTime();

    if (deadline - new Date().getTime() <= 0) {
      setClosed(true);
      if (!draw.draw_result.length > 0) {
        setDrawing(true);
      }
      return;
    }

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timediff = deadline - currentTime;

      if (timediff < 0) {
        setCountdown([
          {
            name: "Days",
            value: 0,
          },
          {
            name: "Hours",
            value: 0,
          },
          {
            name: "Min",
            value: 0,
          },
          {
            name: "Sec",
            value: 0,
          },
        ]);
        clearInterval(interval);
      } else {
        const totalDays = Math.floor(timediff / (1000 * 60 * 60 * 24));
        const totalHours = Math.floor(
          (timediff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const totalMinutes = Math.floor(
          (timediff % (1000 * 60 * 60)) / (1000 * 60)
        );
        const totalSeconds = Math.floor((timediff % (1000 * 60)) / 1000);

        const runningCountdownTime = [
          {
            name: "Days",
            value: totalDays,
          },
          {
            name: "Hours",
            value: totalHours,
          },
          {
            name: "Min",
            value: totalMinutes,
          },
          {
            name: "Sec",
            value: totalSeconds,
          },
        ];

        setCountdown(runningCountdownTime);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [draw]);

  return (
    <div>
      {countdown ? (
        <div className="d-flex flex-wrap gap-2 ">
          {countdown.map((number, index) => (
            <CountDownNumber key={index} number={number} />
          ))}
        </div>
      ) : (
        <div>
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

function CountDownNumber({ number }) {
  return (
    <div
      className="cw-countdown-number py-2  rounded"
      style={{ 
        // backgroundColor: "white", 
        // color: "black", 
        width: "45px",
        border: "1px solid black" }}
    >
      <div>{number.value}</div>
      <div style={{ fontSize: "11px" }}>{number.name}</div>
    </div>
  );
}
