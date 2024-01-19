import { datadogRum } from "@datadog/browser-rum";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import CookieBox from "./CookieBox";
import CookieSettings from "./CookieSettings";

import "./CustomCookie.css";

export default function CustomCookies() {
  const [cookiesChosen, setCookiesChosen] = useState(true);
  const [openSettings, setOpenSettings] = useState(false);

  function setCookieChoice(choices) {
    setCookiesChosen(true);
    handleChoices(choices)
    localStorage.setItem("cwcookieconsent", JSON.stringify(choices));
  }

  function handleChoices(storedconsent){
    if (storedconsent === "all") {
      allowAll();
    } else if (storedconsent === "none") {
      // allowRequired() 
    } else {
      storedconsent.map((category) => {
        if (category.allow) {
          switch (category.name) {
            // insert other categories and their scriptcalls here
            case "Performance":
              allowPerformance();
              break;
          }
        }
      });
    }
  }

  function allowAll() {
    allowPerformance();
  }

  function allowRequired() {
    datadogRum.init({
      applicationId: "0cb21b19-6f89-48cb-a501-16089dace1a1",
      clientToken: "pub9296d85aadd7d7b8a12d3aaaa44190ad",
      site: "datadoghq.eu",
      service: "cw-reactjs_sirma",

      // Specify a version number to identify the deployed version of your application in Datadog
      version: "1.0.0",
      sampleRate: 100,
      sessionReplaySampleRate: 100,
      trackInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "mask-user-input",
    });
  }

  function allowPerformance() {
    // datadogRum.init({
    //   applicationId: "0cb21b19-6f89-48cb-a501-16089dace1a1",
    //   clientToken: "pub9296d85aadd7d7b8a12d3aaaa44190ad",
    //   site: "datadoghq.eu",
    //   service: "cw-reactjs_sirma",

    //   // Specify a version number to identify the deployed version of your application in Datadog
    //   version: "1.0.0",
    //   sampleRate: 100,
    //   sessionReplaySampleRate: 100,
    //   trackInteractions: true,
    //   trackResources: true,
    //   trackLongTasks: true,
    //   defaultPrivacyLevel: "mask-user-input",
    //   enableExperimentalFeatures: ['clickmap']
    // });
    datadogRum.startSessionReplayRecording();
  }

  useEffect(() => {
    allowRequired()
    if (!localStorage.getItem("cwcookieconsent")) {
      setCookiesChosen(false);
    } else {
      const storedconsent = JSON.parse(localStorage.getItem("cwcookieconsent"));
      handleChoices(storedconsent)
    }
  }, []);


  return (
    !cookiesChosen && (
      <div
        className="custom-cookies d-flex align-items-end justify-content-end"
        style={styles.container}
      >
        {openSettings ? (
          <CookieSettings
            onClose={() => setOpenSettings(false)}
            setCookieChoice={setCookieChoice}
          />
        ) : (
          <CookieBox
            onCustomise={() => setOpenSettings(true)}
            setCookieChoice={setCookieChoice}
          />
        )}
      </div>
    )
  );
}

const styles = {
  container: {
    position: "fixed",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",

    backgroundColor: "#0009",
    color: "black",

    zIndex: "2147483646",
  },
};
