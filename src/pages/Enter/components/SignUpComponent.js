import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import LoadingEarth from "../../../components/LoadingEarth";
import { useApi } from "../../../contexts/ApiContext";
import { useAppContext } from "../../../contexts/AppContext";
import { useAuth } from "../../../contexts/AuthContext";
import { validateEmail, validatePassword } from "../../../utility/validate";
import CheckTCs from "./CheckTCs";
import CTAInputComponent from "./CTAInputComponent";

export default function SignUpComponent() {
  const navigate = useNavigate();
  const app = useAppContext();
  const auth = useAuth();
  const api = useApi();

  const checkTCRef = useRef();

  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const [email, setEmail] = useState();
  const [userId, setUserId] = useState();

  async function handleSetPasswordClick(input) {
    setMessage(false);
    console.log("password set");
    input = input.trim();

    if (!validatePassword(input)) {
      setMessage({
        variant: "error",
        text: "The password must be at least 8 characters long and include a special character",
      });
      return;
    }
    if (!checkTCRef.current.checked) {
      setMessage({
        variant: "error",
        text: "Please agree in order to continue",
      });
      return;
    }

    setIsLoading(true);

    // send api call

    setMessage({
      variant: "success",
      text: "Getting everything ready.",
    });
    await auth.signup(userId, input, email).catch((err) => {
      console.log(err);
      setMessage({
        variant: "error",
        text: "There was an error while trying to setup your account. Please get in touch with us via the chat icon on the right.",
      });
      // setIsLoading(false);
    });
  }
  async function handleEnterEmailClick(input) {
    setMessage(false);
    setIsLoading(true);
    console.log("email entered");

    input = String(input).toLowerCase().replace(/\s+/g, "");

    if (window.DD_RUM) {
      window.DD_RUM.setUser({
        email: input,
      });
    }

    if (!validateEmail(input)) {
      setMessage({ variant: "error", text: "Please enter a valid email." });
    } else {
      setEmail(input);
      const requestMember = await api.createUser({ email: input });
      if (requestMember.status === "success") {
        if (requestMember.response.found === true) {
          navigate("/login", {
            state: {
              message: {
                type: "success",
                text: "You already joined ClimaWorld before. Login here with your email and password or reset your password below.",
              },
              email: email,
            },
          });
        } else if (requestMember.response.found === false) {
          setUserId(requestMember.response.id);
          setShowPasswordInput(true);
        } else {
          setMessage({
            variant: "error",
            text: "There has been an error. Please get in touch with us via one of the chat options on the right.",
          });
        }
      } else {
        setMessage({
          variant: "error",
          text: "There has been an error. Please get in touch with us via one of the chat options on the right.",
        });
      }
    }
    setIsLoading(false);
  }
  return (
    <>
      <div className="ctainputcomponent-container position-relative w-100">
        {isLoading && !message.variant === "error" && (
          <div className="position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-end">
            <LoadingEarth />
          </div>
        )}
        {isLoading && (
          <div>
            <LoadingEarth />
          </div>
        )}
        {!isLoading && (
          <CTAInputComponent
            className={`${
              showPasswordInput ? "show" : ""
            } pw position-absolute top-0 start-0 bottom-0 end-0`}
            buttonText="Create Account"
            onClick={handleSetPasswordClick}
            placeholder="Password"
            autoComplete="password"
            isLoading={isLoading}
          />
        )}
        {!isLoading && (
          <CTAInputComponent
            className={`${
              showPasswordInput ? "fade" : ""
            } position-absolute top-0 start-0 bottom-0 end-0`}
            buttonText="Join ClimaWorld"
            onClick={handleEnterEmailClick}
            placeholder="Email Address"
            autoComplete="email"
            isLoading={isLoading}
          />
        )}
      </div>
      {showPasswordInput && !isLoading && (
        <CheckTCs
          className={`${showPasswordInput ? "cw-signup-tandc" : "fade"}`}
          ref={checkTCRef}
          disabled={isLoading}
        />
      )}
      {message && (
        <div
          className="mt-2 text-start px-4"
          style={{ color: "var(--c-txt1)", fontSize: "14px" }}
        >
          {message.text}
        </div>
      )}
    </>
  );
}
