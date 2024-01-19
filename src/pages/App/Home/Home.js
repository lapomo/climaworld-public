import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  drawbg_christmas,
  drawbg_monthly,
  drawbg_newyear,
  heroshortPreview,
  heroshortVideo,
  InfoIcon,
  ShareIcon,
} from "../../../assets/img";
import DrawCountdown from "../../../components/DrawCountdown";
import Loading from "../../../components/Loading";
import ProjectCarouselwPops from "../../../components/ProjectCarouselwPops";
import { useApi } from "../../../contexts/ApiContext";
import PastDraws from "../../LandingPage/components/PastDraws";
import AppContainer from "../components/AppContainer";
import Notification from "../components/Notification";
import HomeBox from "./HomeBox";
import Invite from "./Invite";

export default function () {
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const { user, stats } = useApi();
  const route = useLocation();

  useEffect(() => {
    if (route?.state?.paymentsuccess) {
      setSuccessModal(true);
    }
  }, []);

  return (
    <>
      {isLoading && (
        <div>
          <Loading message={isLoading} />
        </div>
      )}
      {!isLoading && (
        <AppContainer>
          <div className="d-none d-md-block px-3 pb-5 fs-1">
            Welcome to ClimaWorld
          </div>

          <div className={`mt-4 pt-5 p-3 d-flex flex-wrap gap-5 justify-content-center`}>
          {stats?.draws?.cwValue.map((draw) => {
            if(new Date(draw.date_closing).getTime() - new Date().getTime() > 1000 * 60 * 60 * 24 * 5){
             return <DrawCountdown
              // onClick={() => setShowModal(true)}
              draw={draw}
              className="rounded d-flex justify-content-center align-items-center gap-3"
              style={{maxWidth: "calc(min(550px, 75vw))", width: "450px", height: "200px", backgroundColor: "var(--color-secondary-inverted)"}}
              />
            }
          })}
          </div>

          <div className="pt-5 px-3 d-flex justify-content-center">
            <video
              className="rounded cwshadow"
              muted
              controls
              loop
              poster={heroshortPreview}
              style={{ maxWidth: "100%", width: "800px" }}
            >
              <source src={heroshortVideo} type="video/mp4"></source>
            </video>
          </div>

          {/* <PastDraws /> */}
          <div className="pt-5 p-3 d-flex flex-wrap gap-5 justify-content-center">

          {stats?.draws?.cwValue.sort((a, b) => new Date(b.date_closing).getTime() - new Date(a.date_closing).getTime()).map((draw) => {
            if(new Date(draw.date_closing).getTime() - new Date().getTime() <= 1000 * 60 * 60 * 24 * 5){
             return <DrawCountdown
              bg={draw.draw_tag === "new-year-22-23" ? drawbg_newyear : draw.draw_tag === "christmas-2022" ? drawbg_christmas : draw.draw_tag === "january-2023" ? drawbg_monthly : false}
              draw={draw}
              />
            }
          })}
            {/* <DrawCountdown
              className="cwshadow"
              style={{ maxWidth: "800px" }}
              bg={drawbg_christmas}
              special="1"
            />
            <DrawCountdown
              className="cwshadow"
              style={{ maxWidth: "800px" }}
              bg={drawbg_newyear}
              special="2"
            /> */}
          </div>


          <div
            className="my-5 d-flex justify-content-center"
            style={{ color: "var(--color-secondary)" }}
          >
            <Invite className="cwshadow" />
          </div>
          <Modal
            show={successModal}
            centered
            onHide={() => setSuccessModal(false)}
          >
            <Modal.Header closeButton className="fw-bold text-center">
              Congratulations!
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-column justify-content-center gap-2 text-center">
                <div>You've joined ClimaWorld.</div>
                <div>You funded {user?.userdata?.projects[0]?.name}.</div>
                <div>You entered our next prize draws.</div>
                <div>
                  See your prize draw entries on the{" "}
                  <Link to="/profile">profile page</Link>.
                </div>
                <div>
                  See the countdowns to the prize draws on the{" "}
                  <Link to="/home" onClick={() => setSuccessModal(false)}>
                    homepage
                  </Link>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </AppContainer>
      )}
    </>
  );
}

const styles = {};
