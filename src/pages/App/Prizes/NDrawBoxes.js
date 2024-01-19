import React from "react";
import { useApi } from "../../../contexts/ApiContext";
import NDrawBox from "./NDrawBox";

export default function NDrawBoxes() {
  const api = useApi();

  return (
    <div className="p-3 d-flex flex-wrap gap-3">
      {api.draws && api.draws.filter(
          (draw) => new Date(draw.date_closing).getTime() > new Date().getTime()
        )
        .sort(
          (a, b) =>
            new Date(a.date_closing).getTime() -
            new Date(b.date_closing).getTime()
        )
        .map((draw, index) => {
          return <NDrawBox key={index} draw={draw} />;
        })}
        {api.draws && api.draws.filter(
          (draw) => new Date(draw.date_closing).getTime() > new Date().getTime()
        ).length === 0 && <div>Next draws will be announced soon</div>}
    </div>
  );
}
