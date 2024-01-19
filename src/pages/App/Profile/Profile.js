import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SettingsIcon } from "../../../assets/img";
import ProjectCarouselwPops from "../../../components/ProjectCarouselwPops";
import { useApi } from "../../../contexts/ApiContext";
import AppContainer from "../components/AppContainer";
import TicketGenerator from "./TicketGenerator";

export default function Profile() {
  const { user } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("renderpage");
  });

  return (
    <AppContainer>
      <div className="d-none d-md-block px-3 pb-5 fs-1">Profile</div>
      <div className="pt-5 p-3 fs-2 fw-bold text-center">Your Entries</div>
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
        {user?.tickets &&
          Object.entries(user.tickets).map(([key, value]) => {
            // console.log(JSON.stringify(key) + " " + JSON.stringify(value));
            // don't show tickets older than 7 days
            if(new Date(key).getTime() - new Date().getTime() < -(1000 * 60 * 60 * 24 * 7)){
              return 
            }
            const ticket = {
              color: "var(--color-primary)",
              name: "monthly",
              number: value,
              username: user?.userdata?.name,
              prize: "1000",
            };
            switch (key) {
              case "2022-12-26T14:00:00Z":
                ticket.color = "#bf2b2cff";
                ticket.name = "christmas";
                ticket.prize = "100";
                break;
              case "2023-01-01T14:00:00Z":
                ticket.color = "black";
                ticket.name = "newyear";
                ticket.prize = "100";
                break;
              default:
            }
            return <TicketGenerator ticket={ticket} />;
          })}
      </div>
      <div className="p-3 pt-5 fs-2 fw-bold text-center">
        Projects you've funded
      </div>

      <ProjectCarouselwPops
        className="px-3 pt-1"
        cardClassName="cwshadow"
        filter="user"
      />

      <div className="d-md-none mt-5 m-3 p-4 d-flex justify-content-center">
        <Card
          className="p-4 cwshadow"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/settings")}
        >
          <div className="d-flex gap-5 justify-content-between align-items-center">
            <div className="fs-5 " style={{ color: "black" }}>
              Settings
            </div>
            <SettingsIcon height={32} />
          </div>
        </Card>
      </div>
    </AppContainer>
  );
}
