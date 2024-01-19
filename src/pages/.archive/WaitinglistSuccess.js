import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useApi } from "../../contexts/ApiContext";
import PhoneContainer from "../../components/PhoneContainer";
import {
  checkIcon,
  discordEarthLogo,
  earth,
  heartIcon,
  monkey,
} from "../../assets/img";

import "./WaitingListSuccess.css";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/* 

  Waitinglist Success Page: show user options on what to do next

  TODO: remove as we move on with voting
 */
export default function WaitinglistSuccess() {
  const [paramsExist, setParamsExist] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmationError, setConfirmationError] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [subscriberId, setSubscriberId] = useState(false);
  const [betaRequested, setBetaRequested] = useState(false);
  const [betaRequestedError, setBetaRequestedError] = useState(false);
  const [message, setMessage] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(6);
  const [betaRequesting, setBetaRequesting] = useState(false)
  const [discordRequesting, setDiscordRequesting] = useState(false)

  const { confirmSubscription, requestBeta } = useApi();
  const navigate = useNavigate();

  async function sendConfirmation(id, code) {
    // TODO build already confirmed feature
    setIsConfirming(true);
    const result = await confirmSubscription(id, code);
    console.log(result);
    if (result.data && result.data.Message === "SUCCESS") {
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const subscrId = params.get("id");
    setSubscriberId(subscrId);
    const confirmationCode = params.get("confirmationcode");
    console.log(subscrId);
    console.log(confirmationCode);
    if(subscrId && confirmationCode){
        setParamsExist(true)
        sendConfirmation(subscrId, confirmationCode)
    }else{
        startCountdown()
    }
  }, []);

  return paramsExist ? (
    isConfirming ? (
      <PhoneContainer>
        <div className="mt-5 mb-5">Confirming your email...</div>
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
    ) : (
      <PhoneContainer>
        <div className="mt-5 fs-1">You are on the waiting list!</div>
        <div className="my-5 d-flex flex-column gap-3 w-100">
          {[
            {
              title: betaRequested ? ( betaRequestedError ? "Oh no!" : "Your request has been submitted!") : "Beta user",
              icon: betaRequested && !betaRequestedError ? checkIcon : monkey,
              text: betaRequested ? ( betaRequestedError ? (<div>There was an error submitting your request. Please contact us at <a href="mailto:support@climaworld.app">support@climaworld.app</a></div>) : (<div>We will get in touch with further information on how to proceed as a beta user.</div>)) : (
                <div>
                  Be part of the development of our app!<br></br>We would love
                  to hear your opinion on it.
                </div>
              ),
              onclick: async () => {
                if(!betaRequesting){
                    setBetaRequesting(true)
                    if(subscriberId && !betaRequested){
                        await requestBeta(subscriberId).then((result) => {
                            console.log(String(result));
                            if(result.status === "success" && result.data.status === "success"){
                                setBetaRequested(true)
                            }else{
                                setBetaRequestedError(true)
                            }
                        }).catch((err) => {
                            console.log(String(err))
                            setBetaRequestedError(true)
                        })
                    }else{
                        window.open("mailto:betauser@climaworld.app", "_self");
                    }
                    setTimeout(() => setBetaRequesting(false), 5000)
                }
              },
            },
            {
              title: "ClimaWorld Community",
              icon: discordEarthLogo,
              text: "Join our community on discord.",
              onclick: () => {
                if(!discordRequesting){
                    setDiscordRequesting(true)
                    window.open("https://discord.gg/yXU5E5UzdK", "_blank")
                    setTimeout(() => setDiscordRequesting(false), 2000)
                } 
              }
            },
            {
              title: "Invitation Link",
              icon: linkCopied ? checkIcon : heartIcon,
              text: (
                <div>
                  Share the love and invite everybody.{message}
                  <br></br>
                  {linkCopied
                    ? "Link copied."
                    : "Copy the link: https://climaworld.app/"}
                </div>
              ),
              onclick: () => {
                navigator.clipboard
                  .writeText("https://climaworld.app/")
                  .then(() => {
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 10000);
                  });
              },
              //   onclick: () => {
              //     try{
              //     navigator
              //       .share({
              //         title: "ClimaWorld",
              //         text: "Join the CLimaWorld Waitinglist",
              //         url: "https://climaworld.app/",
              //       })
              //       .then((d) => {setLinkCopied(true); setMessage(d)})
              //       .catch((e) => {console.log(e);setMessage(e)});
              //     }catch(error){
              //         console.log(error)
              //         setMessage(String(error))
              //     }
              //   },
            },
          ].map((item, index) => (
            <div
              onClick={item.onclick && item.onclick}
              style={{ textDecoration: "none", color: "inherit" }}
              key={index}
            >
              <div className="d-flex align-items-center gap-4 shadow p-4 rounded wl-card" style={{cursor: "pointer"}}>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "85px", width: "20%" }}
                >
                  <Image
                    className=""
                    height={index == 1 ? "50%" : "75%"}
                    src={item.icon}
                  />
                </div>
                <div style={{ width: "80%" }}>
                  <div className="fw-bold">{item.title}</div>
                  <div>{item.text}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PhoneContainer>
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
