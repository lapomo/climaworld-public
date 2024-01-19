import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SignUpEmail from "../../components/.archive/signup/SignUpEmail";

import SignUpName from "../../components/.archive/signup/SignUpName";
import SignUpPassword from "../../components/.archive/signup/SignUpPassword";
import SignUpPlanted from "../../components/.archive/signup/SignUpPlanted";
import SignUpVerify from "../../components/.archive/signup/SignUpVerify";
import { useAuth } from "../../contexts/AuthContext";
import { useApi } from "../../contexts/ApiContext";
import SupportChameleon from "../../components/SupportChameleon";
import { useEffect } from "react";

/* 

  Sign Up Flow Pages: take user through the signup flow

  Tags: OUTCALLAPIAWS, OUTCALLAUTHAWS

  TODO: make it possible to enter verification code later on at login if user exits the page
  TODO: opensignup: remove isBeta stuff
 */
export default function SignUpFlow({ isBeta }) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currPage, setCurrPage] = useState(0);
  const [username, setUsername] = useState();
  const [prefUsername, setPrefUsername] = useState();
  const [email, setEmail] = useState();
  const [country, setCountry] = useState();

  const { signup, confirmSignup, resendSignup } = useAuth();
  const { createUser, stats, setCountrySupported } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    // set flag if country is supported or not
    setCountrySupported(stats.cwCountries.cwValue.includes(country));
  }, [country]);

  function goBack() {
    setCurrPage(currPage - 1);
  }

  // routing and functionality of the signup flow
  async function continueFlow(password = false) {
    switch (currPage) {
      case 0:
      case 1:
      case 2:
        setCurrPage(currPage + 1);
        break;
      case 3: // password page
        !password && setError("No password provided");
        try {
          const tempUsername = String(
            Date.now() + "K" + Math.floor(Math.random() * 99)
          );
          // create user in aws cognito OUTCALLAUTHAWS
          const signupResult = await signup(
            tempUsername,
            password,
            email,
            prefUsername
          );
          // create database entry OUTCALLAPIAWS
          await createUser(signupResult.userSub, {
            username: signupResult.user.username,
            prefUsername: prefUsername,
            email: email,
            country: country,
          });
          // add preferred username
          setUsername(tempUsername);
          setCurrPage(currPage + 1);
        } catch (e) {
          if (e.name === "UsernameExistsException") {
            setError(
              "This email address seems to be already registered with us. If you disagree, please contact us."
            );
          } else {
            setError(
              "We were not able to create an account for you: " + e.message
            );
          }
          console.log("error creating an account", JSON.stringify(e));
        }
        break;
      case 4: // email confirmation code page
        !password && setError("No code provided");
        if (password === "resend") {
          try {
            //  resend the verification code OUTCALLAUTHAWS
            const result = await resendSignup(username);
            console.log("result", result);
            setSuccess("We sent the code again!");
          } catch (e) {
            setError("Resending code failed");
            console.log("error resending code", e);
          }
        } else {
          try {
            // send confirmation to cognito OUTCALLAUTHAWS
            const result = await confirmSignup(username, password);
            console.log("result", result);
          } catch (e) {
            setError("Code confirmation failed: " + e.message);
            console.log("error confirming email", e);
          }
        }
    }
  }

  const pages = [
    <SignUpName
      setUsername={setPrefUsername}
      setCountry={setCountry}
      continueFlow={continueFlow}
    />,
    <SignUpPlanted name={prefUsername} continueFlow={continueFlow} />,
    <SignUpEmail setEmail={setEmail} continueFlow={continueFlow} />,
    <SignUpPassword continueFlow={continueFlow} goBack={goBack} />,
    <SignUpVerify email={email} continueFlow={continueFlow} />,
  ];

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {isBeta ? (
          pages[currPage]
        ) : (
          <div>
            Sign Ups are not open yet. Please join our waiting list to be one of
            the first we tell as soon as you can join!<br></br>
            <a href="#" onClick={() => navigate("/")}>
              Go to Homepage to join the waitinglist
            </a>
          </div>
        )}
        {success && (
          <Alert className="mt-3" variant="success">
            {success}
          </Alert>
        )}
        {error && (
          <Alert className="mt-3" variant="danger">
            {error}
          </Alert>
        )}
        {/* <Footer /> */}
      </div>
      <SupportChameleon />
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    maxWidth: "400px",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
};
