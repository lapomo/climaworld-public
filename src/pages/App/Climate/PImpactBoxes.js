import React from "react";
import { useState } from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useApi } from "../../../contexts/ApiContext";
import { useAppContext } from "../../../contexts/AppContext";
import { getProjectLogo } from "../../../utility/getProjects";
import { earth } from "../../LandingPage/assets";
import Box from "../components/Box";
import ProjectPopUp from "./ProjectPopUp";

export default function PImpactBoxes() {
  const api = useApi();
  const app = useAppContext();
  const navigate = useNavigate();

  const [projectPopup, setProjectPopup] = useState(false);

  return (
    <div className="p-3 d-flex gap-3 flex-wrap ">
      {api.user &&
        api.projects &&
        api.projects.map((project, index) => {
          const fundings = api.user.userdata.fundings.filter(
            (funding) => funding.project === project.slug
          );
          const impact = fundings.reduce(
            (acc, curr) =>
              curr.stripeIntent.split(" ")[0] === "donate"
                ? acc + curr.amount
                : acc + curr.amount * 0.6,
            0
          );
          if (impact <= 0) {
            return;
          }
          return (
            <Box
              key={index}
              className="cw-climate-box text-center"
              //   style={{width: "210px", height: "160px"}}
              style={{ width: "220px" }}
              onClick={() => setProjectPopup(project)}
            >
              <Image height={60} src={getProjectLogo(project.slug)} />
              <div
                className="mt-3 d-flex justify-content-between"
                //   style={{ borderTop: "1px solid var(--c-gs1)" }}
              >
                <div>{project.name}</div>
                <div className="">
                  {app.locale?.currency?.currency_sign}
                  {Math.round(impact)/100}
                </div>
              </div>
            </Box>
          );
        })}

      {api.user?.userdata?.fundings?.length === 0 && (
        <Box
          className="cw-climate-box text-center"
          onClick={() => navigate("/fund")}
          style={{ width: "220px" }}
        >
          <Image src={earth} height={60} />
          <div>Click here to increase your impact!</div>
        </Box>
      )}
      <ProjectPopUp show={projectPopup} setProjectPopup={setProjectPopup} />
    </div>
  );
}
