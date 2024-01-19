import React from "react";
import { useApi } from "../../../contexts/ApiContext";
import NDrawBox from "./NDrawBox";
import PDrawBox from "./PDrawBox";

export default function PDrawBoxes() {
  const api = useApi();

  return (
    <div className="p-3 d-flex justify-content-md-start justify-content-start flex-wrap gap-3">
      {api.draws &&
        api.draws
          .filter(
            (draw) =>
              new Date(draw.date_closing).getTime() < new Date().getTime()
          )
          .sort(
            (a, b) =>
              new Date(b.date_closing).getTime() -
              new Date(a.date_closing).getTime()
          )
          .map((draw, index) => {
            return <PDrawBox key={index} draw={draw} />;
          })}
    </div>
  );
}
