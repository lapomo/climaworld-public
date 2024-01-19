import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { drawbg_christmas } from "../../../assets/img";
import DrawCountdown from "../../../components/DrawCountdown";
import { useApi } from "../../../contexts/ApiContext";
import { useAppContext } from "../../../contexts/AppContext";
import AppContainer from "../components/AppContainer";

import "./Draw.css";

const prizedraw = "2023-01-01T14:00:00Z";

export default function Draw() {
  const [drawParams, setDrawParams] = useState();
  const [prizeDrawParticipants, setPrizeDrawParticipants] = useState();
  const [onCooldownList, setOnCooldownList] = useState()
  const [actionMessage, setActionMessage] = useState(
    "Copy # List for random.org"
  );
  const [closeEntryMsg, setCloseEntryMsg] = useState();
  const [drawing, setDrawing] = useState(false);
  const { isAdmin, sendAdminAction, draws, user, getCurrencyConversion } = useApi();
  const app = useAppContext()
  const navigate = useNavigate();

  useEffect(() => {
    // build security, only for admins
    if (!isAdmin) {
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("tag") && draws) {
      const drawTag = urlParams.get("tag");
      const draw = draws.find((item) => item.draw_tag === drawTag);
      if (!draw) {
        return;
      }
      setDrawParams(draw);
      !draw.draw_result.find((item) => !item.winner_id) &&
        setCloseEntryMsg("done");
    }
  }, [isAdmin, draws]);

  useEffect(() => {
    if (drawParams) {
      const startRuleDate = new Date("2023-03-12T15:00:00.000Z");
      const drawDate = new Date(drawParams.date_closing);
      const newRuleApplies = drawDate > startRuleDate;
      let lookIntoTheseDraws;

      if (newRuleApplies) {
        const isDaily = [1, 2, 3, 4, 5].includes(drawDate.getUTCDay());
        const oneDay = (24 * 60 * 60 * 1000)
        // 5 weekdays before = 5 dailys before = 7 days
        const oneWeekBefore = new Date(drawDate)
        oneWeekBefore.setDate(drawDate.getDate() -7)
        oneWeekBefore.setHours(0)
        // 2 sundays before = 2 weeklys before = 14 days
        const twoWeeksBefore = new Date(drawDate)
        twoWeeksBefore.setDate(drawDate.getDate() -14)
        twoWeeksBefore.setHours(0)
        lookIntoTheseDraws = draws.filter((draw) => {
          const dDate = new Date(draw.date_closing);
          // don't compare to future draws bc they won't have winners
          if (dDate >= drawDate || dDate < startRuleDate) {
            return false;
          }
          const isWeekDay = [1, 2, 3, 4, 5].includes(dDate.getUTCDay());
          if(isWeekDay){

          }
          // const isSameWeek =
          //   dDate.getDate() - dDate.getUTCDay() ===
          //   drawDate.getDate() - drawDate.getUTCDay();
          // // 4 weeks = 28 days in Milliseconds
          // const fourWeeks = 28 * (24 * 60 * 60 * 1000);
          // const isWithin4Weeks =
          //   drawDate.getTime() - dDate.getTime() < fourWeeks;
          // const sameWeekBeginning =  (dDate.get - day2
          console.log("dDate: " + dDate)
          console.log("isdaily: "+ isDaily + " isweekday: "+isWeekDay+" oneWeekBefore"+oneWeekBefore+" twoWeeksBefore"+twoWeeksBefore)
          if (isDaily && ((isWeekDay && dDate > oneWeekBefore) || (!isWeekDay && dDate > oneWeekBefore))) {
            return true;
          } else if (!isDaily && !isWeekDay && dDate > twoWeeksBefore) {
            return true;
          } else {
            return false;
          }
        });
        const logString = lookIntoTheseDraws.map((item) => item.draw_tag);
        console.log(JSON.stringify(logString));
      }

      sendAdminAction("getAllSignedUp").then((result) => {
        console.log(JSON.stringify(result));
        if (result.status === "success" && result.response?.success) {
          const tempList = [];
          const cooldownTempList = [];
          result.response.body?.map((entry) => {
            if (entry.tickets[drawParams.draw_id] && !entry.meta.notEligible) {
              // anonymize Info if anonym field is ticked
              if (entry.userdata.anonymize) {
                const nameparts =  entry.userdata.name.split(" ")
                console.log(nameparts)
                const firstNames = nameparts
                .slice(0, nameparts.length - 1)
                .reduce((fnames, fname) => fnames + " " + fname, "");
                entry.userdata.name = firstNames + " " + nameparts.slice(-1)[0].charAt(0) + ".";
                // entry.userdata.country = "World";
              }
              // if there is winners already, don't add them to the list
              if (
                !drawParams.draw_result.find(
                  (item) => item.winner_id === entry.id
                )
              ) {
                if (newRuleApplies) {
                  // don't add to daily draws if won a daily this week already
                  // don't add to weekly draw if won a weekly this month already
                  const foundWin = lookIntoTheseDraws.find((draw) => {
                    return draw.draw_result.find(
                      (result) => result.winner_id === entry.id
                    );
                  });
                  if(foundWin){
                    cooldownTempList.push(entry)
                  } else {
                    tempList.push(entry);
                  }
                } else {
                  tempList.push(entry);
                }
              }
            }
          });

          tempList.sort((a, b) => {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          });
          setPrizeDrawParticipants(tempList);
          setOnCooldownList(cooldownTempList)
        }
        //   console.log(result);
      });
    }
  }, [drawParams]);

  function setWinner(winner) {
    const tempParams = drawParams;
    tempParams.draw_result[drawing].winner_name = winner.userdata.name;
    tempParams.draw_result[drawing].winner_number =
      winner.tickets[drawParams.draw_id];
    tempParams.draw_result[drawing].winner_id = winner.id;
    tempParams.draw_result[drawing].winner_country = winner.userdata.country;

    console.log(JSON.stringify(tempParams));
    setDrawParams(tempParams);
    // setDrawing(false)
    // return
    // // setWinners([...winners, {prize: drawing, user: winner}])
    // // eval("setWinner" + drawing + "(" + winner + ")");
    // switch (drawing) {
    //   case "1":
    //     setWinner1(winner);
    //     break;
    //   case "2":
    //     setWinner2(winner);
    //     break;
    //   case "3":
    //     setWinner3(winner);
    //     break;
    // }

    // const templist = [].slice();
    setPrizeDrawParticipants(
      prizeDrawParticipants.filter(
        (item) => JSON.stringify(item) !== JSON.stringify(winner)
      )
    );
    setDrawing(false);
  }

  async function upload() {
    setCloseEntryMsg("loading");
    const attributes = {};
    const conversionRate = await getCurrencyConversion().then(conversion => conversion.response);
    drawParams.draw_result.map(async (item) => {
      const winner_currency = app.getCurrencyFromCountry(item.winner_country);
      const updateString =
        "cwValue[" + drawParams.index + "].draw_result[" + item.index + "]";
      attributes[updateString + ".winner_id"] = item.winner_id;
      attributes[updateString + ".winner_name"] = item.winner_name;
      attributes[updateString + ".winner_number"] = item.winner_number;
      attributes[updateString + ".prize_amount_converted"] = item.prize_amount * (winner_currency === "USD" ? 1 : conversionRate.exchange_rates[winner_currency])
      attributes[updateString + ".prize_currency_converted"] = winner_currency;
    });

    console.log(JSON.stringify(attributes));
    await sendAdminAction("uploadDraw", attributes);
    setCloseEntryMsg("done");
  }

  return !isAdmin || !drawParams ? (
    <AppContainer>
      <div
        className="d-flex flex-column flex-wrap gap-3 p-3 align-items-center align-items-md-start"
        style={{ minHeight: "100vh" }}
      >
        <div className="pt-5">
          We are sorry, you are not authorized to use this page. It would be
          great if you could tell us how you ended up here via the chat!
        </div>
        <Button
          className="border"
          style={{ maxWidth: "250px" }}
          variant="dark"
          onClick={() => navigate("/home")}
        >
          Go Back to the App
        </Button>
      </div>
    </AppContainer>
  ) : (
    drawParams && (
      <AppContainer>
        <div className="px-3 pt-md-3 pt-5 justify-content-md-start justify-content-center fs-1 d-flex flex-wrap align-items-center">
          <div>{drawParams.draw_name}</div>
          {/* <DrawCountdown className="cwshadow" special="2" /> */}
        </div>

        <div className="px-3 pt-3 pt-md-3 fs-5 text-center text-md-start">
          Prizes
        </div>
        <div className="p-3 d-flex flex-column gap-3">
          {drawParams.draw_result.map((item, index) => {
            return (
              <div className="d-flex align-items-center gap-3 fs-5 ">
                <div
                  className="fw-bold"
                  style={{ width: "100%", maxWidth: "150px" }}
                >
                  {item.prize} Prize:
                </div>
                {item.winner_name ? (
                  <div className="d-flex">
                    <div
                      className="fw-bold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {item.winner_name}
                    </div>
                    {/* <div className="ps-3">{winner1.userdata.country}</div> */}
                    <div className="ps-3">(#{item.winner_number})</div>
                  </div>
                ) : drawing === index ? (
                  "Click on the winner!"
                ) : (
                  <Button
                    variant="dark"
                    className="border"
                    style={{ width: "100%", maxWidth: "250px" }}
                    onClick={() => setDrawing(index)}
                  >
                    choose winner
                  </Button>
                )}
              </div>
            );
          })}
        </div>
        <div className="p-3 d-flex flex-column gap-3 ">
          <div className="fs-5">Actions</div>
          <Button
            className="border"
            variant="dark"
            style={{ width: "100%", maxWidth: "250px" }}
            onClick={() => {
              upload();
            }}
            disabled={
              closeEntryMsg ||
              drawParams.draw_result.find((item) => !item.winner_id)
            }
          >
            {closeEntryMsg === "loading" ? (
              <div className="loader" style={{ borderColor: "gold" }}></div>
            ) : closeEntryMsg ? (
              "Draw complete"
            ) : (
              "Upload draw"
            )}
          </Button>
          <div className="d-flex align-items-center gap-3">
            <Button
              className="border"
              variant="dark"
              style={{ width: "100%", maxWidth: "250px" }}
              onClick={() => {
                setActionMessage(false);
                let ticketNoList = "";
                prizeDrawParticipants.map((entry) => {
                  ticketNoList += entry.tickets[drawParams.draw_id] + "\n";
                });

                console.log(ticketNoList);
                navigator.clipboard.writeText(ticketNoList);
                setActionMessage("Copied!");
                setTimeout(
                  () => setActionMessage("Copy # List for random.org"),
                  3000
                );
              }}
            >
              {actionMessage}
            </Button>
            <div>( without winners )</div>
            {/* <div>{actionMessage}</div> */}
          </div>
        </div>
        <div className="px-3 pt-3 pt-md-3 fs-5 text-center text-md-start">
          Participants
          {/* ({prizeDrawParticipants?.length}) */}
        </div>
        <div className="p-3">
          <Table bordered hover responsive variant="dark">
            <thead>
              <tr>
                {/* <th>Date</th> */}
                <th>#</th>
                <th>Name</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {prizeDrawParticipants?.map((user) => {
                return (
                  <tr
                    // className={`${drawing && 'cw-choosewinner-hover'}`}
                    onClick={(e) => {
                      if (drawing || drawing === 0) {
                        setWinner(user);
                        // e.currentTarget.style.color = "gold";
                      }
                    }}
                    style={{
                      cursor: drawing || drawing === 0 ? "pointer" : undefined,
                      textDecoration: drawParams.draw_result?.find(
                        (draw_result) => draw_result.winner_id === user.id
                      )
                        ? "line-through"
                        : "inherit",
                    }}
                  >
                    {/* <td>{user.created_at}</td> */}
                    <td>{user.tickets[drawParams.draw_id]}</td>
                    <td>{user.userdata.name}</td>
                    <td>{user.userdata.country}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="px-3 pt-3 pt-md-3 fs-5 text-center text-md-start">
          On Cooldown
          {/* ({prizeDrawParticipants?.length}) */}
        </div>
        <div className="p-3">
          <Table bordered hover responsive variant="dark">
            <thead>
              <tr>
                {/* <th>Date</th> */}
                {/* <th>#</th> */}
                <th>Name</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {onCooldownList?.map((user) => {
                return (
                  <tr>
                    {/* <td>{user.created_at}</td> */}
                    {/* <td>-</td> */}
                    <td>{user.userdata.name}</td>
                    <td>{user.userdata.country}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </AppContainer>
    )
  );
}
