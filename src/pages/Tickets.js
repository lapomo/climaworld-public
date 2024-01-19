import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Alert,
  Image,
  ButtonGroup,
  ToggleButton,
  Carousel,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { landscapeCartoon, trophy } from "../assets/img";
import random from "../assets/img/logos/random.png";
import ChipNavigation from "../components/.archive/ChipNavigation";
import CTAButton from "../components/CTAButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PhoneContainer from "../components/PhoneContainer";

import { useApi } from "../contexts/ApiContext";

/* 

  Tickets Page: show free and paid tickets and option to get more

 */
export default function Tickets() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [ticketToggle, setTicketToggle] = useState(true);
  // const [freeTicket, setFreeTicket] = useState();
  // const [tickets, setTickets] = useState([]);

  const { user, stats, countrySupported } = useApi();

  const toggleRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    // console.log(stats.curr_draw_date);
    setLoading(false);
  }, []);

  function toggleTicket(toggleV) {
    if (toggleV != ticketToggle) {
      setTicketToggle(toggleV);
    }
  }

  async function cta_click() {
    navigate("/get-tickets");
  }

  return (
    <>
      <PhoneContainer>
        <Header />
        <ChipNavigation setSelected={"Rewards"} />
        {error && <Alert variant="danger">{error}</Alert>}

        <div className="w-100 mt-4" style={styles.cartoonContainer}>
          {!countrySupported ? ( 
            <div className="px-4 text-center">
              <p>
                Your country is not supported yet. We are working on supporting
                as many countries as possible as fast as we can. Contact us for
                any questions or if you can help with that process. In the
                meanwhile you can still plant trees by donating without getting
                tickets to the prize draws.
              </p>
            </div>
          ) : ticketToggle ? (
            <div className="p-1">
              <Image
                className="w-100"
                style={styles.cartoon}
                src={landscapeCartoon}
              />
              <div style={styles.dataContainer}>
                <div>
                  <Card className="text-center mb-3" style={styles.dataCard}>
                    <Card.Header style={styles.dataHeader}>
                      £100 Prize Draw Ticket
                    </Card.Header>
                    <Card.Body style={styles.dataBody}>
                      <span>1x entry to prize draw</span>
                      <span>Friday September 9th 5pm</span>
                      <span>Winner chosen at random</span>
                      <span>Terms and conditions apply</span>
                    </Card.Body>
                  </Card>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <Card
                      className="border-0"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <Card.Header
                        className="border-0"
                        style={{
                          fontSize: "8px",
                          fontWeight: "bold",
                          backgroundColor: "transparent",
                        }}
                      >
                        Prize Draw Partner:
                      </Card.Header>
                      <Card.Body
                        className="rounded-pill"
                        style={{ backgroundColor: "#fff" }}
                      >
                        <img width={70} src={random} />
                      </Card.Body>
                    </Card>
                    <Card
                      className="border-0"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <Card.Header
                        className="border-0"
                        style={{
                          fontSize: "8px",
                          fontWeight: "bold",
                          backgroundColor: "transparent",
                        }}
                      >
                        Ticket Number:
                      </Card.Header>
                      <Card.Body
                        className="rounded-pill"
                        style={{ backgroundColor: "#fff" }}
                      >
                        <div className="text-center fw-bold">
                          {
                            user.tickets[stats.curr_draw_date.cwValue].freeT
                              .ticketNo
                          }
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          ) : user.tickets[stats.curr_draw_date.cwValue].paidT.length === 0 ? (
            <div className="w-100 text-center px-5">
              <Image height="80" src={trophy} />
              <p className="fw-bold fs-6 mt-4">You have no paid tickets yet!</p>
              <p>You can get them by clicking the button below.</p>
            </div>
          ) : (
            <Carousel>
              {user.tickets[stats.curr_draw_date.cwValue].paidT.map(
                ({ ticketNo }) => {
                  // TODO: give every Carousel.Item a unique key prop (index)
                  return (
                    <Carousel.Item className="p-1">
                      <>
                        <Image
                          className="w-100"
                          style={styles.cartoon}
                          src={landscapeCartoon}
                        />
                        <div style={styles.dataContainer}>
                          <div>
                            <Card
                              className="text-center mb-3"
                              style={styles.dataCard}
                            >
                              <Card.Header style={styles.dataHeader}>
                                £100 Prize Draw Ticket
                              </Card.Header>
                              <Card.Body style={styles.dataBody}>
                                <span>1x entry to prize draw</span>
                                <span>Friday September 9th 5pm</span>
                                <span>Winner chosen at random</span>
                                <span>Terms and conditions apply</span>
                              </Card.Body>
                            </Card>
                            <div style={{ display: "flex", gap: "1rem" }}>
                              <Card
                                className="border-0"
                                style={{ backgroundColor: "transparent" }}
                              >
                                <Card.Header
                                  className="border-0"
                                  style={{
                                    fontSize: "8px",
                                    fontWeight: "bold",
                                    backgroundColor: "transparent",
                                  }}
                                >
                                  Prize Draw Partner:
                                </Card.Header>
                                <Card.Body
                                  className="rounded-pill"
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  <img width={70} src={random} />
                                </Card.Body>
                              </Card>
                              <Card
                                className="border-0"
                                style={{ backgroundColor: "transparent" }}
                              >
                                <Card.Header
                                  className="border-0"
                                  style={{
                                    fontSize: "8px",
                                    fontWeight: "bold",
                                    backgroundColor: "transparent",
                                  }}
                                >
                                  Ticket Number:
                                </Card.Header>
                                <Card.Body
                                  className="rounded-pill"
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  <div className="text-center fw-bold">
                                    {ticketNo}
                                  </div>
                                </Card.Body>
                              </Card>
                            </div>
                          </div>
                        </div>
                      </>
                    </Carousel.Item>
                  );
                }
              )}
            </Carousel>
          )}
        </div>

        {countrySupported && (
          <ButtonGroup className="mt-4 w-100 border rounded-pill">
            <ToggleButton
              className="rounded-pill toggle-btn p-0"
              style={ticketToggle ? styles.toggleBtnChecked : styles.toggleBtn}
              key="free"
              id="radio-personal"
              type="radio"
              variant="outline-primary"
              name="radio"
              value={true}
              checked={ticketToggle}
              onChange={(e) => toggleTicket(true)}
            >
              Free
            </ToggleButton>
            <ToggleButton
              className="rounded-pill p-0"
              style={!ticketToggle ? styles.toggleBtnChecked : styles.toggleBtn}
              ref={toggleRef}
              key="paid"
              id="radio-collective"
              type="radio"
              // variant="outline-primary"
              name="radio"
              value={false}
              checked={!ticketToggle}
              onChange={(e) => toggleTicket(false)}
            >
              Paid
            </ToggleButton>
          </ButtonGroup>
        )}

        <CTAButton
          className="mt-4"
          handle_cta_click={cta_click}
          text={
            countrySupported
              ? "Get more tickets"
              : "Donate and plant more trees"
          }
        />
        {countrySupported && (
          <Card
            className="w-75 mt-5 p-3 text-center shadow"
            style={styles.contribCard}
          >
            <span className="" style={styles.contribText}>
              Prize Draw Partner:
            </span>
            <Card.Img
              className="rounded-0"
              style={styles.contribImg}
              src={random}
            ></Card.Img>
          </Card>
        )}
        <Footer />
      </PhoneContainer>
    </>
  );
}

const styles = {
  title: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  cartoonContainer: {
    position: "relative",
  },
  cartoon: {
    borderRadius: "30px",
  },
  dataContainer: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dataCard: {
    minWidth: "200px",
    color: "#35424a",
    background: "transparent",
    border: "none",
  },
  dataHeader: {
    border: "none",
    borderRadius: "12px 12px 0 0",
    background: "#fff",
    fontWeight: "bold",
  },
  dataBody: {
    display: "flex",
    flexDirection: "column",
    fontSize: "11px",
    borderRadius: "0 0 20px 20px",
    background: "#ffffffad",
  },
  datacontribImg: {
    maxWidth: "100px",
  },
  toggleBtnChecked: {
    backgroundColor: "#2381a1",
    color: "#fff",
  },
  toggleBtn: {
    border: "none",
    backgroundColor: "transparent",
    color: "#2381a1",
  },
  contribCard: {
    borderRadius: "30px",
  },
  contribText: {
    color: "#00000070",
  },
  contribImg: {
    maxWidth: "120px",
    alignSelf: "center",
    marginTop: "0.6rem",
  },
};
