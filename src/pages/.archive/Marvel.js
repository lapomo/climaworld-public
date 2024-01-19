import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { heroshortVideo } from "../../assets/img";
import { useApi } from "../../contexts/ApiContext";

/* 

  Marvel Page: Try out fancy things

 */
export default function Marvel() {
  const [stuff, setStuff] = useState("Duude");

  const { localeCountry, setLocaleCountry } = useApi();

  async function switchLocation() {
    const response = await fetch("https://api.ipdata.co").then((response) =>
      console.log(response.json())
    );
    const response2 = await fetch("https://ipinfo.io").then((response) => {
      console.log(JSON.stringify(response));
      setStuff(JSON.stringify(response));
    });
  }

  useEffect(() => {
    switchLocation();
  }, []);

  return (
    <div
      className="d-flex justify-content-center position-relative"
      style={{ backgroundColor: "white" }}
    >
      <video autoPlay src={heroshortVideo} style={{ height: "100vh" }}></video>
      {/* <InputGroup className="border rounded-pill w-100 waitinglist-group position-absolute top-50" style={{maxWidth: "520px", boxShadow: "0px 0px 13px 0px grey"}}>
            <Form.Control autoFocus className="border-0 ps-4 py-3 text-center text-sm-start waitinglist-input" style={{backgroundColor: "transparent", boxShadow: "0 0"}} placeholder="Email Address" />
            <button className="d-none d-sm-block shadow rounded-pill py-3 px-5 fw-bold" style={styles.ctaButton} >Join the waiting list</button>
          </InputGroup> */}
      <div>{stuff}</div>
    </div>
  );
}

const styles = {
  ctaButton: {
    border: "0",
    color: "var(--color-primary-inverted)",
    backgroundColor: "var(--color-primary)",
    // color: "#54a8b3",
    // backgroundColor: "white",
  },
};
