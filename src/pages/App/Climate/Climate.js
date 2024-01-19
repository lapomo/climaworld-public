import React from "react";
import AppContainer from "../components/AppContainer";
import CImpactBoxes from "./CImpactBoxes";
import PImpactBoxes from "./PImpactBoxes";

export default function Climate() {
  return (
    <AppContainer>
      <div className="d-none d-md-block px-3 pb-5 fs-1">
        Welcome to ClimaWorld
      </div>
      <div className="mt-3 mt-md-0 p-3 fs-4 fw-bold ">Your Impact 🙋‍♂</div>
      <div><PImpactBoxes /></div>
      <div className="p-3 fs-4 fw-bold">Community Impact 🫶</div>
      <div><CImpactBoxes /></div>
      {/* <div className="p-3 fs-4 ">
        Invite your friends so we can fund more climate projects
      </div> */}
    </AppContainer>
  );
}
