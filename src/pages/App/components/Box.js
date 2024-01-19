import React from "react";
import { useAppContext } from "../../../contexts/AppContext";

import "./Box.css"

export default function Box({ children, className, style, onClick }) {
  const app = useAppContext();
  const boxStyle = {
    // border: "1px solid var(--c-gs1)",
    backgroundColor: "white", color: "black"
  }
  const mergedStyle = Object.assign({}, boxStyle, style)
  return (
    <div
      onClick={onClick}
      className={`${onClick ? "cw-clickable" : ""} ${className ? className : ""} border p-3 rounded`}
      // style={{backgroundColor: "white", color: "black"}}
      style={mergedStyle}
    >
      {children}
    </div>
  );
}
