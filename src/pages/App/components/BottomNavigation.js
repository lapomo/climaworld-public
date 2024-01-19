import React from "react";
import { Image } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  circle_earth,
  earth,
  EarthIcon,
  FlashIcon,
  HomeIcon,
  PersonIcon,
  TrophyIcon,
} from "../../../assets/img";
import { useApi } from "../../../contexts/ApiContext";
import { Earth } from "../../LandingPage/assets";

export default function BottomNavigation({ className }) {
  const api = useApi();
  const pages = [
    { name: "Climate", icon: <EarthIcon height={32} />, path: "/home" },
    // { name: "separator" },
    { name: "Draws", icon: <TrophyIcon height={32} />, path: "/prizes" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  function handleNavClick(path) {
    navigate(path);
  }

  return (
    <div
      className={`${className} w-100 d-flex justify-content-center align-items-center`} // my-3
      style={styles.container}
    >
      <div
        className="w-100 py-1 justify-content-around gap-4 border d-flex position-relative cwshadow" // "w-100 py-1" // p-3 rounded
        style={styles.navContainer}
      >
        {api?.user?.userdata?.fundings?.length === 0 && (
          <div
            className="position-absolute p-2 rounded-circle "
            style={{
              top: "-20px",
              backgroundColor: "gold",
              zIndex: "9999",
              boxShadow: "0 0 5px var(--c-shad-light)",
            }}
            onClick={() => navigate("/fund")}
          >
            {/* <Image src={earth} height={50} /> */}
            {/* <Earth height={50} /> */}
            {/* <EarthIcon height={40} fill="var(--c-cw1)" /> */}
            <FlashIcon height={40} fill={"white"} />
          </div>
        )}
        <div className="position-absolute top-0 bottom-0 border"></div>
        {pages.map((page, index) => {
          if (page.name === "separator") {
            return <div key={index} className="border"></div>;
          }
          return (
            <div key={index}>
              <div
                className="text-center p-1"
                key={"c" + index}
                style={{
                  cursor: "pointer",
                  color:
                    location.pathname === page.path
                      ? "var(--color-primary)"
                      : "gray",
                  fill:
                    location.pathname === page.path
                      ? "var(--color-primary)"
                      : "gray",
                }}
                onClick={() => handleNavClick(page.path)}
              >
                {page.icon}
                <div>{page.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: "0",
    // backgroundColor: "red",
  },
  navContainer: {
    backgroundColor: "white",
  },
};
