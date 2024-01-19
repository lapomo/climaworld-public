
import BottomNavigation from "./BottomNavigation";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "../../LandingPage/components/Footer";

import "./AppContainer.css";
import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import Notification from "./Notification";
import { useAuth } from "../../../contexts/AuthContext";
import InitSetup from "./InitSetup";

export default function AppContainer(props) {
 
  const location = useLocation()

  const {currentUser} = useAuth();

  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0 });
  }, [location.pathname]);


  return (
    currentUser ? 
    <div>
      <Header className="d-md-none" />
      <div className="d-flex ">
        <Sidebar className="d-none d-md-flex position-fixed" />
        <div
          className="cw-inapp-content d-block w-100"
          style={{ backgroundColor: "var(--c-p2)", color: "var(--c-gs1)", minHeight: "100vh" }}
        >
          <div className="p-md-5">{props.children}</div>
          <Footer className="pb-5 pb-md-0" />
          <Notification />
          <InitSetup />
        </div>
      </div>
      <BottomNavigation className="d-md-none" />
    </div>
    :
    <div style={{ minHeight: "100vh", backgroundColor: "var(--c-p2)", color: "var(--c-txt1)" }}><Header />{props.children}<Footer/></div>
  );
}
