import React from "react";
import { Image } from "react-bootstrap";

import { climaworldLogo, SettingsIcon } from "../../../assets/img";
import { Link, useLocation } from "react-router-dom";

/* 

  Component:  Header
  Function: - standardised header throughout the app w logo and settings
  
 */
export default function Header({ className, elements }) {
  const location = useLocation()
  const settingsLink = location.pathname === "/settings" ? "/home" : "/settings";
  return (
    <div style={styles.header} className={className}>
      <Link to="/">
        <Image style={styles.logo} src={climaworldLogo} />
      </Link>
      {elements}
      {/* <Link to={settingsLink}>
        <SettingsIcon style={styles.settingsIcon} />
      </Link> */}
    </div>
  );
}

const styles = {
  header: {
    width: "100%",
    display: "flex",
    // justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    borderBottom: "1px solid #dee2e6",
    // marginBottom: "16px",
    backgroundColor: "var(--c-p2)",
    // boxShadow: "0 5px 12px 1px var(--c-gs1)",
  },
  logo: {
    height: "3rem",
  },
  settingsIcon: {
    height: "2rem",
  },
};
