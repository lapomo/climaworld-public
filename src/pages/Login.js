import React, { useEffect, useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CTAButton from "../components/CTAButton";

import { Chameleon } from "../assets/img";
import PhoneContainer from "../components/PhoneContainer";
import BackButton from "../components/BackButton";

/* 

  Component:  Login
  Function: - login user by submitting username/email and password
  
 */
export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (route.state && route.state.message) {
      route.state.message.type == "success"
        ? setSuccess(route.state.message.text)
        : setError(route.state.message.text);
    }
    if (route?.state?.email) {
      passwordRef.current.focus();
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if(window.DD_RUM){
      window.DD_RUM.setUser({
        email: usernameRef.current.value,
    })
    }

    try {
      setSuccess("");
      setError("");
      setLoading(true);
      if (await login(usernameRef.current.value, passwordRef.current.value)) {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      setSuccess("");
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <BackButton />
      <PhoneContainer>
        <div
          className="d-flex flex-column justify-content-center"
          style={{ height: "90vh" }}
        >
          <Card style={{ position: "relative" }}>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {!success && <div className="d-flex justify-content-center"><div  className="border rounded p-3 mb-3" style={{maxWidth: "350px"}} >You can find your password in the email we sent you after signing up</div ></div>}
              {success && <Alert variant="success">{success}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    id="cw-login-email"
                    type="email"
                    ref={usernameRef}
                    required
                    autoFocus
                    autoComplete="username"
                    defaultValue={route?.state?.email}
                  />
                </Form.Group>
                <Form.Group className="mt-3" id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    id="cw-login-password"
                    type="password"
                    autoComplete="password"
                    ref={passwordRef}
                    required
                  />
                </Form.Group>
                <CTAButton
                  disabled={loading}
                  className="w-100 mt-3"
                  type="submit"
                  text="Log In"
                />
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Card.Body>
            <div
              style={{
                width: "150px",
                height: "150px",
                position: "absolute",
                top: "-80px",
                right: "-40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Chameleon width={150} height={150} />
            </div>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/">Sign Up</Link>
          </div>
        </div>
      </PhoneContainer>
    </>
  );
}
