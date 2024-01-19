import React, { useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";

import { useAuth } from "../../../contexts/AuthContext";
import { useApi } from "../../../contexts/ApiContext";
import { useNavigate } from "react-router-dom";
import AppContainer from "../components/AppContainer";
import HomeBox from "../Home/HomeBox";
import { EditIcon } from "../../../assets/img";
import DataBox from "./DataBox";

/* 

  Settings Page: display user data and settings

 */
export default function Settings() {
  const [message, setMessage] = useState();
  const [showModal, setShowModal] = useState(false);

  const { currentUser, logout } = useAuth();
  const { user, updateUser } = useApi();

  const navigate = useNavigate();

  const userAttributes = [
    { title: "Name", key: "name" },
    { title: "Email", key: "email" },
    { title: "Country", key: "country", noedit: true },
    { title: "Anonymize", key: "anonymize", type: "switch", label: "Do not publish my surname and country if I am the winner of a prize"}
  ];

  // function deleteAccount() {
  //   setMessage(false);

  //   try {
  //     deleteUser();
  //   } catch (error) {
  //     setShowModal(false);
  //     setMessage({
  //       type: "danger",
  //       text: "Deleting your Account failed: ".error,
  //     });
  //   }
  // }

  function updateAttribute() {
    // check for validity
  }

  function handleLogoutClick() {
    logout();
    navigate("/");
  }

  return (
    <>
      <AppContainer>
        <div className="d-none d-md-block px-3 pb-5 fs-1">Settings</div>

        {message && <Alert variant={message.type}>{message.text}</Alert>}
        <div className="p-3 ps-md-5 pt-5 d-flex flex-column">
          <div
            className="d-flex flex-column gap-3"
            // style={{ maxWidth: "100vw" }}
          >
            {
              userAttributes.map((attribute, index) => 
                <DataBox key={index} attribute={attribute} />
              )}
              
            {/* <div className="w-100 d-flex flex-column ">
              <div className="px-3 fw-bold">Email</div>
              <HomeBox>{user && currentUser.attributes.email}</HomeBox>
            </div>
            <div className="w-100 d-flex flex-column ">
              <div className="px-3 fw-bold">Country</div>
              <HomeBox>{user && user.userdata.country}</HomeBox>
            </div> */}
          </div>

          <Button
            className="mt-5 px-4 py-2" // d-md-none 
            variant="secondary"
            onClick={handleLogoutClick}
            style={{maxWidth: "380px"}}
          >
            Log Out
          </Button>
          {user?.userdata.fundings && <a
            href="#"
            className="mt-5 text-center text-md-start"
            style={{ color: "grey" }}
            onClick={() => setShowModal(true)}
          >
            Cancel my subscription
          </a>}
        </div>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          style={{ maxWidth: "100vw" }}
        >
          <Modal.Header closeButton>
            <h4 className="m-0">Cancel Subscription</h4>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to cancel your Subscription?</p>
            <p>
              We will delete you account and you won't be able to log in again.
            </p>
            <p>
              You can also request to pause your subscription, if you want to
              come back again later.
            </p>
          </Modal.Body>
          <Modal.Footer className="justify-content-md-end justify-content-center gap-3">
            <a href="mailto:chat@climaworld.app?subject=Cancel%20Subscription">
              <Button variant="outline" style={{ textDecoration: "underline" }}>
                Delete me
              </Button>
            </a>
            <a href="mailto:chat@climaworld.app?subject=Pause%20Subscription">
              <Button variant="outline" style={{ textDecoration: "underline" }}>
                Pause
              </Button>
            </a>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </AppContainer>
    </>
  );
}
