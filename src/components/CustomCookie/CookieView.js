import React from "react";
import { useState } from "react";
import { CollapsedIcon, ExpandIcon } from "../../assets/img";

export default function CookieView() {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className="p-3 border d-flex flex-column gap-3">
      <div
        className="d-flex justify-content-between"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div>Datadog</div>
        {collapsed ? (
          <CollapsedIcon fill="black" height="24" />
        ) : (
          <ExpandIcon fill="black" height="24" />
        )}
      </div>
      {!collapsed && (
        <div className="d-flex flex-column gap-3">
          <div
            className="p-3 rounded d-flex flex-column"
            style={styles.singleContainer}
          >
            <div className="d-flex">
              <div style={styles.cookieLineFirst}>Name</div>
              <div>_dd_s</div>
            </div>
            <div className="d-flex">
              <div style={styles.cookieLineFirst}>Host</div>
              <div>climaworld.app</div>
            </div>
            <div className="d-flex">
              <div style={styles.cookieLineFirst}>Duration</div>
              <div>15min</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  singleContainer: {
    backgroundColor: "#F5F5F5",
    fontSize: "11px",
  },
  cookieLineFirst: {
    width: "30%",
  },
};
