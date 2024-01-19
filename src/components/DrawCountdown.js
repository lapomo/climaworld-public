import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Chameleon, GreenGrassBckg, waterfallGif } from "../assets/img";
import { useApi } from "../contexts/ApiContext";
import LoadingEarth from "./LoadingEarth";

export default function DrawCountdown({
  className = "",
  style = {},
  draw,
  bg,
  onClick,
}) {
  const countdownInitValue = {
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  };

  const [countdown, setCountdown] = useState(countdownInitValue);
  const [closed, setClosed] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const { stats } = useApi();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("countdowneffect");

    const deadline = new Date(draw.date_closing).getTime();

    if (deadline - new Date().getTime() <= 0) {
      // special === "2" ? setDrawing(true) : setClosed(true);
      setClosed(true);
      if (draw.draw_result.find((item) => item.winner_id === "")) {
        setDrawing(true);
      }
      return;
    }

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timediff = deadline - currentTime;
      const totalDays = Math.floor(timediff / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(
        (timediff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const totalMinutes = Math.floor(
        (timediff % (1000 * 60 * 60)) / (1000 * 60)
      );
      const totalSeconds = Math.floor((timediff % (1000 * 60)) / 1000);

      const runningCountdownTime = {
        days: totalDays,
        hours: totalHours,
        minutes: totalMinutes,
        seconds: totalSeconds,
      };
      setCountdown(runningCountdownTime);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [stats]);
  return (
    <div
      className={`position-relative ${className}`}
      style={style}
      onClick={!closed ? onClick : undefined}
    >
      {/* <GreenGrassBckg className={`${className} rounded w-100`} /> */}
      {bg && (
        <Image
          className="rounded w-100"
          src={bg}
          style={{ maxWidth: "550px" }}
        />
      )}
      <div
        className={`rounded ${
          draw.draw_tag !== "february-2023"
            ? "p-3 position-absolute top-0 end-0 bottom-0 start-0"
            : "border p-3 position-absolute top-0 end-0 bottom-0 start-0"
        }  d-flex flex-column justify-content-center align-items-center gap-1`}
        style={{
          color: bg ? "var(--c-p2)" : "var(--color-secondary)",
          backgroundColor:
            // bg
            //   ? "transparent"
            //   : "var(--color-secondary-inverted)",
            "transparent",
          // textShadow: "1px 1px 1px var(--c-gs1)",
        }}
      >
        {/* {!bg && (
          <div
            className="position-absolute"
            style={{ top: "-65px", right: "-34px" }}
          >
            <Chameleon height={120} />
          </div>
        )} */}
        <div
          className="w-100 d-flex flex-column justify-content-center align-items-center gap-1 position-relative"
          // style={{top: "14px"}}
        >
          <div style={{ color: "var(--c-p2)" }}>
            {(closed || drawing) && draw.draw_tag === "february-2023" && (
              <div className="d-flex align-items-center gap-3 pb-3">
                <Image src={waterfallGif} height="52px" />
                <div className="fs-3 fw-bold">{draw.draw_name}</div>
              </div>
            )}
          </div>
          {closed || drawing ? (
            // <a href="#pastdraws-anchor" style={{ textDecoration: "none" }}>
            <div
              className="px-3 rounded fs-5 fw-bold d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: "var(--c-p2)",
                color: "var(--c-gs1)",
                height: "60px",
                width: "100%",
                boxShadow: "2px 2px 31px black",
                cursor: "pointer",
              }}
              onClick={() => {
                if (closed) {
                  navigate("/draw?tag=" + draw.draw_tag);
                }
              }}
            >
              <div className="w-100 text-center">
                {drawing
                  ? "Entries closed - Winners being drawn!"
                  : "Check if you've won!"}
              </div>
            </div>
          ) : // </a>
          JSON.stringify(countdown) === JSON.stringify(countdownInitValue) ? (
            <LoadingEarth animation="translate" />
          ) : (
            <div
              className="p-4 w-100 rounded d-flex flex-column justify-content-center align-items-center gap-3"
              style={{
                backgroundColor: "var(--c-p2)",
                color: "var(--c-gs1)",
                // height: "60px",
                maxHeight: "100%",
              }}
            >
              {!bg && (
                <div className="d-flex align-items-center gap-3">
                  <Image src={waterfallGif} height="52px" />
                  <div className="fs-3 fw-bold">{draw.draw_name}</div>
                </div>
              )}
              <div
                className="px-3 rounded fs-3 fw-bold d-flex justify-content-center align-items-center gap-2 gap-md-3"
                style={{
                  // backgroundColor: "var(--c-p2)",
                  color: "var(--c-gs1)",
                  // height: "60px",
                  maxHeight: "100%",
                  width: "100%",
                }}
              >
                <div
                  className="d-flex flex-column align-items-center gap-1"
                  style={{ maxWidth: "60px", minWidth: "40px" }}
                >
                  <div
                    className="p-2 p-md-3 rounded w-100 text-center d-flex justify-content-center"
                    style={{ backgroundColor: "#80808040" }}
                  >
                    <div>{countdown.days}</div>
                  </div>
                  <div className="fw-normal" style={{ fontSize: "12px" }}>
                    Day
                  </div>
                </div>
                <div
                  className="d-flex flex-column align-items-center gap-1"
                  style={{ maxWidth: "60px", minWidth: "40px" }}
                >
                  <div
                    className="p-2 p-md-3 rounded w-100 text-center d-flex justify-content-center"
                    style={{ backgroundColor: "#80808040" }}
                  >
                    <div>{countdown.hours}</div>
                  </div>
                  <div className="fw-normal" style={{ fontSize: "12px" }}>
                    Hour
                  </div>
                </div>
                <div
                  className="d-flex flex-column align-items-center gap-1"
                  style={{ maxWidth: "60px", minWidth: "40px" }}
                >
                  <div
                    className="p-2 p-md-3 rounded w-100 text-center d-flex justify-content-center"
                    style={{ backgroundColor: "#80808040" }}
                  >
                    <div>{countdown.minutes}</div>
                  </div>
                  <div className="fw-normal" style={{ fontSize: "12px" }}>
                    Min
                  </div>
                </div>
                <div
                  className="d-flex flex-column align-items-center gap-1"
                  style={{ maxWidth: "60px", minWidth: "40px" }}
                >
                  <div
                    className="p-2 p-md-3 rounded w-100 text-center d-flex justify-content-center"
                    style={{ backgroundColor: "#80808040" }}
                  >
                    <div>{countdown.seconds}</div>
                  </div>
                  <div className="fw-normal" style={{ fontSize: "12px" }}>
                    Sec
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
