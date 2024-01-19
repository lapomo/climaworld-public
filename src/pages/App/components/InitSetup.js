import { wait } from "@testing-library/user-event/dist/utils";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Form, Image, Modal } from "react-bootstrap";
import { Chameleon, tree_cash, trophy } from "../../../assets/img";
import CTAButton from "../../../components/CTAButton";
import LoadingEarth from "../../../components/LoadingEarth";
import { useApi } from "../../../contexts/ApiContext";
import { useAppContext } from "../../../contexts/AppContext";
import CountryPicker from "../../Enter/components/CountryPicker";

export default function InitSetup() {
  const { user, updateUser } = useApi();
  const app = useAppContext();
  const nameRef = useRef();
  const anonymnameRef = useRef();
  const tagmeinstaRef = useRef();
  const instaNameRef = useRef();
  const [showModal, setShowModal] = useState();
  const [loading, setLoading] = useState();
  const [submitted, setSubmitted] = useState();
  const [message, setMessage] = useState();

  const [displayedName, setDisplayedName] = useState("First Last");
  const [tagmeInsta, setTagmeInsta] = useState(true);
  const [instaName, setInstaName] = useState();

  async function handleSubmit(e) {
    console.log("enter submit");
    e.preventDefault();
    setMessage(false);
    // save info in db
    const name = nameRef.current.value;
    const insta = instaNameRef.current.value;
    console.log("name: " + name + " insta: " + insta);
    if (!name || name.length < 5 || name.split(" ").length < 2)  {
      console.log("nameerror");
      return setMessage("Please enter your full name");
    }
    if (tagmeinstaRef.current.checked && (!insta || insta === "")) {
      console.log("instaerror");
      return setMessage("Please enter your instagram username");
    }
    console.log("submitted");
    setLoading(true);

    await updateUser(user.id, {
      "userdata.name": name,
      "userdata.anonymize": !anonymnameRef.current.checked,
      "userdata.instagram": tagmeinstaRef.current.checked ? insta : "notagme",
      "userdata.country": app.locale?.country_code,
    });

    // show general info abou the app / how it works
    setSubmitted(true);
    setLoading(false);
  }

  useEffect(() => {
    if (
      !submitted &&
      user &&
      (!user?.userdata?.name || user?.userdata?.name === "")
    ) {
      setShowModal(true);
      if(user?.userdata?.name){
        setDisplayedName(user?.userdata?.name)
      }
    }
  }, [user]);

  function nameChanged(name) {
    name = name.trim();
    if (!name || name === "") {
      name = "Your Name";
    }
    // else {
    const parts = name.split(" ");
    if (parts.length === 1 || anonymnameRef.current.checked) {
      setDisplayedName(name);
    } else {
      const firstNames = parts
        .slice(0, parts.length - 1)
        .reduce((fnames, fname) => fnames + " " + fname);
      setDisplayedName(firstNames + " " + parts.slice(-1)[0].charAt(0) + ".");
    }
    // }
  }

  return (
    <Modal
      centered
      show={showModal}
      onHide={() => submitted && setShowModal(false)}
    >
      {!loading && (
        <Modal.Header
          closeButton={submitted}
          className="fw-bold d-flex justify-content-center"
        >
          {submitted ? "Congratulations!" : "Some inital setup"}
        </Modal.Header>
      )}
      <Modal.Body>
        {loading ? (
          <LoadingEarth className="py-5" />
        ) : submitted ? (
          <div className="p-3 d-flex flex-column gap-3 text-center">
            <div className="fs-5">You have joined ClimaWorld!</div>
            <div>
              <Image src={tree_cash} height="180px" />
            </div>
            <div>
              Look around your account and get started earning the chance to win cash prizes by funding climate projects.
            </div>
            {/* <div>
              Your account is separated in the sections Climate, with all climate related topics, and Prizes, with everything about the draws.
            </div> */}
            {/* <div>We are excited to have you here ❤</div> */}
            <div className="pt-3 fw-bold">
              Share the love, let's save the planet! ❤
            </div>
            <div className="pt-3">
            <CTAButton
              text="Let's get started"
              handle_cta_click={() => setShowModal(false)}
            /></div>
          </div>
        ) : (
          <div className="p-3">
            <Form
              className="mt-3 d-flex flex-column align-items-center text-start"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Form.Group
                id="cw-initsetup-name-group"
                className="d-flex flex-column gap-1"
              >
                <Form.Label className="fs-5 pb-1">Your name</Form.Label>
                <Form.Check
                  className="text-start"
                  style={{ maxWidth: "380px", fontSize: "14px" }}
                  ref={anonymnameRef}
                  label={"show my full name when I win"}
                  type="switch"
                  id={`anonymname-checkbox`}
                  // defaultValue={"true"}
                  autoComplete="name"
                  defaultChecked={true}
                  onChange={(e) => nameChanged(nameRef.current.value)}
                />
                <Form.Control
                  id="cw-initsetup-name"
                  type="text"
                  ref={nameRef}
                  placeholder="Full legal name"
                  defaultValue={user?.userdata?.name}
                  onChange={(e) => nameChanged(e.target.value)}
                  required
                  autoFocus
                />
                <Form.Text>It will be shown as: {displayedName}</Form.Text>
              </Form.Group>
              <div className="pt-4 border-bottom w-100"></div>
              <Form.Group
                id="cw-initsetup-country-group"
                className="pt-4 d-flex flex-column gap-1"
              >
                <Form.Label className="fs-5 pb-1">Your country</Form.Label>
                <CountryPicker style={{ backgroundColor: "var(--c-bg2)" }} />
              </Form.Group>
              <div className="pt-4 border-bottom w-100"></div>
              <Form.Group
                id="cw-initsetup-insta-group"
                className="pt-4 d-flex flex-column gap-1"
                style={{ width: "100%", maxWidth: "335px" }}
              >
                <Form.Label className="fs-5 pb-1">Your instagram</Form.Label>
                <Form.Check
                  className="text-start"
                  style={{ maxWidth: "380px", fontSize: "14px" }}
                  ref={tagmeinstaRef}
                  label={"tag me in instagram"}
                  type="switch"
                  id={`tagmeinsta-checkbox`}
                  // defaultValue={"true"}
                  defaultChecked={true}
                  onChange={(e) => setTagmeInsta(e.target.checked)}
                />
                <Form.Control
                  id="cw-initsetup-insta"
                  type="text"
                  ref={instaNameRef}
                  placeholder="Instagram username"
                  defaultValue={instaName}
                  onChange={(e) => setInstaName(e.target.value)}
                  required={tagmeInsta}
                  hidden={!tagmeInsta}
                />
              </Form.Group>

              <div className="position-relative">
                <Chameleon className="position-absolute" height={45} style={{top: "24px", right: "0"}} />
                <CTAButton
                  disabled={loading}
                  className="w-100 mt-5 px-4"
                  style={{ maxWidth: "220px" }}
                  //   handle_cta_click={handleSubmit}
                  text="Complete setup"
                  type="submit"
                />
              </div>
              {message && <div className="pt-3">{message}</div>}
            </Form>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
