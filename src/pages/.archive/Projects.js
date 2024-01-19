import React, { useState } from "react";
import { Carousel, Image, ListGroup, Modal } from "react-bootstrap";
import ChipNavigation from "../../components/.archive/ChipNavigation";
import Header from "../../components/Header";
import PhoneContainer from "../../components/PhoneContainer";
import { useApi } from "../../contexts/ApiContext";

/* 

  Projects Page: list overview of projects and give access to more information about them

 */
export default function Projects() {
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { stats } = useApi();

  function showProject(index) {
    setSelectedIndex(index);
    setShowModal(true);
  }

  return (
    <>
      <PhoneContainer>
        <Header />
        <ChipNavigation setSelected={"Projects"} />
        <ListGroup className="w-100 mt-4">
          {stats.Projects.map(({ title, icon, short }, index) => {
            return (
              <ListGroup.Item
                className="pt-4"
                action
                onClick={() => showProject(index)}
              >
                <div className="d-flex align-items-center gap-4">
                  <Image className="shadow border" src={icon} height={"45"} />
                  <div>
                    <span className="fw-bold">{title}</span>
                    <p style={styles.shortDescr}>{short}</p>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Climate Projects</Modal.Title>
          </Modal.Header>
          <Carousel
            activeIndex={selectedIndex}
            onSelect={(newIndex) => setSelectedIndex(newIndex)}
            indicators={false}
            interval={null}
          >
            {stats.Projects ? (
              stats.Projects.map(({ title, img, text, link }) => {
                return (
                  <Carousel.Item>
                    <Modal.Body>
                      <div className="w-100 position-relative mb-3">
                        <Image width={"100%"} src={img} />
                        <div
                          className="w-100 position-absolute fw-bold fs-4 text-center p-1"
                          style={styles.imgTitle}
                        >
                          {title}
                        </div>
                      </div>
                      <p>{text}</p>
                      <a className="d-block text-center" href={link}>
                        Learn more on edenprojects.org
                      </a>
                    </Modal.Body>
                  </Carousel.Item>
                );
              })
            ) : (
              <div>loading...</div>
            )}
          </Carousel>
        </Modal>
      </PhoneContainer>
    </>
  );
}

const styles = {
  shortDescr: {
    fontSize: "14px",
  },
  modal: {
    maxWidth: "600px",
  },
  imgTitle: {
    bottom: "0",
    color: "white",
    backgroundColor: "#54a8b38c",
  },
};
