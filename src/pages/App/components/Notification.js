import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Form, Image, Modal } from "react-bootstrap";
import { trophy } from "../../../assets/img";
import CTAButton from "../../../components/CTAButton";
import LoadingEarth from "../../../components/LoadingEarth";
import { useApi } from "../../../contexts/ApiContext";
import { useAppContext } from "../../../contexts/AppContext";

import "./Notification.css";

function EnterPayoutDetails({ claimOption, draw, drawResult, closeModal, setSubmitted }) {
  const [showModal, setShowModal] = useState("init");
  const [loading, setLoading] = useState();
  // const [submitted, setSubmitted] = useState();
  const [message, setMessage] = useState();

  const [bankDetails, setBankDetails] = useState();

  const ibanRef = useRef();
  const swiftRef = useRef();
  const telRef = useRef();
  const addressStreetRef = useRef();
  const addressZipRef = useRef();
  const addressCityRef = useRef();
  const saveThisRef = useRef();
  const { user, updateUser, updatePrizeClaimed, sendMailToCW, getDraws } = useApi();

  async function handleSubmit() {
    setLoading(true);
    if (
      !ibanRef.current.value ||
      !swiftRef.current.value ||
      !telRef.current.value ||
      !addressZipRef.current.value ||
      !addressCityRef.current.value
    ) {
      setMessage("Please fill out all the fields.");
      setLoading(false);
      return;
    }
    const body = {
      IBAN: ibanRef.current.value,
      SWIFT: swiftRef.current.value,
      Tel: telRef.current.value,
      Address: [
        addressStreetRef.current.value,
        addressZipRef.current.value,
        addressCityRef.current.value,
      ],
      SaveInfo: saveThisRef.current.checked,
    };
    console.log(body);
    if(saveThisRef.current.checked){
      await updateUser(user.id, {
        "meta.saved.bank": {
          iban: ibanRef.current.value,
          swift: swiftRef.current.value,
          tel: telRef.current.value,
          address: {
            city: addressCityRef.current.value,
            plz: addressZipRef.current.value,
            street: addressStreetRef.current.value,
          },
        },
        "userdata.saved": ["bank"],
      })
    }
    await sendMailToCW(body);
    await updatePrizeClaimed({
      drawIndex: draw.index,
      resultIndex: drawResult.index,
      claimed: claimOption,
    });
    // await getDraws(true)
    setSubmitted("transferSubmitted")
    //   return
    // sendMailToCW(body)
    //   .then((result) => {
    //     console.log(JSON.stringify(result));
    //     if (result.status === "success" && result.response.success) {
    //       setSubmitted(
    //         "Thank you. We will transfer your prize shortly, you will get a notification about it via email."
    //       );
    //       // TODO: Update Prize to have been claimed
    //     } else {
    //       setSubmitted(
    //         "Something went wrong. Please get in touch via the chat icon on the right"
    //       );
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setSubmitted(
    //       "Something went wrong. Please get in touch via the chat icon on the right"
    //     );
    //   })
    //   .finally(() => setLoading(false));
  }

  useEffect(() => {
    if(user?.userdata.saved?.includes("bank")){
      setBankDetails(user.meta?.saved.bank);
    }
  }, [user])

  return (
    <Modal
      centered
      show={showModal}
      onHide={closeModal}
      className="ray-effect"
    >
      <Modal.Header closeButton className="fw-bold">
        Your payout details
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <LoadingEarth />
        ) : (
          <>
            <div className="">
              {bankDetails ? "Please confirm or edit your bank account details" : "Please enter your details here so we can transfer your prize:"}
            </div>
            <Form className="mt-3 d-flex flex-column gap-3">
              <Form.Group id="cw-claimprize-iban-group">
                <Form.Label>IBAN or Account Number</Form.Label>
                <Form.Control
                  id="cw-claimprize-iban"
                  type="text"
                  ref={ibanRef}
                  placeholder="IBAN or Account Number"
                  required
                  autoFocus
                  defaultValue={bankDetails?.iban}
                />
              </Form.Group>
              <Form.Group id="cw-claimprize-bic-group">
                <Form.Label>BIC / Swift or Sortcode</Form.Label>
                <Form.Control
                  id="cw-claimprize-bic"
                  type="text"
                  ref={swiftRef}
                  placeholder="BIC / Swift or Sortcode"
                  required
                  defaultValue={bankDetails?.swift}
                />
              </Form.Group>
              <Form.Group id="cw-claimprize-tel-group">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  id="cw-claimprize-tel"
                  type="tel"
                  ref={telRef}
                  placeholder="Phone Number (with country code)"
                  required
                  // autoFocus
                  autoComplete="tel"
                  defaultValue={bankDetails?.tel}
                />
              </Form.Group>
              <Form.Group
                className="d-flex flex-column gap-2"
                id="cw-claimprize-address-group"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  id="cw-login-address-street"
                  type="text"
                  placeholder="Street"
                  autoComplete="street-address"
                  ref={addressStreetRef}
                  required
                  defaultValue={bankDetails?.address?.street}
                />
                <Form.Control
                  id="cw-login-address-zip"
                  type="text"
                  placeholder="Postal / ZIP Code"
                  autoComplete="postal-code"
                  ref={addressZipRef}
                  required
                  defaultValue={bankDetails?.address?.plz}
                />
                <Form.Control
                  id="cw-login-address-city"
                  type="text"
                  placeholder="City"
                  autoComplete="address-level2"
                  ref={addressCityRef}
                  required
                  defaultValue={bankDetails?.address?.city}
                />
              </Form.Group>
              <Form.Check
                // className="py-3"
                style={{ maxWidth: "380px" }}
                ref={saveThisRef}
                label={"Save this information"}
                type="switch"
                id={`savethis-checkbox`}
                // defaultValue={"true"}
                defaultChecked={true}
                // onChange={(e) => }
              />
            </Form>

            {message && <div className="pt-3">{message}</div>}
            <CTAButton
              disabled={loading}
              className="w-100 mt-3"
              handle_cta_click={handleSubmit}
              text="Claim your prize"
            />
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default function Notification() {
  const api = useApi();
  const app = useAppContext();

  const [draw, setDraw] = useState();
  const [drawResult, setDrawResult] = useState();
  const [localePrize, setLocalePrize] = useState()
  const [showModal, setShowModal] = useState();
  const [loading, setLoading] = useState();

  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    api.draws?.map((item) => {
      const foundUnclaimed = item.draw_result.find(
        (item2) => item2.winner_id === api.user?.id && !item2.claimed
      );
    
    // && !user?.userdata.saved?.includes("bank")

    // dev
    // console.log(api.user);

    // const item = {
    //   date_closing: "2023-04-02T15:00:00.000Z",
    //   draw_id: "draw_1679847170750",
    //   draw_name: "Weekend Draw",
    //   draw_result: [
    //     {
    //       claimed: false,
    //       prize: "$100",
    //       title: "$100 Prize Winner",
    //       winner_id: app?.user?.id,
    //       winner_name: "Meee",
    //       winner_number: "35",
    //     },
    //   ],
    //   draw_tag: "sun-cw13-2023",
    //   index: 21,
    //   tickets: 169,
    // };
    // const foundUnclaimed = {
    //   claimed: false,
    //   prize: "$100",
    //   title: "$100 Prize Winner",
    //   winner_id: app?.user?.id,
    //   winner_name: "Meee",
    //   winner_number: "35",
    //   index: 0,
    // };
    // console.log(foundUnclaimed.prize.slice(1) * 100)
    // end dev
    if (foundUnclaimed) {
      setDraw(item);
      setDrawResult(foundUnclaimed);
      setLocalePrize(Math.round(foundUnclaimed.prize_amount_converted * 100)/100)
      setShowModal("init");
    }
    });
  }, [api.user]);

  const claimOptions = [
    {
      tag: "transfer",
      title: "🏦 Payout",
      info: "Get your prize transferred directly to your bank account. The transfer will be initiated from our US bank and might include conversion and transfer fees. (approx. 3-5 working days)",
    },
    {
      tag: "credit",
      title: "🌍 Credit",
      info: "Your prize will be substracted from your next subscription payments. 60% of the prize will be added to your impact.",
    },
    {
      tag: "donate",
      title: "🌱 Donate",
      info: "Donate your prize 100% to your project. The total amount will be added to your impact.",
    },
  ];

  async function closeModal(){
    setShowModal(false);
    await api.getDraws(true);
  }

  async function handleOption() {
    switch (selectedOption) {
      case "transfer":
        setShowModal(selectedOption);
        break;
      case "credit":
      case "donate":
        setLoading(true);
        await api.updatePrizeClaimed({
          drawIndex: draw.index,
          resultIndex: drawResult.index,
          claimed: selectedOption,
        });
        await api.sendMailToCW({
          draw: draw,
          drawResult: drawResult,
          claimOption: selectedOption,
        });
        await api.updateUser(api.user.id, {
          "userdata.fundings": [{amount: drawResult.prize_amount_converted * 100, currency: drawResult.prize_currency_converted, usd_amount: drawResult.prize_amount, date_funded: new Date().toISOString(), stripeIntent: selectedOption + " " + draw.draw_id, project: api.user.userdata.currentProject}]
        })
        await api.addToProjectFund(api.user.userdata.currentProject, drawResult.prize_amount)
        setShowModal(selectedOption);
        // await api.getDraws(true)
        setLoading(false);
        break;
      default:
        console.error("Option not supported");
    }
  }

  const initModal = () => {
    return (
      <Modal centered show={showModal} onHide={closeModal}>
        <Modal.Header closeButton className="fw-bold">
          Congratulations!
        </Modal.Header>
        <Modal.Body>
          <div className="mt-3 d-flex justify-content-center">
            <Image src={trophy} height="120" />
          </div>
          <div className="my-3 fw-bold text-center fs-5">
            You won {drawResult.prize_currency_converted === "USD" ? drawResult?.prize : `${app.getCurrencySign(drawResult?.prize_currency_converted)}${localePrize} (${drawResult?.prize})`} in our {draw.draw_name}!
          </div>
          <div className="text-center">
            {new Date(draw.date_closing).toLocaleDateString()}
          </div>
          <div className="p-3 text-center">
            You choose what happens with your prize:
          </div>

          <div className="d-flex flex-column gap-3">
            {claimOptions.map((option) => (
              <div
                className={`${
                  selectedOption === option.tag ? "selected" : ""
                } prizeclaim-option border rounded p-3 text-center`}
                onClick={() => setSelectedOption(option.tag)}
              >
                <div>{option.title}</div>
                {selectedOption === option.tag && (
                  <div>
                    <div className="mx-5 my-3 border"></div>
                    <div className="prizeclaim-option-info">{option.info}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-3 mt-3">
            <CTAButton
              text={"Confirm"}
              disabled={!selectedOption}
              handle_cta_click={handleOption}
            />
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  const loadingModal = () => {
    return (
      <Modal centered show={showModal}>
        <Modal.Body>
          <LoadingEarth className="py-5 my-5" />
        </Modal.Body>
      </Modal>
    );
  };

  const donatedModal = () => {
    return (
      <Modal centered show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>Donation successful!</Modal.Header>
        <Modal.Body>
          <div className="my-3 fw-bold text-center ">
            Thank you for your donation!
          </div>
          <div className="my-3 fw-bold text-center ">
            100% of your prize of {drawResult.prize_currency_converted === "USD" ? drawResult?.prize : `${app.getCurrencySign(drawResult?.prize_currency_converted)}${localePrize} (${drawResult?.prize})`} will be donated and added to your climate impact.
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  const creditAddedModal = () => {
    return (
      <Modal centered show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>ClimaWorld credit added</Modal.Header>
        <Modal.Body>
          <div className="my-3 fw-bold text-center ">
            We added your prize to your ClimaWorld credit!
          </div>
          <div className="my-3 fw-bold text-center ">
          {app.getCurrencySign(drawResult.prize_currency_converted)}{localePrize} will be substracted from your next ClimaWorld subscription payments.
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  const transferSubmittedModal = () => {
    return (
      <Modal centered show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>Successfully submitted</Modal.Header>
        <Modal.Body>
        <div className="text-center">
           Thank you. We will transfer your prize shortly, you will get a notification about it via email.
            <div className="pt-3 fw-bold">
              Share the love, let's save the planet!
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  if (loading) {
    return loadingModal();
  }

  switch (showModal) {
    case "init":
      return initModal();
      break;
    case "transfer":
      return <EnterPayoutDetails claimOption={selectedOption} draw={draw} drawResult={drawResult} closeModal={closeModal} setSubmitted={setShowModal} />;
      break;
    case "transferSubmitted":
      return transferSubmittedModal();
      break;
    case "credit":
      return creditAddedModal();
      break;
    case "donate":
      return donatedModal();
      break;
    default:
      return;
  }
}
