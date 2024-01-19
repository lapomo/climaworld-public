import React from "react";
import { useState } from "react";
import { Image } from "react-bootstrap";
import { Chameleon, grass, monkey } from "../../../../assets/img";
import LeaderList from "./LeaderList";
import { alex, daisy, kane, m, sophie, will } from "./pics";

export default function LeaderBoard() {
  const [leaderToggle, setLeaderToggle] = useState(true);
  const climateLeaders = [
    {
      position: 1,
      user: {
        pic: daisy,
        name: "Daisy",
        info: [
          "4.3 tonnes of carbon captured",
          "11 trees planted",
          "£6 for The Ocean Cleanup",
        ],
      },
    },
    {
      position: 2,
      user: {
        pic: alex,
        name: "Alex",
        info: [
          "3.3 tonnes of carbon captured",
          "27 trees planted",
          "£11.28 for The Ocean Cleanup",
        ],
      },
    },
    {
      position: 3,
      user: {
        pic: m,
        name: "Sam",
        info: [
          "2 tonnes of carbon captured",
          "11 trees planted",
          "£10.56 for The Ocean Cleanup",
        ],
      },
    },
    {
      position: 4,
      user: {
        pic: kane,
        name: "Kane",
        info: [
          "2.3 tonnes of carbon captured",
          "2 trees planted",
          "£15.84 for The Ocean Cleanup",
        ],
      },
    },
  ];
  const prizeLeaders = [
    {
      position: 1,
      user: {
        pic: sophie,
        name: "Sophie",
        info: ["$1220 won", "In 2 sweepstakes", "Verified by random.org"],
      },
    },
    {
      position: 2,
      user: {
        pic: m,
        name: "Elias",
        info: ["$1140 won", "In 3 sweepstakes", "Verified by random.org"],
      },
    },
    {
      position: 3,
      user: {
        pic: daisy,
        name: "Daisy",
        info: ["$200 won", "In 2 sweepstakes", "Verified by random.org"],
      },
    },
    {
      position: 4,
      user: {
        pic: will,
        name: "Will",
        info: ["$110 won", "in 1 sweepstakes", "verified by random.org"],
      },
    },
  ];
  return (
    <div className="pb-5 pt-5 px-3">
      <div className="text-center d-flex justify-content-center fs-1 fw-bold">
        <div className="position-relative">
          <div style={{position: "relative", zIndex: "2"}}>Leaderboard</div>
          {/* <div style={{position: "absolute", bottom: "5px", left: "0", right: "0", zIndex: "1"}}><Image src={grass} width="100%"  /></div> */}
          <Chameleon
            style={{ position: "absolute", top: "-25px", right: "-28px" }}
            height={55}
          />
        </div>
      </div>

      <div className="pt-5 d-none d-md-flex justify-content-center gap-5">
        <LeaderList title={"Climate Impact"} items={climateLeaders} />
        <div className="border"></div>
        <LeaderList title={"Prize Winners"} items={prizeLeaders} />
      </div>
      <div className="pt-5 d-flex flex-column d-md-none gap-3 align-items-center">
        <div className="d-flex gap-3">
          <div
            className="fw-bold"
            style={{
              borderBottom: leaderToggle ? "4px solid var(--c-txt1)" : "none",
              width: "fit-content",
            //   textDecoration: leaderToggle ? "underline" : "none",
              cursor: "pointer",
            }}
            onClick={() => setLeaderToggle(true)}
          >
            Climate Impact
          </div>
          <div className="border"></div>
          <div
            className="fw-bold"
            style={{
              borderBottom: leaderToggle ? "none" : "4px solid var(--c-txt1)",
              width: "fit-content",
            //   textDecoration: leaderToggle ? "underline" : "none",
              cursor: "pointer",
            }}
            onClick={() => setLeaderToggle(false)}
          >
            Prize Winners
          </div>
        </div>
        <LeaderList items={leaderToggle ? climateLeaders : prizeLeaders} />
      </div>
    </div>
  );
}
