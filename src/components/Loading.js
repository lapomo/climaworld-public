import React from "react";
import { Image, Modal } from "react-bootstrap";
import { treeGif, treeVideo } from "../assets/img";

/* 

  Component:  Loading
  Function: - show something fun while we're waiting for something to load
  
 */
export default function Loading({ message }) {
  return (
    <Modal show={true} centered fullscreen={true} >
      <Modal.Body style={{backgroundColor: "#fcfcff"}}>
        <div className="d-flex flex-column align-items-center text-center mt-5">
          <Image width={350} src={treeGif} />
          {/* <video muted loop autoPlay={true} width={350}>
            <source src={treeVideo} type="video/mp4"></source>
          </video> */}
          <span style={{ position: "relative", top: "-40px" }}>{message}</span>
        </div>
      </Modal.Body>
    </Modal>
  );
}
