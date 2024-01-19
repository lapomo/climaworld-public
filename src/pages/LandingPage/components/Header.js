import React from "react";
import { Button, Image, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { climaworldLogo, PersonIcon } from "../../../assets/img";
import { useAuth } from "../../../contexts/AuthContext";
import CountryPicker from "../../Enter/components/CountryPicker";

export default function Header() {
  const location = useLocation();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const styles = {
    headerContainer: {
      // backgroundColor: "#54a8b3",
      // color: "var(--color-secondary-inverted)",
      backgroundColor: "white",
      // borderBottom: "1px solid var(--c-gs1)",
      boxShadow: "var(--shad-card)",
    },
    navElement: {
      // color: "white",
      color: "inherit",
      textDecoration: "none",
      fontWeight: "800",
      fontSize: "18px",
    },
    loginButton: {
      whiteSpace: "nowrap",
      color: "var(--color-primary-inverted)",
      backgroundColor: "var(--color-primary)",
      fontWeight: "800",
      // padding: "0.375rem 2.5rem",
    },
  };

  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      expand="lg"
      variant=""
      style={styles.headerContainer}
      className="w-100 px-3"
    >
      <Navbar.Brand href="/">
        <Image src={climaworldLogo} height={"48px"} />
      </Navbar.Brand>
      <div className="d-lg-none d-flex align-items-center">
        <PersonIcon
          height={32}
          fill="var(--c-p1)"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        />
      </div>
      <Navbar.Toggle className="border-0 " />
      <Navbar.Collapse className="justify-content-end align-items-center lg-my-5">
        <Nav className="gap-3 d-flex align-items-center">
          {location.pathname === "/business" ? (
            <Nav.Link href="/" style={styles.navElement}>
              For Everyone
            </Nav.Link>
          ) : (
            <Nav.Link href="/business" style={styles.navElement}>
              For Businesses
            </Nav.Link>
          )}
          {location.pathname === "/project-partner" ? (
            <Nav.Link href="/" style={styles.navElement}>
              For Everyone
            </Nav.Link>
          ) : (
            <Nav.Link href="/project-partner" style={styles.navElement}>
              For Projects
            </Nav.Link>
          )}
          {/* <Nav.Link href="#landing-projects" style={styles.navElement}>
                Projects
              </Nav.Link> */}
          {/* <Nav.Link href="#landing-impact" style={styles.navElement}>
                Impact
              </Nav.Link> */}
          {/* <Nav.Link href="#landing-subscriptions" style={styles.navElement}>
                Subscribe
              </Nav.Link> */}
          {/* <Nav.Link href="#landing-howitworks" style={styles.navElement}>
                How it works
              </Nav.Link>
              <Nav.Link href="#landing-faq" style={styles.navElement}>
                FAQ
              </Nav.Link> */}
          {!currentUser && (
            <div className="nav-link">
              <CountryPicker />
            </div>
          )}
          <Button
            className="nav-link rounded-pill px-5 border-0 ms-lg-3 me-lg-5 my-2"
            style={styles.loginButton}
            onClick={() => navigate("/home")}
          >
            {currentUser ? "Go to App" : "Log In"}
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
