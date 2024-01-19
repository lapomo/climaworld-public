import React from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  circle_earth,
  circle_halfearthtree,
  circle_ticket,
  EarthLock,
  TicketStar,
  Verified,
  waterfallRiverGif,
} from "../../../assets/img";
import CTAButton from "../../../components/CTAButton";
import { useAppContext } from "../../../contexts/AppContext";
import { Earth, halfearthtree, HalfEarthTree, ticket, Ticket, earth } from "../assets";

export default function Breakdown() {
  const navigate = useNavigate();
  const app = useAppContext()
  function handle_click() {}
  return (
    <div className="py-5 p-3 d-flex justify-content-center">
      <div className="d-flex flex-column align-items-center justify-content-center gap-3 w-100">
        <div
          className="fs-3 fw-bold"
          style={{
            textDecoration: "underline",
            color: "var(--color-secondary-inverted)",
          }}
        >
          {app?.locale?.currency?.currency_sign}{app?.locale?.paymentAmount.minValue} per month
        </div>
        <div className="mt-3 d-flex flex-column flex-wrap justify-content-center align-items-center gap-3 w-100">
          <div
            className="p-3 rounded d-flex align-items-center gap-3 w-100 fs-5 fw-bold text-center"
            style={{ backgroundColor: "var(--c-bg2)", maxWidth: "380px" }}
          >
            <div
              className="p-1 d-flex justify-content-center align-items-center"
              style={{
                height: "65px",
                width: "65px",
                borderRadius: "50%",
                backgroundColor: "#bfe5ef",
                // padding: "5px",
              }}
            >
              <Image src={halfearthtree} height="100%" />
              {/* <HalfEarthTree height={"100%"} /> */}
            </div>
            <div className="w-100">60% to climate projects</div>
          </div>
          <div
            className="p-3 rounded d-flex align-items-center gap-3 w-100 fs-5 fw-bold text-center"
            style={{ backgroundColor: "var(--c-bg2)", maxWidth: "380px" }}
          >
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                height: "65px",
                width: "65px",
                borderRadius: "50%",
                backgroundColor: "#bfe5ef",
                padding: "10px",
              }}
            >
              <Image src={ticket} height="120%" />
              {/* <Ticket /> */}
            </div>
            <div className="w-100">25% to prize pot</div>
          </div>
          <div
            className="p-3 rounded d-flex align-items-center gap-3 w-100 fs-5 fw-bold text-center"
            style={{ backgroundColor: "var(--c-bg2)", maxWidth: "380px" }}
          >
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                height: "65px",
                width: "65px",
                borderRadius: "50%",
                backgroundColor: "#bfe5ef",
                padding: "10px",
              }}
            >
              <Image src={earth} height="125%" />
              {/* <Earth /> */}
            </div>
            <div className="w-100">15% to climaworld</div>
          </div>
        </div>
        <div style={{ color: "var(--color-secondary-inverted)" }}>
          Cancel anytime
        </div>
        <div className="w-100" style={{ maxWidth: "380px" }}>
          <CTAButton
            className="mt-3"
            text="Subscribe"
            handle_cta_click={() => navigate("/enter")}
          />
        </div>
      </div>
    </div>
  );
}

// <div
// className="p-3 rounded d-flex flex-column align-items-center gap-3"
// style={{ color: "var(--c-p2)", width: "420px" }}
// >
// <div className="fs-3 fw-bold" style={{ textDecoration: "underline" }}>
//   $10 per month
// </div>
// {/* <Image style={{ height: "120px" }} src={waterfallRiverGif} /> */}
// <div
//   className="pt-3 d-flex flex-column gap-3"
//   style={{ color: "var(--c-gs1)" }}
// >
//   <div className="d-flex align-items-center">
//     <div
//       className="p-3 rounded position-relative fs-3 fw-bold"
//       style={{ backgroundColor: "var(--color-primary)", width: "60%" }}
//     >
//       {" "}
//       60%
//     </div>
//     <div
//       className="px-3 fs-5 fw-bold"
//       style={{ width: "40%", color: "var(--c-p2)" }}
//     >
//       climate projects
//     </div>
//   </div>
//   <div
//     className="p-3 rounded fs-5 fw-bold d-flex align-items-center gap-3 position-relative"
//     style={{ backgroundColor: "var(--c-p2)" }}
//   >
//     <div className="position-absolute start-0 end-0 top-0 bottom-0">
//       <div
//         className="rounded"
//         style={{
//           backgroundColor: "var(--color-primary)",
//           width: "60%",
//           height: "100%",
//           zIndex: "999",
//         }}
//       ></div>
//     </div>

//     <div
//       className="p-3 fs-3"
//       style={{ backgroundColor: "var(--color-primary)", zIndex: 1000 }}
//     >
//       60%
//     </div>
//     {/* <EarthOxygenIcon height={45} fill="var(--color-primary)" /> */}
//     <div style={{ zIndex: "1000" }}>to climate projects</div>
//   </div>
//   <div className="d-flex align-items-center">
//     <div
//       className="p-3 rounded position-relative fs-3 fw-bold"
//       style={{ backgroundColor: "var(--color-primary)", width: "25%" }}
//     >
//       25%
//     </div>
//     <div
//       className="px-3 fs-5 fw-bold"
//       style={{ color: "var(--c-p2)", width: "75%" }}
//     >
//       prize fund
//     </div>
//   </div>
//   <div
//     className="p-3 rounded"
//     style={{ backgroundColor: "var(--c-p2)" }}
//   >
//     <div className="rounded d-flex" style={{ border: "1px solid grey"}}>
//     <div
//       className="rounded position-relative fs-3 fw-bold"
//       style={{ backgroundColor: "var(--color-primary)", width: "25%", height: "32px" }}
//     ></div></div>
//     <div className="rounded fs-5 fw-bold d-flex align-items-center gap-3">
//       {/* <WinnerTrophyIcon fill="var(--color-primary)" /> */}
//       <div className="p-3 fs-3">25%</div>
//       to prize fund
//     </div>
//   </div>
//   <div
//     className="p-3 rounded position-relative"
//     style={{ backgroundColor: "var(--color-primary)", width: "15%" }}
//   ></div>
//   <div
//     className="p-3 rounded fs-5 fw-bold d-flex align-items-center gap-3"
//     style={{ backgroundColor: "var(--c-p2)" }}
//   >
//     {/* <GearsIcon fill="var(--color-primary)" /> */}
//     <div className="p-3 fs-3">15%</div>
//     to climaworld
//   </div>
// </div>
// <CTAButton
//   className="mt-3"
//   text="Subscribe"
//   handle_cta_click={() => navigate("/enter")}
// />
// <div>Cancel anytime</div>
// </div>
