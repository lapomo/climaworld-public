import React, { useEffect } from "react";
import { useState } from "react";
import { Image, Placeholder } from "react-bootstrap";
import { useLocation } from "react-router";
import {
  EarthIcon,
  earth_money,
  LeafIcon,
  phone_bank,
  tree_cash,
} from "../../../../assets/img";
import PhoneContainer from "../../../../components/PhoneContainer";
import { Earth, WinnerTrophyIcon } from "../../assets";

export default function HowToPerson() {
  const location = useLocation()

  const [isBusiness, setIsBusiness] = useState()

  useEffect(() => {
    if(location.pathname === "/business"){
      setIsBusiness(true)
    }
  },[location.pathname])
  const items = [
    {
      icon: phone_bank,
      title: isBusiness ? "Choose a benefits plan" : "Create a free account",
      text: isBusiness ? "60% of the subscriptions you purchase for your employees will fund climate projects" : "Look around for free before you support a climate project and play our sweepstakes.",
    },
    {
      icon: earth_money,
      title: isBusiness ? "Onboard teams with a few clicks" : "Fund climate projects",
      text: isBusiness ? "Easily onboard your teams so they can begin their new climate employee benefits plan" : "Support projects removing ocean plastic, planting trees & in the future many more.",
    },
    {
      icon: tree_cash,
      title: isBusiness ? "Begin climate sweepstakes!" : "Enter our sweepstakes",
      text: isBusiness ? "Employees will get monthly climate updates and have a chance to win cash prizes!" : "Get the chance to win up to $1,000 for protecting the planet.",
    },
  ];
  return (
    <div
      className="py-5 px-3 d-flex flex-row flex-wrap justify-content-center gap-3 text-center"
      style={{ backgroundColor: "var(--c-bg1)" }}
    >
      {items.map((item, index) => {
        return (
          <div
          key={index}
            className="p-4 py-5 rounded d-flex flex-column gap-4"
            style={{
              backgroundColor: "var(--c-p2)",
              maxWidth: "320px",
              minWidth: "200px",
              flex: "1",
            }}
          >
            <div className="d-flex justify-content-center">
              <Image height={145} src={item.icon} />
            </div>
            <div className="fs-5 fw-bold">{item.title}</div>
            <div className="" style={{fontSize: "1.2rem"}}>{item.text}</div>
          </div>
        );
      })}
    </div>
  );
}
