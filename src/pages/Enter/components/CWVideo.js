import React from "react";
import { heroshortPreview, heroshortVideo } from "../../../assets/img";

export default function CWVideo({blue=false}) {
  return (
    <div className="py-5" style={{ color: "var(--c-txt1)", backgroundColor: blue ? "var(--c-bg1)" : "" }}>
      <h3 className="fw-bold text-center">Meet ClimaWorld</h3>
      <div className="pt-5 d-flex justify-content-center">
        <video
        className="rounded"
          muted
          controls
          loop
          poster={heroshortPreview}
          style={{ maxWidth: "100%", maxHeight: "calc(100vh - 140px)" }}
        >
          <source src={heroshortVideo} type="video/mp4"></source>
        </video>
      </div>
    </div>
  );
}
