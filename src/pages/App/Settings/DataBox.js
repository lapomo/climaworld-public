import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { CheckIcon, EditIcon, InfoIcon, TickIcon } from "../../../assets/img";
import Loading from "../../../components/Loading";
import { useApi } from "../../../contexts/ApiContext";
import { validateEmail } from "../../../utility/validate";

import "./DataBox.css";

export default function DataBox({ attribute }) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { user, updateUser } = useApi();

  const inputRef = useRef();

  async function handleClick() {
    setError(false);
    //attribute is not to be edited
    if (attribute.noedit) {
      setError("Please contact us to change this");
      return setTimeout(() => setError(false), 5000);
    }

    //edit mode or not yet
    if (attribute.type === "switch" || editing) {
      const value =
        attribute.type === "switch"
          ? inputRef.current.checked
          : inputRef.current.value;

      // validate edited item
      switch (attribute.key) {
        case "email":
          //TODO: make this editable (look at DataBox.js for info)
          setError(
            "We are working on this feature. For now please contact us to change your email address"
          );
          return setTimeout(() => setError(false), 8000);
          if (!validateEmail(value)) {
            setError("Please enter a valid email address");
            return;
          }
          break;
        case "name":
          if (value === "") {
            setError("Please enter your name");
            return;
          }
      }

      setEditing(false);
      setLoading(true);

      // update attribute
      const updateKey = "userdata." + attribute.key;
      await updateUser(user.id, { [updateKey]: value }).then((result) => {
        if (result.status === "success" && result.response.success) {
          setLoading(false);
          setError("Saved");
        } else {
          setError("Please get in touch with us, there has been an error");
        }
      });

      // if email
      //   change db userdata.email
      // change db id (possible?)
      // create a new entry in db with new email and email hash as id
      // update email and username in cognito

      setLoading(false);
    } else {
      setEditing(true);
    }
  }

  useEffect(() => {
    editing && inputRef.current.focus();
  }, [editing]);

  return (
    <div className="pb-3 d-flex flex-column">
      <div className="fw-bold ">{attribute.title}</div>
      {attribute.type === "switch" ? (
        <Form.Check
        className="pt-3"
        style={{ maxWidth: "380px" }}
          ref={inputRef}
          label={attribute.label}
          type="switch"
          id={`${attribute.key}-checkbox`}
          defaultValue={user?.userdata[attribute.key]}
          onChange={handleClick}
        />
      ) : (
        <InputGroup className="data-box pt-3" style={{ maxWidth: "380px" }}>
          <Form.Control
            className="p-2 px-3"
            ref={inputRef}
            placeholder={attribute.title}
            defaultValue={user?.userdata[attribute.key]}
            disabled={!editing}
            onKeyUp={(e) => e.key === "Enter" && handleClick()}
            //   onBlur={(e) => {e.target.value = user.userdata[attribute.key]; setEditing(false);}}
          />
          <Button
            className="d-flex align-items-center"
            variant="secondary"
            // style={{backgroundColor: "white"}}
            onClick={() => {
              // console.log("clicked")
              handleClick();
            }}
            disabled={loading}
          >
            {attribute.noedit ? (
              <InfoIcon height={24} fill="var(--color-secondary-inverted)" />
            ) : loading ? (
              <div className="loader"></div>
            ) : editing ? (
              <TickIcon fill="var(--color-secondary-inverted)" />
            ) : (
              <EditIcon fill="var(--color-secondary-inverted)" />
            )}
          </Button>
        </InputGroup>
      )}
      {error && <div className="ps-2">{error}</div>}
    </div>
  );
}
