import React from "react";
import LeaderItem from "./LeaderItem";

export default function LeaderList({ title, items }) {
  return (
    <div>
      <div className="fw-bold" style={{ borderBottom: "4px solid var(--c-txt1)", width: "fit-content" }}>
        {title}
      </div>
      <div className="pt-3 d-flex flex-column gap-3">
        {items.map((item, index) => {
          return <LeaderItem key={index} item={item} />;
        })}
      </div>
    </div>
  );
}
