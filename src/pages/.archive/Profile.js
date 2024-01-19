import React, { useEffect, useRef, useState } from "react";
import { Alert, ButtonGroup, Card, Image, ToggleButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import ChipNavigation from "../../components/ChipNavigation";
import CTAButton from "../../components/CTAButton";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PhoneContainer from "../../components/PhoneContainer";
import { useApi } from "../../contexts/ApiContext";
import forestCartoon from "../../assets/img/forest.png";
import edenprojectsLogo from "../../assets/img/logos/edenprojects.svg";

/* 

  Dashboard/Profile Page: display impact, cta

 */
export default function Profile() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [impactToggle, setImpactToggle] = useState(true);

  const { user, stats } = useApi();
  const toggleRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, [user]);

  function toggleImpact(toggleV) {
    if (toggleV != impactToggle) {
      setImpactToggle(toggleV);
      console.log(toggleV);
    }
  }

  async function cta_click() {
    navigate("/get-tickets");
  }

  return (
    <>
      <PhoneContainer>
        <Header />
        <ChipNavigation setSelected={"Impact"} />
        {error && <Alert variant="danger">{error}</Alert>}

        <div className="w-100 mt-4" style={styles.cartoonContainer}>
          <Image className="w-100" style={styles.cartoon} src={forestCartoon} />
          <div style={styles.dataContainer}>
            {loading ? (
              "loading.."
            ) : (
              <Card className="text-center" style={styles.dataCard}>
                <Card.Header style={styles.dataHeader}>
                  {impactToggle ? user.userdata.prefUsername : "Climaworld"}'s
                  Forest
                </Card.Header>
                <Card.Body style={styles.dataBody}>
                  <span>
                    {impactToggle
                      ? user.userdata.trees
                      : stats.cwCommunityTrees.cwValue}{" "}
                    Trees planted
                  </span>
                  <span>
                    {impactToggle
                      ? user.userdata.co2
                      : stats.cwCommunityCO2.cwValue}{" "}
                    t CO2 captured
                  </span>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>

        <ButtonGroup className="mt-4 w-100 border rounded-pill">
          <ToggleButton
            className="rounded-pill toggle-btn p-0"
            style={impactToggle ? styles.toggleBtnChecked : styles.toggleBtn}
            key="personal"
            id="radio-personal"
            type="radio"
            variant="outline-primary"
            name="radio"
            value={true}
            checked={impactToggle}
            onChange={(e) => toggleImpact(true)}
          >
            Personal
          </ToggleButton>
          <ToggleButton
            className="rounded-pill p-0"
            style={!impactToggle ? styles.toggleBtnChecked : styles.toggleBtn}
            ref={toggleRef}
            key="collective"
            id="radio-collective"
            type="radio"
            // variant="outline-primary"
            name="radio"
            value={false}
            checked={!impactToggle}
            onChange={(e) => toggleImpact(false)}
          >
            Climaworld
          </ToggleButton>
        </ButtonGroup>

        <CTAButton
          className="mt-4"
          handle_cta_click={cta_click}
          text={"Plant more trees"}
        />

        <Card
          className="w-75 mt-5 p-3 text-center shadow"
          style={styles.contribCard}
        >
          <span className="" style={styles.contribText}>
            Trees planted by:
          </span>
          <Card.Img style={styles.contribImg} src={edenprojectsLogo}></Card.Img>
        </Card>
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
  },
  dataBody: {
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    borderRadius: "0 0 20px 20px",
    background: "#ffffffad",
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
