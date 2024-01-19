import React from 'react'
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { ShareIcon } from '../../../assets/img';

export default function Invite({className, text="Invite a friend"}) {
    const [copied, setCopied] = useState(false)
    
  function share() {
    // TODO: find out how to do the native sharing better
    // navigator.share didn't work on desktop, mobile safari/ecosia/chrome
    if (navigator.share) {
      navigator
            .share({
              // Title that occurs over
              // web share dialog
              title: "Invite your friends to ClimaWorld!",
              text: "Join me in ClimaWorld and get the chance to win prizes while funding climate projects! 🤯",
              // URL to share
              url: "https://climaworld.app/",
            })
            .then(() => {
              console.log("Thanks for sharing!");
            })
            .catch((err) => {
              // Handle errors, if occured
              console.log("Error while using Web share API:");
              console.log(err);
            });
            
      // fetch(path_to_image)
      //   .then((response) => {
      //     return response.blob();
      //   })
      //   .then((blob) => {
      //     const file = new File([blob], "ClimaWorldVote.png", {
      //       type: "image/png",
      //     });
      //     navigator
      //       .share({
      //         // Title that occurs over
      //         // web share dialog
      //         title: "Invite your friends to ClimaWorld!",
      //         text: "Join me in ClimaWorld and get the chance to win prizes while funding climate projects",
      //         // URL to share
      //         url: "https://climaworld.app/",
      //         files: [file],
      //       })
      //       .then(() => {
      //         console.log("Thanks for sharing!");
      //       })
      //       .catch((err) => {
      //         // Handle errors, if occured
      //         console.log("Error while using Web share API:");
      //         console.log(err);
      //       });
      //   });
      // const shareFile = new File(votedProject.share, "vote.png", {
      //   type: "image/png",
      // });
    } else {
      console.log("navigator.share not supported")
      navigator.clipboard.writeText("Join me in ClimaWorld and get the chance to win prizes while funding climate projects! 🤯 https://climaworld.app")
      setCopied(true)
      setTimeout(() => setCopied(false), 10000)
      /*
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
      */

      // create temporary link
      // var tmpLink = document.createElement("a");
      // tmpLink.download = "climaworld-vote.png"; // set the name of the download file
      // tmpLink.href = votedProject.share;
      // document.body.appendChild(tmpLink);
      // tmpLink.click();
      // document.body.removeChild(tmpLink);
      /*
      // wait a bit for the image to load before automatically clicking the button to download it
      // TODO: find a better solution, timeout to wait for a loading is by chance
      setTimeout(() => {
        tmpLink.href = canvas.toDataURL();
        document.body.appendChild(tmpLink);
        tmpLink.click();
        document.body.removeChild(tmpLink);
      }, 1000);
      // temporarily add link to body and initiate the download
      */
    }
  }


  return (
    <Card className={`${className} p-4 fs-3 fw-bold`} style={{cursor: "pointer"}} onClick={share}>
    <div className="d-flex gap-5 justify-content-between align-items-center">
      <div className="">{copied ? "Copied!" : text}</div>
      <ShareIcon height={45} />
    </div>
  </Card>
  )
}
