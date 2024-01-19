import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  CloseButton,
  Image,
  ToggleButton,
} from "react-bootstrap";
import { BackIcon, CollapsedIcon } from "../../assets/img";
import { cw_blue, cw_cookiecenter } from "./assets";
import CookieView from "./CookieView";

export default function CookieSettings({ onClose, setCookieChoice }) {
  const [allowPerformance, setAllowPerformance] = useState(true);
  const [viewCookies, setViewCookies] = useState();

  const existingCookies = [
    {
      category: "Performance",
      cookies: [
        {
          vendor: "Datadog",
          cookies: [
            { name: "_dd_s", host: "climaworld.app", duration: "15min" },
          ],
        },
      ],
    },
  ];

  return (
    <div className="rounded" style={styles.popContainer}>
      <div className="p-3 d-flex justify-content-between align-items-center gap-3 border-bottom">
        <div className="d-flex align-items-center gap-2">
          <Image
            style={{ maxHeight: "18px", width: "100%", height: "100%" }}
            src={cw_cookiecenter}
          />
          {/* <div style={{ fontSize: "16px", fontFamily: "Batangas, sans-serif" }}>ClimaWorld Cookie Center</div> */}
        </div>

        <CloseButton onClick={onClose} />
      </div>
      <div className="border-bottom">
        {viewCookies ? (
          <>
            <div
              className="p-3 d-flex align-items-center gap-1"
              onClick={() => setViewCookies(false)}
            >
              <BackIcon height={14} />
              back
            </div>
            <div className="p-3">
              <CookieView />
            </div>
          </>
        ) : (
          <>
            <div className=" p-3 d-flex justify-content-between align-items-center">
              <div className="fw-bold">Performance</div>
              <ButtonGroup>
                <ToggleButton
                  id="cookie-performance-on"
                  value="1"
                  type="radio"
                  variant="outline-dark"
                  checked={allowPerformance}
                  onChange={(e) => setAllowPerformance(e.currentTarget.checked)}
                >
                  On
                </ToggleButton>
                <ToggleButton
                  id="cookie-performance-off"
                  value="0"
                  type="radio"
                  variant="outline-dark"
                  checked={!allowPerformance}
                  onChange={(e) =>
                    setAllowPerformance(!e.currentTarget.checked)
                  }
                >
                  Off
                </ToggleButton>
              </ButtonGroup>
            </div>
            <div className="p-3 pt-0">
              We currently only use Performance Cookies.<br></br> These cookies
              allow us to count visits and traffic sources so we can measure and
              improve the performance of our site. They help us to know which
              pages are the most and least popular and see how visitors move
              around the site. All information these cookies collect is
              aggregated and therefore anonymous. If you do not allow these
              cookies we will not know when you have visited our site, and will
              not be able to monitor its performance.
            </div>
            <div className="p-3 pt-0" onClick={() => setViewCookies(true)}>
              View Cookies
            </div>
          </>
        )}
      </div>
      <div className="p-3 d-flex justify-content-end gap-3">
        <Button style={styles.popButtons} variant="outline" onClick={() => setCookieChoice([{name: "Performance", allow: allowPerformance}])}>
          Confirm
        </Button>
        <Button style={styles.popButtons} variant="dark" onClick={() => setCookieChoice("all")}>
          Allow All
        </Button>
      </div>
    </div>
  );
}

const styles = {
  popContainer: {
    fontSize: "14px",
    margin: "0 30px 30px",
    backgroundColor: "#fff",
    width: "550px",
  },
  popButtons: {
    flex: "1",
  },
};
