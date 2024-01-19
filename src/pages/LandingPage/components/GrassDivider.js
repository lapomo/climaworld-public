import React from "react";
import { Image } from "react-bootstrap";
import { grass } from "../../../assets/img";

export default function GrassDivider({top}) {
  return (
    <div
      className="p-3"
      style={{
        position: "relative",
        backgroundColor: "var(--c-bg1)",
        marginBottom: top ? "45px" : "0",
        marginTop: top ? "0" : "65px"
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: top ? "-45px" : "-15px",
          left: "0",
          right: "0",
          display: "flex",
          justifyContent: "center",
          // backgroundImage: "url(" + grass + ")",
          // backgroundSize: "100%",
          // height: "80px",
          // backgroundRepeat: "repeat-x",
        }}
      >
        <div
          style={{
            // backgroundColor: "var(--c-p2)",
            padding: "2rem",
            width: "fit-content",
            borderRadius: "50%",
          }}
        >
          <Image src={grass} height="90px" />
        </div>
      </div>
    </div>
  );
}
