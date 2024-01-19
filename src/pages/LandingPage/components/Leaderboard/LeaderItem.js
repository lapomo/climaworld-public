import React from "react";
import { Image } from "react-bootstrap";

export default function LeaderItem({ item }) {
  return (
    <div className="d-flex gap-3 align-items-center" 
    style={{ minHeight: "100px", width: "332px" }}
    >
      <div className="fw-bold text-center" style={{ width: "12px" }}>
        {item.position}
      </div>
      <div>
        <Image src={item.user.pic} width="45px" style={{borderRadius: "50%/70% 30% 70% 30%"}} />
      </div>
      <div>
        <div className="fw-bold">{item.user.name}</div>
        <div 
        // style={{ fontSize: "12px" }}
        >
          {item.user.info.map((info, index) => (
            <div key={index}>{info}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
