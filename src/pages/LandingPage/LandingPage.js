import React, { useEffect } from "react";
import CTABanner from "../Enter/components/CTABanner";
import CWVideo from "../Enter/components/CWVideo";
import HowTo from "./components/HowTo";
import Enter from "../Enter/Enter";
import Breakdown from "./components/Breakdown";
import Countdown from "./components/Countdown";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import PastDraws from "./components/PastDraws";
import { useAppContext } from "../../contexts/AppContext";
import LeaderBoard from "./components/Leaderboard/LeaderBoard.js";
import HowToPerson from "./components/HowToPerson/HowToPerson";
import { wavefromtop } from "./assets";
import WaveDown from "./components/WaveDown";
import WaveUp from "./components/WaveUp";
import { Image } from "react-bootstrap";
import { grass } from "../../assets/img";
import GrassDivider from "./components/GrassDivider";
import Testimonials from "./components/Testimonials/Testimonials";

export default function LandingPage() {
  const app = useAppContext();
  return (
    <div style={styles.pageContainer}>
      <Header />
      <Hero />
      {/* <WaveDown /> */}
      <GrassDivider top={true} />
      {app.isEligible ? (
        <>
          {/* <Countdown /> */}
          {/* <Breakdown /> */}
          {/* <Projects /> */}
          {/* <CWVideo /> */}
          {/* <HowTo /> */}
          {/* <Faq /> */}
          <LeaderBoard />
          <GrassDivider />
          {/* <WaveUp /> */}
          <HowToPerson />
          <CWVideo blue />
          <Testimonials />
          <GrassDivider />
        </>
      ) : (
        <>
          <LeaderBoard />
          <GrassDivider />
          <CWVideo blue />
          <Testimonials />
          <GrassDivider />
        </>
      )}
      <CTABanner />
      <Footer />
      <div id="scrolltocontainer"></div>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: "var(--c-p2)",
    paddingTop: "74px",
  },
};
