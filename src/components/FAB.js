import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Chameleon,
  ChatBubblesIcon,
  InstagramIcon,
  MailIcon,
  MailOutlineIcon,
  WhatsappIcon,
} from "../assets/img";
import company from "../assets/text/company";

import "./FAB.css";

export default function FAB() {
  const [extended, setExtended] = useState(false);
  const [inApp, setInApp] = useState(true);

  //   const location = useLocation()

  const socials = [
    {
      name: "Whatsapp",
      icon: <WhatsappIcon width={45} fill="var(--c-gs1)" />,
      link: company.links.whatsapp,
    },
    // {name: "Viber", icon: <WhatsappIcon />, link: company.links.whatsapp},
    {
      name: "Instagram",
      icon: <InstagramIcon  width={45} fill="var(--c-gs1)" />,
      link: company.links.instagram,
    },
    {
      name: "Mail",
      icon: <MailOutlineIcon  width={45} fill="var(--c-gs1)" />,
      link: company.links.mail,
    },
  ];

  function handleClick() {
    setExtended(!extended);
  }

  //   useEffect(()=>{
  //     const inAppPaths = ["home", "profile", "settings"]
  //     if(inAppPaths.includes(location.pathname)){
  //         setInApp(true)
  //     }else{
  //         setInApp(false)
  //     }

  //   },[location.pathname])

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center gap-3"
      style={{
        position: "fixed",
        bottom: inApp ? "calc(0% + 90px)" : "calc(0% + 24px)",
        right: inApp ? "calc(0% + 16px)" : "calc(0% + 24px)",
      }}
    >
      {extended && (
        <div className=" d-flex flex-column gap-2" style={{ width: "75%" }}>
          {socials.map((social, index) => {
            return (
              <a key={index} href={social.link} target="_blank">
                <div
                  className="cw-social-box p-2 d-flex justify-content-center align-items-center"
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "var(--c-p2)",
                    boxShadow: "0px 0px 18px var(--c-shad-dark)",
                  }}
                  // onClick={social.link}
                >
                  {social.icon}
                </div>
              </a>
            );
          })}
        </div>
      )}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          borderRadius: "50%",
          height: "58px",
          width: "58px",
          color: "var(--c-p2)",
          backgroundColor: extended
            ? "var(--c-p2)"
            : "var(--c-p1)",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 8px 20px 0px",
          zIndex: "2147483645",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        {extended ? (
          <Chameleon style={{ height: "75%" }} />
        ) : (
          <ChatBubblesIcon style={{ height: "60%", width: "60%" }} />
        )}
      </div>
    </div>
  );
}
