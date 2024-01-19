import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CTAButton from "./CTAButton";
import PhoneContainer from "./PhoneContainer";

/* 

  Component:  Forgot Password
  Function: - lets user reset his password by inputting an email address
  
 */
export default function ForgotPassword() {
  const usernameRef = useRef();
  const codeRef = useRef();
  const passwordRef = useRef();
  const { resetPassword, resetPasswordSubmit } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      if (window.DD_RUM) {
        window.DD_RUM.setUser({
          email: usernameRef.current.value,
        });
      }
      // console.log(codeSent);
      if (!codeSent) {
        await resetPassword(usernameRef.current.value);
        setMessage("Check your email inbox, we sent you the code there!");
        setCodeSent(true);
      } else {
        await resetPasswordSubmit(
          usernameRef.current.value,
          codeRef.current.value,
          passwordRef.current.value
        );
        navigate("/login", {
          state: { message: { type: "success", text: "New password is set" } },
        });
      }
    } catch (e) {
      setError("Failed to reset password " + e);
    }

    setLoading(false);
  }

  return (
    <PhoneContainer>
      <div
        className="d-flex flex-column justify-content-center"
        style={{ height: "90vh" }}
      >
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Password Reset</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="username" hidden={codeSent}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  id="cw-forgot-username"
                  autoComplete="username"
                  type="text"
                  ref={usernameRef}
                  required
                />
              </Form.Group>
              {codeSent && (
                <>
                  <Form.Group id="code">
                    <Form.Label>Code</Form.Label>
                    <Form.Control type="number" ref={codeRef} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      id="cw-forgot-password"
                      autoComplete="password"
                      type="password"
                      ref={passwordRef}
                      required
                    />
                  </Form.Group>
                </>
              )}
              <CTAButton
                disabled={loading}
                className="w-100 mt-3"
                type="submit"
                text={codeSent ? "Reset Password" : "Send Reset Code"}
              />
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Go back to Login</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/">Sign Up</Link>
        </div>
      </div>
    </PhoneContainer>
  );
}
