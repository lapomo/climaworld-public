import React from "react";
import { Accordion } from "react-bootstrap";
import faq from "../../../assets/text/faq";

export default function Faq() {
  return (
    <div
      className={`position-relative py-5 px-1`}
      style={{
        backgroundColor: "var(--color-secondary)",
        color: "var(--color-secondary-inverted)",
      }}
    >
      <div className="position-absolute" id="landing-faq"></div>
      <h3 className="fw-bold text-center">Frequently asked questions</h3>
      <Accordion
        className="accordionn d-flex flex-column align-items-center pt-5"
        style={styles.faqAccordion}
      >
        {faq.map(({ question, answers }, index) => {
          return (
            <Accordion.Item
              eventKey={String(index)}
              className="w-100"
              style={styles.faqItems}
              key={index}
            >
              <Accordion.Header>{question}</Accordion.Header>
              <Accordion.Body>
                {answers.map((answer, index) => {
                  return <p key={index}>{answer}</p>;
                })}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
}

const styles = {
  faqItems: {
    maxWidth: "750px",
  },
};
