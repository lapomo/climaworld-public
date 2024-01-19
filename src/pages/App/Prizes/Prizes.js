import React from "react";
import AppContainer from "../components/AppContainer";
import NDrawBoxes from "./NDrawBoxes";
import PDrawBoxes from "./PDrawBoxes";

export default function Prizes() {
  return (
    <AppContainer>
      <div className="d-none d-md-block px-3 pb-5 fs-1">
        Welcome to ClimaWorld
      </div>
      <div className="mt-3 mt-md-0 p-3 fs-4 fw-bold">Next Draw 🏁</div>
      <div>
        <NDrawBoxes />
      </div>
      <div className="p-3 fs-4 fw-bold">Past Draws 🏆</div>
      <div>
        <PDrawBoxes />
      </div>
      {/* <div className="p-3 fs-4 ">
        Invite your friends so we can increase the prizes
      </div> */}
    </AppContainer>
  );
}
