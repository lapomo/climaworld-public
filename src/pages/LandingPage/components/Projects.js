import React from "react";
import ProjectCarouselwPops from "../../../components/ProjectCarouselwPops";

import "./Projects.css"

export default function Projects() {
  
  return (
    <div className="py-5" style={{ color: "white" }}>
      <h3 className="fw-bold text-center">Projects you can fund</h3>
      <ProjectCarouselwPops className="pt-5 p-3" />
    </div>
  );
}
