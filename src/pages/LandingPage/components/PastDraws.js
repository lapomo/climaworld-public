import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Chameleon } from "../../../assets/img";
import company from "../../../assets/text/company";
import LoadingEarth from "../../../components/LoadingEarth";
import { useApi } from "../../../contexts/ApiContext";
import AppContainer from "../../App/components/AppContainer";
import {
  christmasdraw_video,
  januarydraw_video,
  newyeardraw_video,
} from "../assets";

export default function PastDraws() {
  const [loading, setLoading] = useState(true);
  const [hasTag, setHasTag] = useState(false);
  const [drawParams, setDrawParams] = useState();
  const [drawClosed, setDrawClosed] = useState(false)
  const [drawFinished, setDrawFinished] = useState(false);

  const { draws } = useApi();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("tag") && draws) {
      setHasTag(true);
      const draw = draws.find(
        (item) => item.draw_tag === searchParams.get("tag")
      );
      new Date(draw.date_closing).getTime() <= new Date().getTime() && setDrawClosed(true)
      draw ? setDrawParams(draw) : setHasTag(false);
      !draw?.draw_result.find((item) => item.winner_id === "") &&
        setDrawFinished(true);
      setLoading(false);
    } else if (!searchParams.has("tag") && draws) {
      setHasTag(false);
      setLoading(false);
    }
  }, [draws]);

  return (
    <>
      <AppContainer>
        {drawParams && !loading && drawClosed && drawFinished ? (
          <div className="py-5" >
            <h3 className="pb-3 fw-bold text-center">
              {drawParams?.draw_name}
            </h3>
            {["christmas-2022", "new-year-22-23", "january-2023"].includes(
              drawParams.draw_tag
            ) && (
              <div className="pb-5">
                <div className="pt-5 px-3 d-flex justify-content-center">
                  <video
                    className="rounded cwshadow"
                    muted
                    controls
                    loop
                    //   poster={heroshortPreview}
                    style={{ maxWidth: "100%", width: "600px" }}
                  >
                    <source
                      src={
                        drawParams.draw_tag === "christmas-2022"
                          ? christmasdraw_video
                          : drawParams.draw_tag === "new-year-22-23"
                          ? newyeardraw_video
                          : drawParams.draw_tag === "january-2023"
                          ? januarydraw_video
                          : undefined
                      }
                      type="video/mp4"
                    ></source>
                  </video>
                </div>
              </div>
            )}
            {/* {drawParams.assets?.random_draw_link && (
              <a className="p-3 py-3 d-flex justify-content-center" style={{textDecoration: "none"}} href={drawParams.assets.random_draw_link} target="_blank">
              <div
                className="p-3 rounded border w-100 d-flex gap-3 align-items-center"
                style={{ color: "white", flexBasis: "content" }}
              >
                <div
                  className="d-flex justify-content-center align-items-center"
                  // style={{
                  //   backgroundColor: "black",
                  //   borderRadius: "50%",
                  //   width: "54px",
                  //   height: "54px",
                  // }}
                >
                  <ArrowNorthEast height="24" fill="white" />
                </div>
                <div className="fs-5">
                  Record of the draw on Random.org
                </div>
              </div>
              </a>
            )} */}
            {drawParams.draw_result.map((item, index) => {
                return (
                  <div key={index} className="p-3 d-flex flex-column align-items-center">
                    <h5 className="text-center py-3">{item.title}</h5>
                    <div
                      className="p-3 rounded border w-100 d-flex gap-3 align-items-center"
                      style={{ maxWidth: "320px", backgroundColor: "white" }}
                    >
                      <div
                        className="p-3 fw-bold d-flex justify-content-center align-items-center"
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          borderRadius: "50%",
                          width: "54px",
                          height: "54px",
                        }}
                      >
                        {item.winner_number}
                      </div>
                      <div className="fs-5" style={{ color: "black" }}>
                        {item.winner_name}
                        <br></br>
                        {item.prize}
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        ) : !loading && !hasTag ? (
          <div className="py-5 d-flex flex-column justify-content-center align-items-center">
            <Chameleon height={120} />
            <div className="p-3 pt-5 text-center" >
              Nothing to see here. Check your link and contact us if you think
              there should be some more content here.
            </div>
          </div>
        ) : !loading && hasTag && drawClosed && !drawFinished ? (
          <div className="py-5 d-flex flex-column justify-content-center align-items-center">
            <Chameleon height={120} />
            <div className="p-3 pt-5 text-center" >
              The entries for this draw are closed but the winners have not been
              drawn yet. The draw will happen in no more than 7 days after the
              entries closed.<br></br>
              <br></br><a href={company.links.instagram} target="_blank" style={{color: "inherit"}}> Check out our instagram, the draw will happen there live!</a>
            </div>
          </div>
        ) : !loading && hasTag && !drawClosed ? <div className="py-5 d-flex flex-column justify-content-center align-items-center">
        <Chameleon height={120} />
        <div className="p-3 pt-5 text-center" >
          The entries for this draw are still open and the winners have not been
          drawn yet.<br></br>Be sure to enter the draw if you haven't done so yet!<br></br>
          <br></br>And you should check out our instagram, the draw will happen there live!
        </div>
      </div> : (
          <div className="py-5 my-5">
            <LoadingEarth />
          </div>
        )}
      </AppContainer>
    </>
  );
}
