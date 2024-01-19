import React from 'react'
import { activismVideo, atomEnergyVideo, co2captureVideo } from '../assets/img';

export default function VotingCards() {
    
  const [showModal, setShowModal] = useState(false);

  const projects = [
    {
      title: "Ocean",
      icon: <TreeIcon height={"100%"} fill="black" />,
      video: tortoiseVideo,
      text: "Ocean Conservation",
      color: "#75d481",
      slug: "ocean",
      description: (
        <div>
          This is a more detailed explanation of the tree project.<br></br>
          <br></br> Bla bla bla <br></br>
          <br></br> - <br></br> Cmon read it boii
        </div>
      ),
    },
    {
      title: "Activism & Content",
      icon: <AtomIcon height={"100%"} fill="black" />,
      video: activismVideo,
      text: "Activism & Content",
      color: "#1b4a56",
      slug: "activismcontent",
      description: (
        <div>
          This is a more detailed explanation of the nuclear project. <br></br>
          <br></br> Bla bla bla <br></br>
          <br></br> - <br></br> Cmon read it boii
        </div>
      ),
    },
    {
      title: "Nuclear Energy",
      icon: <TurtleIcon height={"100%"} fill="black" />,
      video: atomEnergyVideo,
      text: "Nuclear Energy",
      color: "#81c3c9",
      slug: "nuclear",
      description: (
        <div>
          This is a more detailed explanation of the ocean plastic project.{" "}
          <br></br>
          <br></br> Bla bla bla <br></br>
          <br></br> - <br></br> Cmon read it boii
        </div>
      ),
    },
    {
      title: "Carbon Capture",
      icon: <TurtleIcon height={"100%"} fill="black" />,
      video: co2captureVideo,
      text: "Share the love <3",
      color: "#43b14b",
      slug: "carboncapture",
      description: (
        <div>
          This is a more detailed explanation of the carbon capture project.
          <br></br>
          <br></br> Bla bla bla <br></br>
          <br></br> - <br></br> Cmon read it boii
        </div>
      ),
    },
  ];


  return (
    <div
          className="mb-5 d-flex gap-3 w-100 flex-wrap justify-content-center"
          style={{ maxWidth: "96q0px" }}
        >
          {projects.map((item, index) => (
            <div
              onClick={() => setShowModal(index + 1)}
              style={{
                //   flex: "1",
                //   flexGrow: "1",
                textDecoration: "none",
                color: "inherit",
                //   position: "relative",
              }}
              key={index}
            >
              <div
                className=" p-4 rounded wl-card text-center"
                style={{
                  cursor: "pointer",
                  backgroundColor: item.color,
                  color: "white",
                  minWidth: "180px",
                  maxWidth: "320px",
                  position: "relative",
                }}
              >
                {project - 1 === index && (
                  <CheckIcon
                    className="me-2 mt-2"
                    height={45}
                    fill="var(--color-success)"
                    style={{ position: "absolute", right: "0", top: "0" }}
                  />
                )}
                {item.icon}
                <div className="fw-bold">{item.title}</div>
                {/* <div>{item.text}</div> */}
              </div>
            </div>
          ))}

          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <div
              className="p-3 d-flex flex-column"
              style={{
                backgroundColor: "white",
                borderRadius: "var(--bs-modal-border-radius)",
                position: "relative",
              }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ position: "relative" }}
              >
                <BackIcon
                  height={24}
                  style={{ position: "absolute", left: "0", cursor: "pointer" }}
                  onClick={() => setShowModal(false)}
                />
                <span className="fs-1 text-center">
                  {showModal && projects[showModal - 1].title}
                </span>
                {/* <div className="d-flex align-items-center justify-content-center p-1" style={{backgroundColor: showModal && projects[showModal-1].color, border: showModal && "1px solid " + projects[showModal-1].color, height: "45px", borderRadius: "50%", position: "absolute", right: "0"}}>{showModal && projects[showModal-1].icon}</div> */}
              </div>
              <div
                className="d-flex align-items-center justify-content-center p-1 mt-3"
                style={{
                  backgroundColor: showModal && projects[showModal - 1].color,
                  border:
                    showModal && "1px solid " + projects[showModal - 1].color,
                  height: "45px",
                  width: "45px",
                  borderRadius: "50%",
                  alignSelf: "center",
                }}
              >
                {showModal && projects[showModal - 1].icon}
              </div>
              <div className="p-3 mb-3 text-center">
                {showModal && projects[showModal - 1].description}
              </div>
            </div>
          </Modal>
        </div>
  )
}
