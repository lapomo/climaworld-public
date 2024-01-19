import React from "react";
import { useState } from "react";
import { Image } from "react-bootstrap";
import { useApi } from "../../../contexts/ApiContext";
import { useAppContext } from "../../../contexts/AppContext";
import {
  getProjectDescription,
  getProjectLogo,
} from "../../../utility/getProjects";
import Box from "../components/Box";
import ProjectPopUp from "./ProjectPopUp";

export default function CImpactBoxes() {
  const [projectPopup, setProjectPopup] = useState(false);
  const api = useApi();
  const app = useAppContext()
  return (
    <div className="p-3 d-flex gap-3 flex-wrap">
      {api.projects?.map((project, index) => {
        return (
          <Box
          key={index}
            className="cw-climate-box text-center"
            style={{ width: "220px" }}
            onClick={() => setProjectPopup(project)}
          >
            <Image height={60} src={getProjectLogo(project?.slug)} />
            <div className="pt-3 d-flex justify-content-between">
              <div>{project.name}</div>
              <div>{app.locale.currency.currency_sign}{Math.round(app.locale.currency.currency_code === "USD" ? project.funded.amount : project.funded.amount*project.funded.currency_conversion.exchange_rates[app.locale.currency.currency_code])/100}</div>
            </div>
          </Box>
        );
    })}
    <ProjectPopUp show={projectPopup} setProjectPopup={setProjectPopup} />
    </div>
  );
}
