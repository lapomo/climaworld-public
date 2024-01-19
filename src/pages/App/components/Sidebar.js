import React, { useEffect } from "react";
import { useState } from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { climaworldLogo, climaworldWhiteLogo } from "../../../assets/img";
import { useApi } from "../../../contexts/ApiContext";

import "./Sidebar.css";
import SidebarOption from "./SidebarOption";

export default function Sidebar({ className, selected }) {
  const [mainMenuOptions, setMainMenuOptions] = useState([
    {
      name: "Home",
      slug: "home",
      action: () => {
        navigate("/home");
      },
    },
    {
      name: "Fund",
      slug: "fund",
      action: () => {
        navigate("/fund");
      },
    },
    {
      name: "Draws",
      slug: "prizes",
      action: () => {
        navigate("/prizes");
      },
    },
    { slug: "separator" },
    {
      name: "Settings",
      slug: "settings",
      action: () => {
        navigate("/settings");
      },
    },
    // { name: "Log Out", slug: "logout", action: () => auth.logout()}
  ]);

  const { isAdmin, user } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("renderSidebar");
    if (isAdmin) {
      console.log("isAdmin");
      setMainMenuOptions([...mainMenuOptions, {
        name: "Admin",
        slug: "admin",
        action: () => {
          navigate("/admin");
        },
      }]);
    }
  }, [isAdmin]);

  return (
    <div
      className={`${className} flex-column position-relative`}
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--c-p2)",
        // color: "black",
        // borderRight: "1px solid white"
        boxShadow: "0 5px 12px 1px var(--c-gs1)",
      }}
    >
      <div className="pt-5 mx-5">
        <Image
          className=""
          src={climaworldLogo}
          width={"190px"}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </div>
      <div className="pt-5 d-flex flex-column gap-4">
        {mainMenuOptions.map((menuOption, index) => {
          if(menuOption.slug === "fund" && user?.userdata?.status === "subscription"){
            return
          }
          return <SidebarOption menuOption={menuOption} key={index} />;
        })}
      </div>
    </div>
  );
}
