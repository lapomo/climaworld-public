import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { useApi } from "../../contexts/ApiContext";
import { useAppContext } from "../../contexts/AppContext";
import { useAuth } from "../../contexts/AuthContext";
import ChooseProject from "./components/ChooseProject";
import EnterEmail from "./components/EnterEmail";
import ErrorComponent from "../../components/ErrorComponent";
import NameTicket from "./components/NameTicket";
import NotSupported from "./components/NotSupported";

export default function Enter() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const supportedCountries = [
    "GB", // United Kingdom
    "US", // United States
    // "BE", // Belgium is not supported anymore because apparently they're not cool with prize draws
    "BG", // Bulgaria
    "CZ", // Czech
    "DK", // Denmark
    "DE", // Germany
    "EE", // Estonia
    "IE", // Ireland
    "EL", // ####
    "ES", // Spain
    "GR", // Greece
    "FR", // France
    "HR", // Croatia
    "IT", // Italy
    "CY", // Cyprus
    "LV", // Latvia
    "LT", // Lithuania
    "LU", // Luxembourg
    "HU", // Hungary
    "MT", // Malta
    "NL", // Netherland
    "AT", // Austria
    "PL", // Poland
    "PT", // Portugal
    "RO", // Romania
    "SI", // Slovenia
    "SK", // Slovakia
    "FI", // Finnland
    "SE", // Sweden
  ];

  const { verifyToken, getUser } = useApi();
  const { login } = useAuth();
  const app = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();

  async function verifyUserLogin(token) {
    setIsLoading("Verifying your token...");
    try {
      //verify token, create user and login
      const verifyResponse = await verifyToken(token).catch((err) => {
        console.log(err);
        setError(err);
      });
      // console.log(verifyResponse);
      if (
        verifyResponse.status === "success" &&
        verifyResponse.response.success
      ) {
        setIsLoading("Logging you in...");
        const loginResponse = await login(
          verifyResponse.response.body.userdata.email,
          verifyResponse.response.body.meta.tempPassword
        )
          .then(async (response) => {
            if (response.status === "success") {
              await getUser().then(() =>
                navigate("/home", {
                  state: {
                    paymentsuccess: true,
                  },
                })
              );
            } else {
              // console.log(response.message);
              setTimeout(() => setError(response.message), 4000);
            }
          })
          .catch((err) => {
            console.log(err);
            setTimeout(() => setError(err), 2000);
          });
      } else {
        // console.log(verifyResponse.response.body);
        setTimeout(() => setError(verifyResponse.response.body), 2000);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      setTimeout(() => setError(JSON.stringify(err)), 2000);
    }
  }

  useEffect(() => {
    // app.setEntryTempStorage({...app.entryTempStorage, enterPage: 0})
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      console.log("token found");
      verifyUserLogin(token);
    } else {
      const localTempStorage = localStorage.getItem("localTempStorage");
      // console.log(localTempStorage);
      if (
        localTempStorage &&
        localTempStorage !== "undefined" &&
        JSON.parse(localTempStorage).enterPage
      ) {
        console.log("case1");
        app.setEntryTempStorage(JSON.parse(localTempStorage));
      } else {
        console.log("case2");
        if (location.state?.from !== "external") {
          app.setEntryTempStorage({ ...app.entryTempStorage, enterPage: "0" });
        }
        //   const idParam = params.get("id");
        //   const mailParam = params.get("email");
        //   const nameParam = params.get("name");
        //   const countryParam = params.get("country");
        //   const projectParam = params.get("project");
        //   reinstate(idParam, mailParam, nameParam, countryParam, projectParam);
      }
    }
  }, []);

  return (
    // <div>
    <div
      className="d-flex py-5 justify-content-center align-items-center"
      style={{ backgroundColor: "black", minHeight: "100vh" }}
    >
      <div className="d-flex flex-column align-items-center justify-content-center gap-3">
        {isLoading && !error && <Loading message={isLoading} />}
        {!isLoading && !error && app.entryTempStorage?.enterPage === "0" && (
          <EnterEmail theme="dark" text="Claim your Entry" />
        )}
        {!isLoading && !error && app.entryTempStorage?.enterPage === "1" && (
          <NameTicket />
        )}
        {!isLoading &&
          !error &&
          app.entryTempStorage?.enterPage === "2" &&
          (supportedCountries.includes(app.entryTempStorage.country) ? (
            <ChooseProject />
          ) : (
            <NotSupported />
          ))}
        {error && <ErrorComponent error={error} />}
        {/* <div onClick={continueFlow}>continueFloW</div> */}
      </div>
    </div>
    // </div>
  );
}
