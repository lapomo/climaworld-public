import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Image, Modal } from "react-bootstrap";
import { InfoIcon, oceanProject, treeProject } from "../assets/img";
import { edenprojects, theoceancleanup } from "../assets/text/projects";
import { useApi } from "../contexts/ApiContext";
import { useAppContext } from "../contexts/AppContext";
import EnterEmail from "../pages/Enter/components/EnterEmail";
import CTAButton from "./CTAButton";

export default function ProjectCarouselwPops({
  className,
  cardClassName,
  selecting,
  filter,
}) {
  const [showModal, setShowModal] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState()

  const app = useAppContext();
  const {user} = useApi()

  useEffect(()=>{
    const projects = [
      {
        name: "Ocean Plastic Removal",
        slug: "theoceancleanup",
        description: theoceancleanup(),
        pic: oceanProject,
      },
      {
        name: "Tree Planting",
        slug: "edenprojects",
        description: edenprojects(),
        pic: treeProject,
      },
    ];
    if(filter === "user"){
        const userProjects = user?.userdata?.projects
        const tempList = []
        projects.forEach((item)=>{
            if(userProjects?.some((up)=> up.name === item.slug)){
                tempList.push(item)
            }
        })
        setFilteredProjects(tempList)
    }else{
        setFilteredProjects(projects)
    }
  },[user, filter])
  

  return (filteredProjects &&
    <>
      <div
        className={`${className} d-flex flex-wrap justify-content-center gap-4`}
      >
        {filteredProjects?.map((project, index) => {
          const styles = {
            box: {
              width: "100%",
              maxWidth: "510px",
              cursor: "pointer",
              boxShadow:
                selecting &&
                app.entryTempStorage?.project === project.slug &&
                "0px 0px 8px 8px var(--color-primary)",
            },
          };

          return (
            <div
              className={`${cardClassName} project rounded position-relative`}
              style={styles.box}
              key={index}
              onClick={
                selecting
                  ? () =>
                      app.setEntryTempStorage({
                        ...app.entryTempStorage,
                        project: project.slug,
                      })
                  : () => setShowModal(index)
              }
            >
              <Image className="w-100 rounded" src={project.pic} />
              <div
                className="p-2 position-absolute w-100 bottom-0 rounded"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0, 0, 0, 0.52) 40%, rgba(255, 255, 255, 0) 100%)",
                    color: "var(--c-p2)"
                }}
              >
                {project.name}
              </div>
              {selecting && (
                <div
                  className="p-1 d-flex justify-content-center align-items-center position-absolute top-0 end-0"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(183, 183, 183, 0.5) 0%, rgba(255, 255, 255, 0) 70%)",
                  }}
                  onClick={(e) => {
                    setShowModal(index);
                    e.stopPropagation();
                  }}
                >
                  <InfoIcon height={35} fill="white" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Modal
        show={showModal || showModal === 0}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{filteredProjects[showModal]?.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* <div className="w-100 position-relative mb-3 text-center">Image</div> */}
          {filteredProjects[showModal]?.description}
          {filter !== "user" &&
            (selecting ? (
              <CTAButton
                handle_cta_click={() => {
                  setShowModal(false);
                  app.setEntryTempStorage({
                    ...app.entryTempStorage,
                    project: filteredProjects[showModal]?.slug,
                  });
                }}
                text="Select this project"
              />
            ) : (
              <EnterEmail
                // theme="dark"
                text="Claim your Entry"
                //   vote={projects[selectedIndex].slug}
                className="py-3 px-md-3 position-sticky"
                //   style={{ bottom: "0", backgroundColor: "white" }}
                layout="stacked"
              />
            ))}
        </Modal.Body>
      </Modal>
    </>
  );
}
