import React from "react";
import { useLocation } from "react-router-dom";

export default function SidebarOption({menuOption}) {
    const location = useLocation()
    if(menuOption.slug === "separator"){
        return(
            <div className="mx-5" style={{borderBottom: "0.5px solid var(--c-p1)", width: "190px"}}></div>
        )
    }

    const selected = location.pathname === "/" + menuOption.slug

    const styles = {
        selector: {
          height: "40px",
          width: "8px",
          backgroundColor:
            selected ? "var(--c-p1)" : "transparent",
        },
        option: {
          fontWeight: selected ? "bold" : "normal",
          color: "var(--c-txt1)",
        },
      };
      return (
        <div
          className="menu-option d-flex "
          style={{ cursor: "pointer" }}
          onClick={menuOption.action}
        >
          <div style={styles.selector}></div>
          <div className="p-2 ms-5 ps-4" style={styles.option}>
            {menuOption.name}
          </div>
        </div>
      )
}
