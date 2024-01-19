import React, { useRef } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../../contexts/ApiContext";
import { useAppContext } from "../../../../contexts/AppContext";
import { useAuth } from "../../../../contexts/AuthContext";
import { validateEmail } from "../../../../utility/validate";
import AcceptTerms from "./AcceptTerms";

export default function SignUp() {
  const app = useAppContext();
  const api = useApi();
  const auth = useAuth();
  const navigate = useNavigate();
  const emailRef = useRef();
  const acceptTermsRef = useRef();

  const [validateError, setValidateError] = useState(false);
  const [acceptTermsError, setAcceptTermsError] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignup() {
    setValidateError(false);
    setAcceptTermsError(false);

    const email = String(emailRef.current?.value)
      .toLowerCase()
      .replace(/\s+/g, "");

    if (!validateEmail(email)) {
      return setValidateError("Please enter a valid email.");
    }
    if (!acceptTermsRef.current.checked) {
      return setAcceptTermsError("Please agree in order to continue.");
    }

    setIsLoading(true);

    const response = await api.createUser({
      email: email,
      country: app.locale?.country_code,
    });
    if (response.status === "success") {
      if (response.response.success) {
        // TODO: def move the cognito action to lambda
        auth.signup(response.response.body.id, response.response.body.meta.tempPassword, email);
      } else {
        navigate("/login", {
          state: {
            message: {
              type: "success",
              text: "You already signed up. You can find your login details in the email we sent you or you can reset your password here.",
            },
            email: email,
          },
        });
      }
    } else {
      setSignupError(response.message);
    }
  }

  return (
    <div>
      <Form.Control
        ref={emailRef}
        onKeyUp={(e) => e.key === "Enter" && handleSignup()}
        placeholder="Email"
        id="cw-signup-email"
        autoComplete="email"
        disabled={isLoading}
      />
      <button disabled={isLoading} onClick={handleSignup}>
        Create Account
      </button>
      {validateError && validateError}
      <AcceptTerms acceptTermsRef={acceptTermsRef} />
      {acceptTermsError && acceptTermsError}
      {signupError && signupError}
    </div>
  );
}
