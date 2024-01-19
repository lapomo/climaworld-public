import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useApi } from "../../contexts/ApiContext";
import PhoneContainer from "../../components/PhoneContainer";
import {
  activismVideo,
  atomEnergyVideo,
  AtomIcon,
  BackIcon,
  CheckIcon,
  co2captureVideo,
  earth,
  tortoiseVideo,
  TreeIcon,
  TurtleIcon,
} from "../../assets/img";

import "./Vote.css";
import { Image, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { activismcontent, carboncapture, nuclear, ocean } from "../../assets/text/projects";

/* 

  Voting Page: show voting options or the voted for option with sharing opportunities

  TODO: add social media links / community connect / beta request
 */

  export const projects = [
    {
      title: "Ocean",
      icon: <TreeIcon height={"100%"} fill="black" />,
      video: tortoiseVideo,
      text: "Ocean Conservation",
      color: "#75d481",
      slug: "ocean",
      description: ocean(),
    },
    {
      title: "Activism & Content",
      icon: <AtomIcon height={"100%"} fill="black" />,
      video: activismVideo,
      text: "Activism & Content",
      color: "#1b4a56",
      slug: "activismcontent",
      description: activismcontent(),
    },
    {
      title: "Nuclear Energy",
      icon: <TurtleIcon height={"100%"} fill="black" />,
      video: atomEnergyVideo,
      text: "Nuclear Energy",
      color: "#81c3c9",
      slug: "nuclear",
      description: nuclear(),
    },
    {
      title: "Carbon Capture",
      icon: <TurtleIcon height={"100%"} fill="black" />,
      video: co2captureVideo,
      text: "Carbon Capture",
      color: "#43b14b",
      slug: "carboncapture",
      description: carboncapture(),
    },
  ];

  
export default function Vote() {
  const [paramsExist, setParamsExist] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmationError, setConfirmationError] = useState(false);
  const [subscriberId, setSubscriberId] = useState(false);
  const [message, setMessage] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(6);

  const [project, setProject] = useState(false);
  const [votingLoading, setVotingLoading] = useState(false);
  const [voted, setVoted] = useState(false);
  const [voter, setVoter] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const { confirmSubscription, sendVote } = useApi();
  const navigate = useNavigate();

  async function sendConfirmation(id, code) {
    setIsConfirming(true);
    const result = await confirmSubscription(id, code);
    console.log(result);
    if (result.data.confirmed) {
      if (result.data.info && result.data.info.vote) {
        setVoted(true);
        setVoter(result.data);
        console.log(result.data.info.vote);
        projects.forEach(
          ({ slug }, index) =>
            slug === result.data.info.vote && setProject(index + 1)
        );
        setIsConfirming(false);
        console.log(project);
      } else {
        setIsConfirming(false);
      }
    } else if (result.data && result.data.Message === "SUCCESS") {
      setIsConfirming(false);
    } else {
      setConfirmationError(true);
      setIsConfirming(false);
    }
  }

  function startCountdown() {
    const startTime = new Date().getTime();
    const maxTime = redirectTimer * 1000;
    const countdown = setInterval(() => {
      const currentTime = new Date().getTime();
      const timediff = currentTime - startTime;
      if (timediff > maxTime) {
        setRedirectTimer("0");
        navigate("/");
        clearInterval(countdown);
      } else {
        setRedirectTimer(String(Math.round((maxTime - timediff) / 1000)));
      }
    }, 1000);
  }

  async function handleVoteClicked() {
    if (votingLoading) {
      return;
    }
    if (!project) {
      // TODO: send some kind of error message that no project has been selected
    } else {
      setVotingLoading(true);
      console.log(projects[project - 1]);
      const votingResult = await sendVote(subscriberId, projects[project - 1]);
      if (votingResult) {
        console.log(votingResult);
        setVoted(true);
      }
      // TODO: handle failed api call
      // if(success){
      //     () => setVotingLoading(false)
      // }else{
      //     setVotingError(error)
      // }
      setVotingLoading(false);
    }
  }
  function shareVote() {
    // TODO: find out how to do the native sharing better
    // navigator.share didn't work on desktop, mobile safari/ecosia/chrome
    if (navigator.share) {
      navigator
        .share({
          // Title that occurs over
          // web share dialog
          title: "ClimaWorld Title",

          // URL to share
          url: "https://climaworld.app/shareyourvote",
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch((err) => {
          // Handle errors, if occured
          console.log("Error while using Web share API:");
          console.log(err);
        });
    } else {
      // Alerts user if API not available
      // alert("Browser doesn't support this API !");

      // the newly created image will be put here
      const attachy = document.getElementById("gohere");
      // this is the source for the to be created image (in svg)
      const tobeconverted = document.getElementById("cw-share-img").outerHTML;

      // set up a canvas to paint on
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.height = canvas.width = 2500;

      // create a temp img to convert the svg to
      const tempImg = document.createElement("img");
      tempImg.addEventListener("load", onTempImageLoad);
      tempImg.src = "data:image/svg+xml," + encodeURIComponent(tobeconverted);

      // create another img where the finished img will go
      const targetImg = document.createElement("img");
      attachy.appendChild(targetImg);

      // the temp img has to be loaded to paint it on the canvas
      function onTempImageLoad(e) {
        ctx.drawImage(e.target, 0, 0);
        targetImg.src = canvas.toDataURL();
      }

      // create temporary link
      var tmpLink = document.createElement("a");
      tmpLink.download = "climaworld-vote.png"; // set the name of the download file

      // wait a bit for the image to load before automatically clicking the button to download it
      // TODO: find a better solution, timeout to wait for a loading is by chance
      setTimeout(() => {
        tmpLink.href = canvas.toDataURL();
        document.body.appendChild(tmpLink);
        tmpLink.click();
        document.body.removeChild(tmpLink);
      }, 1000);
      // temporarily add link to body and initiate the download
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const subscrId = params.get("id");
    setSubscriberId(subscrId);
    const confirmationCode = params.get("confirmationcode");
    console.log(subscrId);
    console.log(confirmationCode);
    //  redirect to homepage if the link doesn't contain the required params
    if (subscrId && confirmationCode) {
      setParamsExist(true);
      sendConfirmation(subscrId, confirmationCode);
    } else {
      startCountdown();
    }
  }, []);

  // this is the image in svg/xhtml to be downloaded on sharing
  const ShareImg = ({ proj, typ, styles }) => {
    const share = typ === "cw-share-img";
    const downFactor = share ? 1 : 8;
    console.log(typ);
    return (
      <svg
        id={String(typ)}
        xmlns="http://www.w3.org/2000/svg"
        height={`${2500 / downFactor}px`}
        width={`${2500 / downFactor}px`}
        style={styles}
      >
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            <div>
              <div
                style={{
                  backgroundColor: proj.color,
                  color: "white",
                  position: "relative",
                  textAlign: "center",
                  borderRadius: 48 / downFactor + "px",
                  padding: 24 / downFactor + "px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {proj.icon}
                <div
                  style={{
                    fontWeight: "300",
                    fontSize: 256 / downFactor + "px",
                    lineHeight: 240 / downFactor + "px",
                    position: "absolute",
                    bottom: 130 / downFactor + "px",
                    left: "0",
                    right: "0",
                  }}
                >
                  {proj.title}
                </div>
              </div>
            </div>
          </div>
        </foreignObject>
      </svg>
    );
  };

  return paramsExist ? (
    isConfirming ? (
      <PhoneContainer>
        <div className="mt-5 mb-5">Confirming your email.</div>
        <Image className="loading-earth" height={40} src={earth} />
      </PhoneContainer>
    ) : confirmationError ? (
      <PhoneContainer>
        <div className="mt-5 text-center">
          There was an error while confirming your email.<br></br>We will sort
          it out in no time.<br></br>
          <br></br>Please contact us at<br></br>
          <a href="mailto:support@climaworld.app" style={{ color: "inherit" }}>
            support@climaworld.app
          </a>
        </div>
      </PhoneContainer>
    ) : votingLoading ? (
      <PhoneContainer>
        <div className="mt-5 mb-5">Sending your vote.</div>
        <Image className="loading-earth" height={40} src={earth} />
      </PhoneContainer>
    ) : voted ? (
      <PhoneContainer>
        <div className="fs-1 mt-5 fw-bold text-center">You voted!</div>
        <div className="mt-3 mb-5 fs-4 text-center">
          Share it with your fellas
        </div>

        <div
          style={{
            //   flex: "1",
            //   flexGrow: "1",
            textDecoration: "none",
            color: "inherit",
            //   position: "relative",
          }}
        >
          <ShareImg proj={projects[project - 1]} typ="cw-share-preview" />
        </div>
        <div id="gohere" style={{ display: "none" }}></div>
        <div style={{ display: "none" }}>
          <ShareImg proj={projects[project - 1]} typ="cw-share-img" />
        </div>
        <div
          className="shadow rounded-pill my-5 py-3 px-5 fs-4 wl-card"
          onClick={shareVote}
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-primary-inverted)",
            cursor: "pointer",
          }}
        >
          Share your vote
        </div>
      </PhoneContainer>
    ) : (
      //   <PhoneContainer>
      <div className="d-flex flex-column align-items-center justify-content-center p-2">
        <div className="fs-1 mt-5 fw-bold text-center">Your Vote!</div>
        <div className="mt-3 mb-5 fs-4 text-center">
          What shall the next prize draw fund?
        </div>
        <div
          className="mb-5 d-flex gap-3 w-100 flex-wrap justify-content-center"
          style={{ maxWidth: "96q0px" }}
        >
          {projects.map((item, index) => (
            <div
              onClick={() => setShowModal(index + 1)}
              style={{
                //   flex: "1",
                //   flexGrow: "1",
                textDecoration: "none",
                color: "inherit",
                //   position: "relative",
              }}
              key={index}
            >
              <div
                className=" p-4 rounded wl-card text-center"
                style={{
                  cursor: "pointer",
                  backgroundColor: item.color,
                  color: "white",
                  minWidth: "180px",
                  maxWidth: "320px",
                  position: "relative",
                }}
              >
                {project - 1 === index && (
                  <CheckIcon
                    className="me-2 mt-2"
                    height={45}
                    fill="var(--color-success)"
                    style={{ position: "absolute", right: "0", top: "0" }}
                  />
                )}
                {item.icon}
                <div className="fw-bold">{item.title}</div>
                {/* <div>{item.text}</div> */}
              </div>
            </div>
          ))}

          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <div
              className="p-3 d-flex flex-column"
              style={{
                backgroundColor: "white",
                borderRadius: "var(--bs-modal-border-radius)",
                position: "relative",
              }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ position: "relative" }}
              >
                <BackIcon
                  height={24}
                  style={{ position: "absolute", left: "0", cursor: "pointer" }}
                  onClick={() => setShowModal(false)}
                />
                <span className="fs-1 text-center">
                  {showModal && projects[showModal - 1].title}
                </span>
                {/* <div className="d-flex align-items-center justify-content-center p-1" style={{backgroundColor: showModal && projects[showModal-1].color, border: showModal && "1px solid " + projects[showModal-1].color, height: "45px", borderRadius: "50%", position: "absolute", right: "0"}}>{showModal && projects[showModal-1].icon}</div> */}
              </div>
              <div
                className="d-flex align-items-center justify-content-center p-1 mt-3"
                style={{
                  backgroundColor: showModal && projects[showModal - 1].color,
                  border:
                    showModal && "1px solid " + projects[showModal - 1].color,
                  height: "45px",
                  width: "45px",
                  borderRadius: "50%",
                  alignSelf: "center",
                }}
              >
                {showModal && projects[showModal - 1].icon}
              </div>
              <div className="p-3 mb-3 text-center">
                {showModal && projects[showModal - 1].description}
              </div>
              <div className="d-flex gap-3 align-items-center justify-content-center">
                {showModal &&
                  (project === showModal ? (
                    <div className="d-flex align-items-center gap-3">
                      Project selected!
                      <CheckIcon height={28} fill="var(--color-success)" />
                    </div>
                  ) : (
                    <div
                      className="p-2 rounded vote-modal-button"
                      style={{ border: "1px solid black", cursor: "pointer" }}
                      onClick={() => {
                        setProject(showModal);
                        setShowModal(false);
                      }}
                    >
                      Select this project
                    </div>
                  ))}

                {/* <span style={{display: "inline-block", borderRadius: "50%", backgroundColor: "whitesmoke", height: "45px", width: "45px"}}></span> */}
              </div>
            </div>
          </Modal>
          <div
            className="rounded-circle shadow text-center fs-3 p-4 vote-button"
            style={{
              position: "fixed",
              bottom: "1rem",
              backgroundColor: "white",
              cursor: "pointer",
            }}
            onClick={handleVoteClicked}
          >
            Vote
          </div>
        </div>
      </div>
    )
  ) : (
    <PhoneContainer>
      <div className="mt-5 text-center">
        This Link is not valid. You will be redirected to the{" "}
        <a href="https://climaworld.app/">Homepage</a> in {redirectTimer}..
      </div>
    </PhoneContainer>
  );
}
